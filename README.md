# 🚚 Proyecto Integrador - Gestión de Pedidos y Rastreo de Envíos - TechLogistics

Este proyecto corresponde a la Actividad del hito 4 del curso de Desarrollo de Software de la universidad EAN, cuyo objetivo fue diseñar e implementar un sistema para la gestión de pedidos y rastreo de envíos de la empresa ficticia **TechLogistics S.A.**

---

## 📄 Descripción del Proyecto

El sistema permite la administración eficiente de clientes, transportistas, pedidos y estados de envío, además de consultar el estado de un pedido específico mediante un rastreo.

El proyecto fue desarrollado utilizando:

- **Oracle SQL Developer Data Modeler** para el diseño de la base de datos.
- **Oracle Database 11g XE** como sistema gestor de base de datos.
- **Node.js + Express** para el desarrollo de la API REST.
- **Postman** para la validación de las operaciones CRUD.
- **HTML + CSS + JavaScript** para la construcción de la interfaz web.

---

## 🗂️ Estructura del Repositorio

api-techlogistics/ ├── .vscode/ │ └── settings.json # Configuraciones locales de VSCode ├── frontend/ │ └── index.html # Interfaz web para gestión de clientes y rastreo de envíos ├── node_modules/ # Dependencias del proyecto ├── db.js # Conexión a la base de datos Oracle ├── server.js # Servidor Express y definición de endpoints API ├── package.json # Configuración del proyecto Node.js ├── package-lock.json # Archivo de dependencias └── README.md # Este archivo
---

## ⚙️ Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Juangomez9009/api-techlogistics.git

2. **Acceder al directorio del proyecto**
  cd api-techlogistics

3. **Instalar las dependencias**
  npm install

4. **Iniciar el servidor**
  node server.js

5. **Visualizar la interfaz web**
Abrir el archivo:
  frontend/index.html
en el navegador para gestionar clientes y consultar el rastreo de envíos.
