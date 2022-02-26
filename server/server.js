

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
const cors=require('cors');
const users = require('./routes/api/user.routes.js');
const medicines=require('./routes/api/medicine.routes')
const forgets=require('./routes/api/forget.routes')
const medicine_name=require('./routes/api/medicine_name.routes')
const appointments=require('./routes/api/appointment.routes')
const hospitals=require('./routes/api/hospital.routes')
const app = express();

// Bodyparser middleware
// for parsing application/xwww-
app.use(
  bodyParser.urlencoded({limit: '50mb',
    extended: false
  })
);
// for parsing application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors("Access-Control-Allow-Origin", "*"));
// app.use(upload.array()); 
app.use(express.static('public'))
 
// Set EJS as templating engine 
app.set("view engine", "ejs");
// DB Config
const db =  'mongodb://localhost:27017/medicine'; //require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// // Passport middleware
 //app.use(passport.initialize());

// // Passport config
//require('./config/passport')(passport);
app.use(cors('Access-Control-Allow-Origin','*'));


// Routes
app.get('/',function(req,res){
  console.log("server");
  res.send("server connected");
})
require('./routes/api/medicine.routes')(app);
require('./routes/api/user.routes')(app);
require('./routes/api/forget.routes')(app);
require('./routes/api/medicine_name.routes')(app);
require('./routes/api/appointment.routes')(app);
require('./routes/api/hospital.routes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
