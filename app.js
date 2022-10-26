const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = 80;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
      // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

}

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name    : String,
    age     : String,
    number  : String,
    email   : String,
    address : String,
  });

const contact = mongoose.model('contact', contactSchema);


// Express Specific Stuff
app.use('/static',express.static('static')); //For serving static files
app.use(express.urlencoded());

// Pug Specific Stuff
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the view directory


// End points
app.get('/',(req,res)=>{
    const cons = 'This is the best dance academy in your area';
    const params = {'title':'A1DanceAcademy', content : cons}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact',(req,res)=>{
    //  name = req.body.name
    //  age = req.body.age
    //  number = req.body.number
    //  email = req.body.email
    //  address = req.body.address

    // let outputToWrite = `
    // Name = '${name}',
    // Age =  ${age},
    // Contact number =  ${number}, 
    // Email address =  ${email},
    // Residential address = ${address}.
    // `;

    // fs.writeFileSync('output.txt', outputToWrite)
    // const params = {'message' : 'your form has been submitted successfully'}
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send('Form has been submitted')
    }).catch(()=>{
        res.status(400).send('some error occured in the process')
    });
    // res.status(200).render('contact.pug');
});

// Start the server
app.listen(port,()=>{
    console.log(`The application  is running on port :${port}`);
})
