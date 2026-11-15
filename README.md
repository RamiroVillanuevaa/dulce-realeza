# UnaHur Anti-Social Net

FrontEnd en React, TypeScript   red social "UnaHur Anti-Social Net".
Trabajo Práctico 2  Construcción de Interfaces de Usuario (UNAHUR, 2.º cuatrimestre 2026).

Permite ver el feed de publicaciones, entrar al detalle de cada una, comentar, registrarse,
iniciar sesión y crear publicaciones propias con imágenes y etiquetas.

## Integrantes

- Castillo, Marcos
- Dirie, Nazareno
- Villanueva, Ramiro

## Tecnologías

- React 19 + TypeScript (Vite)
- React Router DOM
- React Bootstrap + Bootstrap 5
- Fetch para consumir la API

## API utilizada

Usamos el BackEnd que da la cátedra: https://github.com/lucasfigarola/backend-api

Corre en `http://localhost:3001`. 

## Cómo correrlo en local

Hacen falta dos terminales: una para el BackEnd y otra para el FrontEnd.

**1. BackEnd**

```bash
git clone https://github.com/lucasfigarola/backend-api.git
cd backend-api
npm install
node seed.js
npm start
```

**2. FrontEnd** (está en la rama `tp2` del repo; en `main` está el TP1)

```bash
git clone -b tp2 https://github.com/RamiroVillanuevaa/dulce-realeza.git
cd dulce-realeza
npm install
npm run dev
```

Abrir http://localhost:5173

## Usuarios de prueba

El `seed.js` del BackEnd crea los usuarios fantasia: `luna` y `sol`.
El login es simulado: la contraseña es `123456` para todos.

## Rutas

| Ruta | Qué muestra | Necesita sesión |
| --- | --- | --- |
| `/` | Home con el feed y filtro por etiquetas | No |
| `/post/:id` | Detalle de la publicación y comentarios | No (para comentar, sí) |
| `/login` | Inicio de sesión | No |
| `/registro` | Alta de usuario | No |
| `/perfil` | Datos y publicaciones del usuario | Sí |
| `/nuevo-post` | Formulario de nueva publicación | Sí |
