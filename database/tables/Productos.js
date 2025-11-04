use('ECommerceDB');

db.productos.insertMany([
  {
    _id: ObjectId("690a5eef439bc08322fe3049"),
    nombre: "Bonk",
    precio: "$10 USD",
    imagen: "https://wiki.teamfortress.com/w/images/thumb/b/b5/RedBonk.png/250px-RedBonk.png",
    descripcion: "Refresco de caramelo"
  },
  {
    _id: ObjectId("690a5f8b439bc08322fe304b"),
    nombre: "Cola Time",
    precio: "$12 USD",
    imagen: "https://images.steamusercontent.com/ugc/905653584542865290/32CADDFBE9A4BFEE097C7E23940D195D5032BCDC/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    descripcion: "Bebida energizante para atletas"
  },
  {
    _id: ObjectId("690a64cbb9b6819bd388442a"),
    nombre: "Inca Kola",
    precio: "$13 USD",
    imagen: "https://static.mercadonegro.pe/wp-content/uploads/2020/07/23192342/Conoce-la-historia-de-Inca-Kola-la-bebida-gaseosa-creada-como-agradecimiento-al-Peru.jpg",
    descripcion: "Bebida refrescante de origen Peruano"
  },
  {
    _id: ObjectId("690a6530b9b6819bd388442b"),
    nombre: "Colombiana",
    precio: "$15 USD",
    imagen: "https://lacaretalicores.com/cdn/shop/files/GASEOSA-COLOMBIANA_F.webp?v=1747356825&width=1090",
    descripcion: "Refresco de cola rubia de origen Colombiano"
  },
  {
    _id: ObjectId("690a6535b9b6819bd388442c"),
    nombre: "Condor Cola",
    precio: "$15 USD",
    imagen: "https://plazacapital.co/media/k2/items/cache/9492d34aeaff0c196b67b67d4c27f695_XL.jpg",
    descripcion: "Refresco de orgigen Colombiano/Huilense"
  }
]);
