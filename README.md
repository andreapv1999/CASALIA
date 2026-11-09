# 🏡 CASALIA – Plataforma de Gestión Inmobiliaria

Aplicación web Full Stack para la gestión y consulta de propiedades inmobiliarias. CASALIA permite visualizar viviendas, gestionar clientes y administrar propiedades y citas desde un panel de administración.

## 📌 Descripción del proyecto

CASALIA es una plataforma inmobiliaria desarrollada como proyecto Full Stack. Su objetivo es facilitar la gestión de una inmobiliaria mediante una aplicación web intuitiva, moderna y organizada.

El proyecto integra un frontend desarrollado con React y Vite, un backend con Node.js y Express y una base de datos MongoDB.

## ✨ Funcionalidades principales

### Usuarios y autenticación
- Registro de usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante JSON Web Tokens (JWT).
- Contraseñas protegidas mediante bcrypt.
- Control de acceso según el rol del usuario.

### Gestión de propiedades
- Visualización del catálogo inmobiliario.
- Consulta de información de las viviendas.
- Gestión de propiedades desde el panel de administración.
- Información sobre precio, ubicación, superficie, habitaciones y baños.
- Fotografías de las propiedades.
- Gestión de estados y operaciones de venta y alquiler.

### Gestión de clientes
- Registro de clientes.
- Consulta y edición de información.
- Eliminación de registros.
- Organización de clientes y sus intereses inmobiliarios.

### Gestión de citas
- Creación de citas.
- Asociación de citas con propiedades y clientes.
- Actualización del estado de las citas.
- Consulta y eliminación de citas.

### Panel de administración
- Resumen de información.
- Gestión de propiedades.
- Gestión de clientes.
- Gestión de citas.

## 🛠️ Tecnologías utilizadas

**Frontend**
- React
- Vite
- JavaScript
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

**Herramientas**
- Visual Studio Code
- Git y GitHub
- MongoDB Atlas

## 📁 Estructura del proyecto

```text
CASALIA/
│
├── backend/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Instalación y ejecución

### Requisitos previos

- Node.js
- npm
- Una base de datos MongoDB

### 1. Clonar el repositorio

```bash
git clone https://github.com/andreapv1999/CASALIA.git
cd CASALIA
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crear un archivo `.env` dentro de la carpeta `backend` con las siguientes variables:

```env
PORT=5000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
```

Iniciar el servidor:

```bash
npm run dev
```

El backend estará disponible en:

`http://localhost:5000`

### 3. Configurar el frontend

Abrir una segunda terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en:

`http://localhost:5173`

## 🔐 Seguridad

- Las contraseñas se almacenan mediante hash.
- La autenticación utiliza JWT.
- Las rutas protegidas verifican los permisos del usuario.
- Las variables de entorno y credenciales privadas no deben publicarse en GitHub.

## 👩‍💻 Autora

Proyecto desarrollado por **Andrea Vázquez**.

GitHub: https://github.com/andreapv1999

Repositorio: https://github.com/andreapv1999/CASALIA

---

**CASALIA – Gestión inmobiliaria en un solo lugar.** 🏡