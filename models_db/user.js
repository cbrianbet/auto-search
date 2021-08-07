const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date_joined: {
      type: DataTypes.DATE,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "user_uuid_key"
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false
    },
    msisdn: {
      type: DataTypes.STRING(254),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_role_id_idx",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "user_uuid_key",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};
