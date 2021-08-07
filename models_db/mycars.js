const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mycars', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "mycars_uuid_key"
    },
    vehicle_make: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    vehicle_model: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    vehicle_year: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    vehicle_trim: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    vehicle_style: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    updated_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    deleted_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    next_service: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    milage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    chasis_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mycars',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mycars_created_by_id_idx",
        fields: [
          { name: "created_by_id" },
        ]
      },
      {
        name: "mycars_deleted_by_id_idx",
        fields: [
          { name: "deleted_by_id" },
        ]
      },
      {
        name: "mycars_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "mycars_updated_by_id_idx",
        fields: [
          { name: "updated_by_id" },
        ]
      },
      {
        name: "mycars_uuid_key",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};
