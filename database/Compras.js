use('ECommerceDB');

db.Purshases.insertMany([
  {
    _id: ObjectId("690a6542b9b6819bd388442d"),
    nombre_producto: "Inca Kola",
    precio_total: "$26 USD",
    tipo_envio: "Contrapago"
  },
  {
    _id: ObjectId("690a6568b9b6819bd388442e"),
    nombre_producto: "Condor Cola",
    precio_total: "$60 USD",
    tipo_envio: "Contrapago"
  },
  {
    _id: ObjectId("690a656db9b6819bd388442f"),
    nombre_producto: "Cola Time",
    precio_total: "$36 USD",
    tipo_envio: "Importe"
  },
  {
    _id: ObjectId("690a6571b9b6819bd3884430"),
    nombre_producto: "Bonk",
    precio_total: "$40 USD",
    tipo_envio: "Importe"
  },
  {
    _id: ObjectId("690a6575b9b6819bd3884431"),
    nombre_producto: "Colombiana",
    precio_total: "$30 USD",
    tipo_envio: "Contrapago"
  }
]);
