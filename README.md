# 🚚 Proyecto Integrador - Gestión de Pedidos y Rastreo de Envíos - TechLogistics

Este proyecto corresponde a la Actividad del hito 4 del curso de Desarrollo de Software de la Universidad EAN, cuyo objetivo fue diseñar e implementar un sistema para la gestión de pedidos y rastreo de envíos de la empresa ficticia **TechLogistics S.A.**

---

## 📄 Descripción del Proyecto

El sistema permite la administración eficiente de:

- 👥 Clientes
- 🚛 Transportistas
- 📦 Productos transportables (laptops y desktops)
- 📬 Pedidos
- 📍 Rutas
- 🚦 Estados de Envío

También incluye:

- Registro y visualización de pedidos
- Asignación de productos a cada pedido
- Consulta del estado del pedido con visualización de productos asignados
- Gestión directa desde la interfaz web o desde Postman

---

## 🛠️ Tecnologías Utilizadas

- **Oracle SQL Developer Data Modeler** – Diseño del modelo E-R
- **Oracle Database 11g XE** – Gestión y almacenamiento de datos
- **Node.js + Express** – Backend y API REST
- **Postman** – Validación y pruebas de endpoints
- **HTML + Bootstrap + JavaScript** – Interfaz web interactiva

---

## 🗂️ Estructura del Repositorio

```
api-techlogistics/
├── .vscode/                  # Configuraciones locales de VSCode
├── frontend/
│   └── index.html            # Interfaz web para la gestión y consulta
├── node_modules/            # Dependencias del proyecto
├── db.js                    # Configuración de conexión a Oracle DB
├── server.js                # API REST con endpoints funcionales
├── package.json             # Configuración del proyecto Node.js
├── package-lock.json        # Detalles de dependencias
└── README.md                # Este archivo
```

---

## ⚙️ Instalación y Ejecución

1. **Clonar el repositorio**
```bash
git clone https://github.com/Juangomez9009/api-techlogistics.git
```

2. **Acceder al directorio del proyecto**
```bash
cd api-techlogistics
```

3. **Instalar las dependencias**
```bash
npm install
```

4. **Iniciar el servidor**
```bash
node server.js
```

5. **Visualizar la interfaz web**

Abrir el archivo:
```bash
frontend/index.html
```
en el navegador para gestionar clientes, registrar pedidos y asignar productos.

---

## ✅ Estado del Proyecto

- [x] Base de datos relacional normalizada
- [x] API REST funcional (GET, POST, DELETE, PUT)
- [x] Interfaces web con visualización clara de datos
- [x] Validación con Postman
- [x] Cumplimiento total de los requisitos del hito 4

---

## 🧠 Autor

**Juan Gómez**  
Desarrollador Backend & Bases de Datos  
[🔗 GitHub](https://github.com/Juangomez9009)

---

¡Gracias por revisar este proyecto! 🚀