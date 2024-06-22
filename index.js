const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")
const hostel=require("./routes/hostel-route.js");
const homework=require("./routes/homework-route.js");
const income=require("./routes/income-route.js");
const expense=require("./routes/expenses-route.js")
const lessonPlan=require("./routes/lessonPlan-route.js");
const feesCollection=require("./routes/feesCollection-route.js")
const transport=require("./routes/transport-route.js");
const PORT = process.env.PORT || 5000


// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);
app.use("/",hostel);
app.use("/",homework);
app.use("/",income);
app.use("/",expense);
app.use("/",lessonPlan);
app.use("/",feesCollection);
app.use("/",transport);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})