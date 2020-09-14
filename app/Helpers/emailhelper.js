const nodemailer = require("nodemailer"); 
const hbs = require('nodemailer-express-handlebars')
let responseGot = {}
const dotenv=require('dotenv');

dotenv.config();
exports.emailUtility= async (emailFrom, emailTo, emailSubject,adminname, name, message, email, phoneNumber ) =>{
   
        let resp= await wrapedSendMail();
         return resp;

    async function wrapedSendMail(){
        return new Promise((resolve,reject)=>{
        let transport = nodemailer.createTransport({
            service: 'gmail',
        auth: {
            
              user: 'gigdonadams50@gmail.com',
            pass:  'mathematics5@@@'         
        },
      //  host: "mail.privateemail.com",
        //  host: "server252.web-hosting.com",
        //  port: 465,
        //  secure: true, 
        //  auth: {
        //     user: 'admin@boomdyno.com', // generated ethereal user
        //    pass: 'BoomDyno2020',
        // } 
        });
  const handlebarsOptions= {
      viewEngine:{
          extName:'index.handlebars',
          partialsDir: './',
          layoutsDir: './',
          defaultLayout:'./app/Helpers/index'
      },
      viewPath:'./app/Helpers',
      extName:'.handlebars',
   
  };
        transport.use('compile', hbs(handlebarsOptions));
        const mailOptions = {
            // should be replaced with real  recipient's account 
            from: emailFrom,
            to: emailTo,         
            subject: emailSubject,
            text: emailSubject,
            template: 'index',
            context: {
                adminname: adminname,
                name: name,
                message: message,
                email: email,
                phoneNumber: phoneNumber
               
            }
        }; 


     let resp=false;
     transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('=======================================fail======================')
            console.log("error is "+error);
           reject(false); // or use rejcet(false) but then you will have to handle errors
           //return error
        } 
       else {
          
       console.log('=======================================success======================')
         console.log('Email sent: ' + info.response);    
           resolve(true);
        }
       });
     
       })
    }
       
  
} 
