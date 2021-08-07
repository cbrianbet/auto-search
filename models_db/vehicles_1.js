const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicles_1', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: true
    },
    vehicle_make: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vehicle_model: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vehicle_year: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicles_1',
    schema: 'public',
    timestamps: false
  });
};
