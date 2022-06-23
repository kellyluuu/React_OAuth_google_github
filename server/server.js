const express = require('express');
const app = express();
require ("dotenv").config()
const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const router = require("./routes/auth");
const { PORT = 3001, DATABASE_URL } = process.env
const logger = require("morgan");
const usersRouter = require("./routes/users");
// DB Config
require("./config/database");

app.use(logger("dev"));
app.use(express.json());



app.use(
    cookieSession({ name: "session", keys: ["mern-auth"], maxAge: 24 * 60 * 60 * 100 })
  );
  

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}))


app.use('/auth', router)

app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})