const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Garage', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "parts_uuid_key"
    },
    part_caterory: {
      type: DataTypes.INTEGER,
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
    car: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mycars',
        key: 'id'
      }
    },
    client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    mechanic: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'Service_Garage',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Service_Garage_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "parts_uuid_key",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};
