require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const auth = require("./routes/auth")
const club = require("./routes/club")
const round=require("./routes/round")
const sig=require("./routes/sig")
const prefer= require("./routes/preference")
const announce = require("./routes/announcements")
const cors = require("cors")


app.use(cors())


app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/clubs', club);
app.use('/api/sigs', sig);
app.use('/api/round', round);
app.use('/api/prefer', prefer);
app.use('/api/announce', announce);

mongoose
    .connect(process.env.URI, {

    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Started at port ${port}`)
})