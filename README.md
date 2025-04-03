# 🚚 Proyecto Integrador - Gestión de Pedidos y Rastreo de Envíos - TechLogistics

Este proyecto corresponde a la Actividad del hito 4 del curso de Desarrollo de Software de la Universidad EAN, cuyo objetivo fue diseñar e implementar un sistema para la gestión de pedidos y rastreo de envíos de la empresa ficticia **TechLogistics S.A.**

---

## 📄 Descripción del Proyecto

El sistema permite la administración eficiente de:

- Clientes
- Transportistas
- Productos transportables (laptops y desktops)
- Pedidos
- Rutas
- Estados de Envío

También incluye:

- Registro y visualización de pedidos
- Asignación de productos a cada pedido
- Consulta del estado del pedido con visualización de productos asignados
- Gestión directa desde la interfaz web o desde Postman

---

## 🛠️ Tecnologías Utilizadas

- Oracle SQL Developer Data Modeler – Diseño del modelo E-R
- Oracle Database 11g XE – Gestión y almacenamiento de datos
- Node.js + Express – Backend y API REST
- Postman – Validación y pruebas de endpoints
- HTML + Bootstrap + JavaScript – Interfaz web interactiva

---

## 🗂️ Estructura del Repositorio

```
API-TECHLOGISTICS/
├── frontend/
│   └── index.html              # Interfaz web
├── node_modules/              # Dependencias del proyecto
├── db.js                      # Conexión a Oracle Database
├── server.js                  # API REST y lógica de servidor
├── package.json               # Configuración del proyecto
├── package-lock.json          # Dependencias exactas
└── README.md                  # Documentación del proyecto
```

---

## ⚙️ Instalación y Ejecución

1. Clonar el repositorio desde GitHub  
2. Abrir el proyecto en Visual Studio Code  
3. Ejecutar `npm install` para instalar las dependencias  
4. Iniciar el servidor con `node server.js`  
5. Abrir el archivo `frontend/index.html` en un navegador para usar la aplicación

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