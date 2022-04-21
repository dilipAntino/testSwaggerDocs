require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/users");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
const basicAuth = require('express-basic-auth');


const options = {
    definition: {
        components: {}, // ADD THIS LINE!!!
        expressAPI: "1.0.0",
        info: {
            title: "USERS API",
            version: "1.0.0",
            description: "A simple Express API",
        },
        servers: [
            {
                url: "http://localhost:3000/users",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
const app = express();
app.use(cors());


app.use("/api-docs", basicAuth({
    users: { 'test': '123' },
    challenge: true,
}), swaggerUI.serve, swaggerUI.setup(specs));

app.use(bodyParser.json());
app.use("/users", usersRoute);


mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser: true }).then(
    () => {
        console.log("Database is connected");
    },
    (err) => {
        console.log("Can not connect to the database" + err);
    }
);

app.listen(3000, () => { console.log("server started on port 3000") });