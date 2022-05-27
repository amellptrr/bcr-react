'use strict';
const config = require("../../config/appconfig");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    plate: DataTypes.STRING,
    manufacture: DataTypes.STRING,
    model: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      get() {
        const image = this.getDataValue('image');
        return image ? `${process.env.SERVER || config.app.server}:${process.env.PORT || config.app.port}` + image.substring(1) : null
      }
    },
    rentPerDay: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    transmission: DataTypes.STRING,
    type: DataTypes.STRING,
    year: DataTypes.INTEGER,
    options: DataTypes.ARRAY(DataTypes.STRING),
    specs: DataTypes.ARRAY(DataTypes.STRING),
    available: DataTypes.BOOLEAN,
    availableAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};