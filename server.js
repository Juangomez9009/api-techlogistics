const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'SYSTEM',
  password: '1234',
  connectString: 'localhost/XEPDB1'
};

////////////////////////////////////////
// CLIENTES
////////////////////////////////////////
app.get('/clientes', async (req, res) => {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute('SELECT * FROM CLIENTE');
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error al consultar clientes');
  }
});

app.post('/clientes', async (req, res) => {
  const { id_cliente, nombre, correo, telefono, direccion } = req.body;
  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(`
      INSERT INTO CLIENTE (id_cliente, nombre, correo, telefono, direccion)
      VALUES (:id, :nombre, :correo, :telefono, :direccion)
    `, { id: id_cliente, nombre, correo, telefono, direccion }, { autoCommit: true });
    await conn.close();
    res.send('Cliente agregado');
  } catch (err) {
    res.status(500).send('Error al agregar cliente');
  }
});

////////////////////////////////////////
// PEDIDOS (con productos asignados)
////////////////////////////////////////
app.get('/pedidos', async (req, res) => {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(`
      SELECT 
        p.id_pedido, c.nombre AS cliente, t.nombre AS transportista, 
        r.origen || ' - ' || r.destino AS ruta, 
        TO_CHAR(p.fecha, 'DD/MM/YYYY') AS fecha, 
        e.descripcion AS estado,
        (
          SELECT LISTAGG(prod.nombre || ' (x' || d.cantidad || ')', ', ') 
          WITHIN GROUP (ORDER BY prod.nombre)
          FROM DETALLEPEDIDO d
          JOIN PRODUCTO prod ON d.id_producto = prod.id_producto
          WHERE d.id_pedido = p.id_pedido
        ) AS productos_asignados
      FROM PEDIDO p
      JOIN CLIENTE c ON p.id_cliente = c.id_cliente
      JOIN TRANSPORTISTA t ON p.id_transportista = t.id_transportista
      JOIN RUTA r ON p.id_ruta = r.id_ruta
      JOIN ESTADOENVIO e ON p.id_estado = e.id_estado
    `);
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar pedidos');
  }
});

app.post('/pedidos', async (req, res) => {
  const { id_pedido, id_cliente, id_transportista, id_ruta, fecha, id_estado } = req.body;
  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(`
      INSERT INTO PEDIDO (
        id_pedido, id_cliente, id_transportista, id_ruta, fecha, id_estado,
        Cliente_id_cliente, Transportista_id_transportista, Ruta_id_ruta, EstadoEnvio_id_estado, DetallePedido_id_detalle
      )
      VALUES (
        :id, :cliente, :transportista, :ruta, TO_DATE(:fecha, 'YYYY-MM-DD'), :estado,
        :cliente, :transportista, :ruta, :estado, 1
      )
    `, {
      id: id_pedido, cliente: id_cliente, transportista: id_transportista,
      ruta: id_ruta, fecha, estado: id_estado
    }, { autoCommit: true });
    await conn.close();
    res.send('Pedido registrado');
  } catch (err) {
    res.status(500).send('Error al registrar pedido');
  }
});

////////////////////////////////////////
// DETALLE PEDIDO (productos asignados)
////////////////////////////////////////
app.post('/detalle-pedido', async (req, res) => {
  const { id_detalle, id_pedido, id_producto, cantidad } = req.body;
  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(`
      INSERT INTO DETALLEPEDIDO (id_detalle, id_pedido, id_producto, cantidad)
      VALUES (:id, :pedido, :producto, :cantidad)
    `, {
      id: id_detalle,
      pedido: id_pedido,
      producto: id_producto,
      cantidad: cantidad
    }, { autoCommit: true });
    await conn.close();
    res.send('Producto asignado');
  } catch (err) {
    res.status(500).send('Error al asignar producto');
  }
});

////////////////////////////////////////
// PRODUCTOS (para carga inicial o futura)
////////////////////////////////////////
app.post('/productos', async (req, res) => {
  const { id_producto, nombre, descripcion, precio, DETALLEPEDIDO_ID_DETALLE } = req.body;
  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(`
      INSERT INTO PRODUCTO (id_producto, nombre, descripcion, precio, DETALLEPEDIDO_ID_DETALLE)
      VALUES (:id, :nombre, :desc, :precio, :detalle)
    `, {
      id: id_producto,
      nombre,
      desc: descripcion,
      precio,
      detalle: DETALLEPEDIDO_ID_DETALLE || 1
    }, { autoCommit: true });
    await conn.close();
    res.send('Producto registrado');
  } catch (err) {
    res.status(500).send('Error al registrar producto');
  }
});

////////////////////////////////////////
// CARGAR DATOS BÁSICOS
////////////////////////////////////////
app.post('/cargar-datos-basicos', async (req, res) => {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const scripts = [
      `INSERT INTO CLIENTE VALUES (1, 'Juan García', 'juan@email.com', '3001234567', 'Calle 123')`,
      `INSERT INTO CLIENTE VALUES (2, 'Juan Gómez', 'juancho@live.com', '3058888888', 'calle falsa 1 2 3')`,
      `INSERT INTO TRANSPORTISTA VALUES (1, 'Pedro López', '3211234567', 'Rappi Express')`,
      `INSERT INTO TRANSPORTISTA VALUES (2, 'Carlos Ruiz', '3222222222', 'Servientrega')`,
      `INSERT INTO RUTA VALUES (1, 'Bogotá', 'Medellín')`,
      `INSERT INTO RUTA VALUES (2, 'Cali', 'Barranquilla')`,
      `INSERT INTO RUTA VALUES (3, 'Cartagena', 'Bogotá')`,
      `INSERT INTO ESTADOENVIO VALUES (1, 'En proceso')`,
      `INSERT INTO PRODUCTO VALUES (1, 'Laptop', 'Portátil empresarial', 3000, 1)`,
      `INSERT INTO PRODUCTO VALUES (2, 'Desktop', 'Equipo de escritorio', 2200, 1)`,
      `INSERT INTO DETALLEPEDIDO VALUES (1, 1, 1, 1)`
    ];
    for (let sql of scripts) {
      try {
        await conn.execute(sql, {}, { autoCommit: true });
      } catch (e) {
        // Evita errores si ya existen
      }
    }
    await conn.close();
    res.send('Datos básicos cargados');
  } catch (err) {
    res.status(500).send('Error al cargar datos básicos');
  }
});

////////////////////////////////////////
// INICIO
////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
