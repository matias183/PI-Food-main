const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Base de datos
// El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):

// [ ] Receta con las siguientes propiedades:
// ID: * listo
// Nombre * listo
// Resumen del plato * listo
// Puntuación /listo
// Nivel de "comida saludable" / listo
// Paso a paso /listo
// [ ] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthyScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        max: 100,
        min: 0,
      },
    },
    stepByStep: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    image:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
