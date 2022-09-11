const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const pageRouter = require("./routes/pageRoutes");
const authRouter = require("./routes/authRoutes");
const photoRouter = require("./routes/photoRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(
    session({
        secret: process.env["SESSION_SECRET"],
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env["MONGO_SESSION_URI"],
        }),
    }),
);
app.use((req, res, next) => {

    res.locals.user = req.session.user;

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(pageRouter);
app.use(authRouter);
app.use("/photos", photoRouter);


const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env["MONGO_URI"])
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running port on ${PORT}`));
    })
    .catch((err) => console.error(err));
