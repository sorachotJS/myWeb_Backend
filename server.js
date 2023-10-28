const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const loginRoutes = require("./Routes/loginRoutes")
const tagRoutes = require("./Routes/tagRoutes")


const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const cors = require("cors");
app.use(cors());


app.get("/", async (req, res, next) => {
    res.send("Hello from express.");
  });
  
app.use('/api/auth', loginRoutes)
app.use("/api/tag", tagRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});