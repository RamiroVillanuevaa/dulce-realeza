// aca arranca el catalogo de dulce realeza
// los precios son inventados (el enunciado lo permite)
// las fotos van en public/img/ y se ponen como "/img/archivo.jpg"
// por ahora son placeholders, cuando tengamos las fotos reales cambiamos la ruta y listo

const productos = [
  {
    id: 1,
    nombre: 'Cheesecake de Oreo',
    categoria: 'Pastelería',
    precio: 6500,
    imagen: '/img/cheesecake-oreo.svg',
    descripcion: 'Porción de cheesecake cremoso sobre base de Oreo.',
    descripcionLarga: 'Nuestro cheesecake estrella: base crocante de galletitas Oreo, relleno de queso crema bien suave y cobertura de Oreo triturada. A otro nivel.',
    caracteristicas: ['Porción individual', 'Base de galletitas Oreo', 'Se conserva en heladera'],
    stock: 8,
    etiqueta: 'Más vendido'
  },
  {
    id: 2,
    nombre: 'Mini Balcarce',
    categoria: 'Pastelería',
    precio: 7500,
    imagen: '/img/mini-balcarce.svg',
    descripcion: 'Versión individual del clásico postre Balcarce.',
    descripcionLarga: 'Bizcochuelo, dulce de leche, crema, merengue, castañas y coco. Todo lo que tiene el Balcarce de siempre, en tamaño individual para darse un gusto.',
    caracteristicas: ['Tamaño individual', 'Con dulce de leche y merengue', 'Se conserva en heladera'],
    stock: 6,
    etiqueta: ''
  },
  {
    id: 3,
    nombre: 'Postre en vaso',
    categoria: 'Pastelería',
    precio: 5000,
    imagen: '/img/postre-vaso.svg',
    descripcion: 'Capas de crema, dulce de leche y crumble en vaso.',
    descripcionLarga: 'Postre en vaso con capas de crema, dulce de leche y crumble de chocolate. Ideal para llevar y comer donde quieras.',
    caracteristicas: ['Vaso de 250 cc', 'Con tapa, ideal para llevar', 'Se conserva en heladera'],
    stock: 10,
    etiqueta: 'Nuevo'
  },
  {
    id: 4,
    nombre: 'Torta Balcarce entera',
    categoria: 'Pastelería',
    precio: 32000,
    imagen: '/img/torta-balcarce.svg',
    descripcion: 'Torta Balcarce para 10 a 12 porciones, por encargo.',
    descripcionLarga: 'La torta Balcarce completa para cumpleaños y reuniones. Se prepara por encargo con 48 horas de anticipación.',
    caracteristicas: ['10 a 12 porciones', 'Por encargo con 48 h de anticipación', 'Se conserva en heladera'],
    stock: 3,
    etiqueta: ''
  },
  {
    id: 5,
    nombre: 'Medialunas de manteca (docena)',
    categoria: 'Panadería',
    precio: 9000,
    imagen: '/img/medialunas.svg',
    descripcion: 'Docena de medialunas de manteca recién horneadas.',
    descripcionLarga: 'Medialunas de manteca hojaldradas, horneadas todas las mañanas y pintadas con almíbar. El compañero ideal del café.',
    caracteristicas: ['12 unidades', 'Horneadas en el día', 'Con almíbar'],
    stock: 15,
    etiqueta: 'Más vendido'
  },
  {
    id: 6,
    nombre: 'Facturas surtidas (docena)',
    categoria: 'Panadería',
    precio: 10000,
    imagen: '/img/facturas.svg',
    descripcion: 'Docena surtida: vigilantes, bolas de fraile, cañoncitos y más.',
    descripcionLarga: 'Una docena de facturas surtidas elaboradas en el día: vigilantes, bolas de fraile, cañoncitos de dulce de leche, tortitas negras y lo que salga del horno esa mañana.',
    caracteristicas: ['12 unidades surtidas', 'Elaboradas en el día', 'Variedad según disponibilidad'],
    stock: 12,
    etiqueta: ''
  },
  {
    id: 7,
    nombre: 'Chipá (1/4 kg)',
    categoria: 'Panadería',
    precio: 5500,
    imagen: '/img/chipa.svg',
    descripcion: 'Chipá calentito, crocante por fuera y suave por dentro.',
    descripcionLarga: 'Chipá de queso hecho con almidón de mandioca, crocante por fuera y bien tierno por dentro. Esta es tu señal para venir a buscarlo calentito.',
    caracteristicas: ['250 gramos', 'Con queso', 'Sin harina de trigo en la masa'],
    stock: 20,
    etiqueta: ''
  },
  {
    id: 8,
    nombre: 'Pan de campo',
    categoria: 'Panadería',
    precio: 4500,
    imagen: '/img/pan-campo.svg',
    descripcion: 'Pan de campo de corteza crocante, aprox. 500 g.',
    descripcionLarga: 'Pan de campo de masa madre con fermentación lenta y corteza crocante. Ideal para acompañar las comidas o para tostadas.',
    caracteristicas: ['Aprox. 500 gramos', 'Masa madre', 'Horneado en el día'],
    stock: 9,
    etiqueta: ''
  },
  {
    id: 9,
    nombre: 'Budín de limón',
    categoria: 'Panadería',
    precio: 8000,
    imagen: '/img/budin-limon.svg',
    descripcion: 'Budín húmedo de limón con glaseado.',
    descripcionLarga: 'Budín de limón bien húmedo, con ralladura natural y glaseado cítrico por encima. Perfecto para la merienda.',
    caracteristicas: ['Aprox. 400 gramos', 'Con glaseado de limón', 'Dura hasta 4 días'],
    stock: 0, // sin stock: sirve para mostrar el botón deshabilitado y la etiqueta "Sin stock"
    etiqueta: ''
  },
  {
    id: 10,
    nombre: 'Sándwich de ciabatta',
    categoria: 'Salados',
    precio: 9500,
    imagen: '/img/sandwich-ciabatta.svg',
    descripcion: 'Ciabatta con carne desmenuzada, cebolla caramelizada y cheddar.',
    descripcionLarga: 'Tentate con este tremendo sándwich: pan ciabatta, carne desmenuzada con cebolla caramelizada, lechuga, tomate y queso cheddar o tybo a elección.',
    caracteristicas: ['Pan ciabatta', 'Carne desmenuzada + cebolla caramelizada', 'Queso cheddar o tybo a elección'],
    stock: 7,
    etiqueta: ''
  },
  {
    id: 11,
    nombre: 'Tostado de jamón y queso',
    categoria: 'Salados',
    precio: 7000,
    imagen: '/img/tostado.svg',
    descripcion: 'Clásico tostado en pan de miga, jamón y queso.',
    descripcionLarga: 'El clásico de la cafetería: pan de miga tostado con jamón cocido y queso tybo derretido. Va perfecto con un café con leche.',
    caracteristicas: ['Pan de miga', 'Jamón cocido y queso tybo', 'Servido caliente'],
    stock: 10,
    etiqueta: ''
  },
  {
    id: 12,
    nombre: 'Café espresso',
    categoria: 'Cafetería',
    precio: 2800,
    imagen: '/img/espresso.svg',
    descripcion: 'Espresso de máquina, intenso y aromático.',
    descripcionLarga: 'Espresso preparado en nuestra cafetera nueva, con granos seleccionados y tueste medio. Los lunes, con tu café te regalamos una cookie.',
    caracteristicas: ['Taza de 60 ml', 'Granos de tueste medio', 'Los lunes: cookie de regalo'],
    stock: 50,
    etiqueta: 'Oferta'
  },
  {
    id: 13,
    nombre: 'Café con leche',
    categoria: 'Cafetería',
    precio: 3500,
    imagen: '/img/cafe-con-leche.svg',
    descripcion: 'Café con leche cremoso en taza grande.',
    descripcionLarga: 'Café con leche texturizada, en taza grande. Vení a tomarte un cafecito con nosotros.',
    caracteristicas: ['Taza de 300 ml', 'Leche entera o descremada', 'Opción con leche vegetal'],
    stock: 50,
    etiqueta: ''
  },
  {
    id: 14,
    nombre: 'Cookie con chips de chocolate',
    categoria: 'Cafetería',
    precio: 2500,
    imagen: '/img/cookie.svg',
    descripcion: 'Cookie grande, crocante por fuera y blandita por dentro.',
    descripcionLarga: 'Cookie de manteca con muchos chips de chocolate semiamargo. Crocante en los bordes y blandita en el centro.',
    caracteristicas: ['Aprox. 90 gramos', 'Chips de chocolate semiamargo', 'Horneada en el día'],
    stock: 18,
    etiqueta: ''
  },
  {
    id: 15,
    nombre: 'Caja de regalo Dulce Realeza',
    categoria: 'Regalos',
    precio: 25000,
    imagen: '/img/caja-regalo.svg',
    descripcion: 'Caja con budín, alfajores, cookies y jugo para regalar.',
    descripcionLarga: 'Una caja pensada para regalar: budín, alfajores de maicena, cookies y un jugo, presentada en canasta con viruta. Ideal para cumpleaños, desayunos sorpresa y fechas especiales.',
    caracteristicas: ['Budín + 4 alfajores + 2 cookies + jugo', 'Presentación en canasta', 'Por encargo con 24 h de anticipación'],
    stock: 4,
    etiqueta: ''
  }
]
// aca termina el catalogo

export default productos
