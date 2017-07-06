const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const connectionString = "postgres://obtfrkyhepvhlk:287ad58ef357fbd951068f368c6ad7c8c27db6da634658749fee519504fa7342@ec2-54-235-72-121.compute-1.amazonaws.com:5432/d9n6vd7vc3cu9q?ssl=true";
const products_controller = require("./products_controller");

const app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

massive(connectionString).then(dbInstance => app.set('db', dbInstance) );

app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.post("/api/product", products_controller.create);
app.delete("/api/product/:id", products_controller.delete);


const port = 3000;
app.listen(port, () => {console.log(`Server listening on port ${port}.`); } );