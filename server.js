const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuración DB
const dbConfig = {
  user: 'SYSTEM',
  password: '1234',
  connectString: 'localhost/XEPDB1'
};

//////////////////////////
// CLIENTES
//////////////////////////
app.get('/clientes', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM CLIENTE');
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error al consultar clientes');
  }
});

app.post('/clientes', async (req, res) => {
  const { id_cliente, nombre, correo, telefono, direccion } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO CLIENTE (id_cliente, nombre, correo, telefono, direccion) 
                 VALUES (:id, :nombre, :correo, :telefono, :direccion)`;
    const binds = { id: id_cliente, nombre, correo, telefono, direccion };
    await connection.execute(sql, binds, { autoCommit: true });
    await connection.close();
    res.send('✅ Cliente insertado');
  } catch (error) {
    res.status(500).send('Error al insertar cliente');
  }
});

//////////////////////////
// TRANSPORTISTAS
//////////////////////////
app.get('/transportistas', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM TRANSPORTISTA');
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error al consultar transportistas');
  }
});

app.post('/transportistas', async (req, res) => {
  const { id_transportista, nombre, telefono, empresa } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO TRANSPORTISTA (id_transportista, nombre, telefono, empresa)
                 VALUES (:id, :nombre, :telefono, :empresa)`;
    const binds = { id: id_transportista, nombre, telefono, empresa };
    await connection.execute(sql, binds, { autoCommit: true });
    await connection.close();
    res.send('✅ Transportista insertado');
  } catch (error) {
    res.status(500).send('Error al insertar transportista');
  }
});

//////////////////////////
// RUTAS
//////////////////////////
app.get('/rutas', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM RUTA');
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error al consultar rutas');
  }
});

app.post('/rutas', async (req, res) => {
  const { id_ruta, origen, destino } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO RUTA (id_ruta, origen, destino)
                 VALUES (:id, :origen, :destino)`;
    const binds = { id: id_ruta, origen, destino };
    await connection.execute(sql, binds, { autoCommit: true });
    await connection.close();
    res.send('✅ Ruta insertada');
  } catch (error) {
    res.status(500).send('Error al insertar ruta');
  }
});

//////////////////////////
// ESTADOS ENVÍO
//////////////////////////
app.get('/estados-envio', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM ESTADOENVIO');
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error al consultar estados de envío');
  }
});

app.post('/estados-envio', async (req, res) => {
  const { id_estado, descripcion } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO ESTADOENVIO (id_estado, descripcion)
                 VALUES (:id, :descripcion)`;
    const binds = { id: id_estado, descripcion };
    await connection.execute(sql, binds, { autoCommit: true });
    await connection.close();
    res.send('✅ Estado de envío insertado');
  } catch (error) {
    res.status(500).send('Error al insertar estado de envío');
  }
});

//////////////////////////
// PEDIDOS
//////////////////////////
app.get('/pedidos', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM PEDIDO');
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error al consultar pedidos');
  }
});

app.post('/pedidos', async (req, res) => {
  const { id_pedido, id_cliente, id_transportista, id_ruta, fecha, id_estado } = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO PEDIDO (id_pedido, id_cliente, id_transportista, id_ruta, fecha, id_estado,
                    Cliente_id_cliente, Transportista_id_transportista, Ruta_id_ruta, EstadoEnvio_id_estado, DetallePedido_id_detalle)
                 VALUES (:id, :cliente, :transportista, :ruta, TO_DATE(:fecha, 'YYYY-MM-DD'), :estado,
                    :cliente_fk, :transportista_fk, :ruta_fk, :estado_fk, :detalle_fk)`;
    const binds = {
      id: id_pedido,
      cliente: id_cliente,
      transportista: id_transportista,
      ruta: id_ruta,
      fecha,
      estado: id_estado,
      cliente_fk: id_cliente,
      transportista_fk: id_transportista,
      ruta_fk: id_ruta,
      estado_fk: id_estado,
      detalle_fk: 1 // Por ahora fijo, hasta que implementemos DetallePedido
    };
    await connection.execute(sql, binds, { autoCommit: true });
    await connection.close();
    res.send('✅ Pedido insertado');
  } catch (error) {
    res.status(500).send('Error al insertar pedido');
  }
});

//////////////////////////
// RASTREO DE ENVÍOS
//////////////////////////
app.get('/rastreo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const sql = `
      SELECT 
        p.id_pedido, c.nombre AS cliente, t.nombre AS transportista, r.origen, r.destino, e.descripcion AS estado
      FROM PEDIDO p
      JOIN CLIENTE c ON p.id_cliente = c.id_cliente
      JOIN TRANSPORTISTA t ON p.id_transportista = t.id_transportista
      JOIN RUTA r ON p.id_ruta = r.id_ruta
      JOIN ESTADOENVIO e ON p.id_estado = e.id_estado
      WHERE p.id_pedido = :id`;
    const result = await connection.execute(sql, [id]);
    await connection.close();
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Pedido no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al consultar rastreo');
  }
});

//////////////////////////
// INICIO SERVIDOR
//////////////////////////
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
