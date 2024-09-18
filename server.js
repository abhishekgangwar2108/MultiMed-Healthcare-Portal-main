const express = require('express');
const mongoose = require('mongoose');




const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.set( 'view engine', 'ejs' );


const uri = 'mongodb://localhost:27017/'; // connection string /
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Define a schema for student data
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  contact: { type: String, required: true }
  // Add other relevant fields
});

const Doct = mongoose.model('Doct', doctorSchema , 'Doctors');

app.get('/' , (req , res)=>{
  res.render('index')
})
app.get('/our_doctors' , (req , res)=>{
  res.render('doctors-page' , {name : req.query.name})
})
app.get('/log_in' , (req , res)=>{
  res.render('signup' , {name : req.query.name})
})
app.get('/departments' , (req , res)=>{
  res.render('department' , {name : req.query.name})
})
app.get('/contact_us' , (req , res)=>{
  res.render('contact' , {name : req.query.name})
})
app.get('/appointment' , (req , res)=>{
  res.render('appointmentPage' , {name : req.query.name})
})

app.post('/appointment/data', (req, res)=>{
  let {Name , Email, Date ,Time, Doctor} = req.body;
  let newData = new Data({
    Name : Name,
    Email : Email,
    Date : Date,
    Time : Time,
    Doctor : Doctor
  });
  newData.save().then(()=>{
    console.log("data saved");
    res.redirect('/appointment');
  }).catch(err => {
    console.log(err);
    res.status(500).send("error saving data");
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});