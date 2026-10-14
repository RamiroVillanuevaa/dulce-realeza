# TRABAJO PRACTICO NRO 1 - CONSTRUCCION INTERFAZ DE USUARIOS

## PAGINA "DULCE REALEZA - PANADERIA & CAFETERIA"

Comisión 2

Alumnos:
- CASTILLO MARCOS
- DIRIE NAZARENO
- VILLANUEVA RAMIRO

Deploy: https://ramirovillanuevaa.github.io/dulce-realeza/

## Descripción

Tienda online de Dulce Realeza, una panadería y cafetería de San Antonio de Padua.
Se puede recorrer el catálogo, buscar y filtrar productos, ver el detalle de cada uno,
armar el carrito y completar los datos para hacer una compra simulada.

Funcionalidades:
- Inicio con categorías, productos destacados y los pasos para comprar.
- Catálogo de 15 productos con buscador por nombre, filtro por categoría y filtro de productos con stock.
- Detalle de cada producto en `/producto/:id`.
- Carrito con cantidades, subtotales, total, eliminar productos y finalizar compra.
- Formulario de compra con envío a domicilio o retiro en el local, con validaciones.
- Formulario de contacto.
- Etiquetas de "Más vendido", "Nuevo" y "Oferta".

## Tecnologías utilizadas

- React (componentes funcionales, `useState` y `useEffect`)
- Vite
- React Router DOM
- React Bootstrap y Bootstrap
- CSS Modules
- GitHub Pages para el deploy

## Cómo instalar y correr el proyecto

1. Clonar el repositorio:
   ```
   git clone https://github.com/RamiroVillanuevaa/dulce-realeza.git
   cd dulce-realeza
   ```
2. Instalar las dependencias:
   ```
   npm install
   ```
3. Correr el proyecto:
   ```
   npm run dev
   ```
4. Abrir en el navegador la dirección que muestra la consola (por ejemplo `http://localhost:5173/dulce-realeza/`).
