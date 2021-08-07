var DataTypes = require("sequelize").DataTypes;
var _Service_Garage = require("./Service_Garage");
var _categories = require("./categories");
var _mycars = require("./mycars");
var _parts = require("./parts");
var _roles = require("./roles");
var _services = require("./services");
var _user = require("./user");
var _vehicles = require("./vehicles");
var _vehicles_1 = require("./vehicles_1");

function initModels(sequelize) {
  var Service_Garage = _Service_Garage(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var mycars = _mycars(sequelize, DataTypes);
  var parts = _parts(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var vehicles = _vehicles(sequelize, DataTypes);
  var vehicles_1 = _vehicles_1(sequelize, DataTypes);

  Service_Garage.belongsTo(mycars, { as: "car_mycar", foreignKey: "car"});
  mycars.hasMany(Service_Garage, { as: "Service_Garages", foreignKey: "car"});
  services.belongsTo(mycars, { as: "car", foreignKey: "cars_id"});
  mycars.hasMany(services, { as: "services", foreignKey: "cars_id"});
  user.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user, { as: "users", foreignKey: "role_id"});
  Service_Garage.belongsTo(user, { as: "client_user", foreignKey: "client"});
  user.hasMany(Service_Garage, { as: "Service_Garages", foreignKey: "client"});
  Service_Garage.belongsTo(user, { as: "created_by", foreignKey: "created_by_id"});
  user.hasMany(Service_Garage, { as: "created_by_Service_Garages", foreignKey: "created_by_id"});
  Service_Garage.belongsTo(user, { as: "deleted_by", foreignKey: "deleted_by_id"});
  user.hasMany(Service_Garage, { as: "deleted_by_Service_Garages", foreignKey: "deleted_by_id"});
  Service_Garage.belongsTo(user, { as: "updated_by", foreignKey: "updated_by_id"});
  user.hasMany(Service_Garage, { as: "updated_by_Service_Garages", foreignKey: "updated_by_id"});
  categories.belongsTo(user, { as: "created_by", foreignKey: "created_by_id"});
  user.hasMany(categories, { as: "categories", foreignKey: "created_by_id"});
  categories.belongsTo(user, { as: "deleted_by", foreignKey: "deleted_by_id"});
  user.hasMany(categories, { as: "deleted_by_categories", foreignKey: "deleted_by_id"});
  categories.belongsTo(user, { as: "updated_by", foreignKey: "updated_by_id"});
  user.hasMany(categories, { as: "updated_by_categories", foreignKey: "updated_by_id"});
  mycars.belongsTo(user, { as: "created_by", foreignKey: "created_by_id"});
  user.hasMany(mycars, { as: "mycars", foreignKey: "created_by_id"});
  mycars.belongsTo(user, { as: "deleted_by", foreignKey: "deleted_by_id"});
  user.hasMany(mycars, { as: "deleted_by_mycars", foreignKey: "deleted_by_id"});
  mycars.belongsTo(user, { as: "updated_by", foreignKey: "updated_by_id"});
  user.hasMany(mycars, { as: "updated_by_mycars", foreignKey: "updated_by_id"});
  parts.belongsTo(user, { as: "created_by", foreignKey: "created_by_id"});
  user.hasMany(parts, { as: "parts", foreignKey: "created_by_id"});
  parts.belongsTo(user, { as: "deleted_by", foreignKey: "deleted_by_id"});
  user.hasMany(parts, { as: "deleted_by_parts", foreignKey: "deleted_by_id"});
  parts.belongsTo(user, { as: "part_category_user", foreignKey: "part_category"});
  user.hasMany(parts, { as: "part_category_parts", foreignKey: "part_category"});
  parts.belongsTo(user, { as: "updated_by", foreignKey: "updated_by_id"});
  user.hasMany(parts, { as: "updated_by_parts", foreignKey: "updated_by_id"});
  services.belongsTo(user, { as: "created_by", foreignKey: "created_by_id"});
  user.hasMany(services, { as: "services", foreignKey: "created_by_id"});
  services.belongsTo(user, { as: "deleted_by", foreignKey: "deleted_by_id"});
  user.hasMany(services, { as: "deleted_by_services", foreignKey: "deleted_by_id"});
  services.belongsTo(user, { as: "updated_by", foreignKey: "updated_by_id"});
  user.hasMany(services, { as: "updated_by_services", foreignKey: "updated_by_id"});
  vehicles.belongsTo(user, { as: "created_by", foreignKey: "created_by_id"});
  user.hasMany(vehicles, { as: "vehicles", foreignKey: "created_by_id"});
  vehicles.belongsTo(user, { as: "deleted_by", foreignKey: "deleted_by_id"});
  user.hasMany(vehicles, { as: "deleted_by_vehicles", foreignKey: "deleted_by_id"});
  vehicles.belongsTo(user, { as: "updated_by", foreignKey: "updated_by_id"});
  user.hasMany(vehicles, { as: "updated_by_vehicles", foreignKey: "updated_by_id"});
  parts.belongsTo(vehicles, { as: "vehicle", foreignKey: "vehicle_id"});
  vehicles.hasMany(parts, { as: "parts", foreignKey: "vehicle_id"});

  return {
    Service_Garage,
    categories,
    mycars,
    parts,
    roles,
    services,
    user,
    vehicles,
    vehicles_1,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
