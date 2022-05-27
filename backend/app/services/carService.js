const carRepository = require("../repositories/carRepository");

class carService {
  static async getList(filter) {
    try {
      let whereClause = new Object({
        where: filter
      });
      let cars = await carRepository.findAll(whereClause);
      return {
        data: cars
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = carService;