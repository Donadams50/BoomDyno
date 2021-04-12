// import packages into the app. Express, body-parser, 
//const sql=require("./app/Database/db")
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");

app.use(cors()); 
const path = require('path')

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const sendemail = require('./app/Helpers/emailhelper.js');
const dotenv=require('dotenv');

dotenv.config();


app.post('/subscription', async(req, res) =>{
    console.log(req.body)
   
                
     try{
        
      const emailTo = 'admin@boomdyno.com'
      const emailFrom = 'admin@boomdyno.com'
      const adminname = 'Admin'
      const subject = 'Verification of social account'
      const name = req.body.name
      const email = req.body.email
      const phoneNumber = req.body.phoneNumber
      const  message = req.body.message 
     
      processEmail(emailFrom, emailTo, subject,adminname, name, message, email, phoneNumber );
        
          res.status(200).send({message:"Success "}) 
     }catch(err){
         console.log(err)
        res.status(500).send({message:"Error while sending email"}) 
        
     }
  

})

app.post('/contact', async(req, res) =>{
    console.log(req.body)
    const appKey = req.headers.authorization
    console.log(appKey)     
     try{
         
        if (appKey === process.env.appKey){
      const emailTo = 'morton@hackangelslab.com'
      const emailFrom = 'morton@hackangelslab.com'
      const adminname = 'Admin'
      const subject = 'Hackangelslabs'
      const name = req.body.name
      const email = req.body.email
      const  message = req.body.message 
     
      processEmailMortion(emailFrom, emailTo, subject,adminname, name, message, email );
        
          res.status(200).send({message:"Success "}) 
        }else{
            res.status(500).send({message:" App key not valid"})
        }
     }catch(err){
         console.log(err)
        res.status(500).send({message:"Error while sending email"}) 
        
     }
  

})


async function processEmail(emailFrom, emailTo, subject,adminname, name, message, email, phoneNumber ){
    try{
       
       const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject,adminname, name, message, email, phoneNumber);
       console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}


async function processEmailMortion(emailFrom, emailTo, subject,adminname, name, message, email ){
    try{
       
       const sendmail =  await sendemail.emailUtilityMortion(emailFrom, emailTo, subject,adminname, name, message, email);
       console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}

const port = process.env.PORT || 5000     

app.listen(port, ()=> console.log(`listening on port ${port}...`)); 