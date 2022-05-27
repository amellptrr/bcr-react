/**
 * @file server index.js
 * @author Rizky Adji Pangestu
 */

const Express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");
const config = require("../config/appconfig");
const app = Express();

app.set("config", config);
app.use(Express.static(__dirname + "/../public"));
app.use(BodyParser.json({ limit: "50mb" }));
app.use(BodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

app.set("port", config.app.port);
app.use(require("../router"));

app.listen(process.env.PORT || config.app.port, () => {
  console.log(
    `Service online at ${process.env.SERVER || config.app.server}:${process.env.PORT || config.app.port}`
  );
});