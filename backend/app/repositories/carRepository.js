const { Car } = require("../models");

class carRepository {
  static findAll(filter) {
    return Car.findAll(filter);
  }
}

module.exports = carRepository;