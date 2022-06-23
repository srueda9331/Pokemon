const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValues: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultImage: 'https://scontent.feoh4-4.fna.fbcdn.net/v/t1.18169-9/10520757_471623979641258_8353558783947765781_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Reb0HBwp80AAX-Z5Zu-&_nc_ht=scontent.feoh4-4.fna&oh=00_AT-wAxCXQz9Wqu8JbbrMVFhY599VdNZWSydqAO-TGQ2Kvg&oe=62D93831'
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.STRING
    }
  });
};
