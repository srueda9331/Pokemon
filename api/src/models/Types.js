const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('types', {
    id: {
      type: DataTypes.UUID,
      defaultValues: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
};