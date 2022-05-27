const carService = require("../services/carService");
const { Op } = require("sequelize");

class carController {
  static getAll(req, res) {
    console.log(req.query);
    let { availableAt, capacity } = req.query;
    let filter = {};
    if (availableAt) {
      filter.availableAt = {
        [Op.like]: '%' + availableAt + '%'
      }
    }
    if (capacity) {
      filter.capacity = capacity;
    }
    carService.getList(filter)
      .then((result) => {
        res.status(200).json({
          code: 200, 
          message: "OK", 
          data: result.data
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      });
  }
}

module.exports = carController;