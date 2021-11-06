// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();
var nodemailer = require('nodemailer');
//IMPORT EMPLOYEE MODEL AND BIND IT
const EmpModel = require('../models/employee_model');
//const EmpModel = require('../models/employee_schema'); 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gmitcse1@gmail.com',
    pass: 'gmit.cse@2022'
  }
});
router.post('/register', (req, res) => {
  EmpModel.find({ $or: [{ "empemail": req.body.empemail }, { "empmobile": req.body.empmobile }] })
    .then(response => {
      if (response.length > 0) {
        return res.send({ message: "Email Id or Mobile No Already exits in our Database Please Register with Other Credentials" })
      }
      else {
        const empobj = new EmpModel({
          empname: req.body.empname,
          empemail: req.body.empemail,
          empmobile: req.body.empmobile,
          //  empdob: req.body.empdob,
          emppass: req.body.emppass,
          empimg: req.body.empimg,
          status: 0
        });//CLOSE EmpMod
        var mailOptions = {
          from: 'gmitcse1@gmail.com',
          to: req.body.empemail,
          subject: "Registation Sucessfull",
          text: "your email is : " + req.body.empemail + " and your password is : " + req.body.emppass,
        };

        empobj.save()
          .then(inserteddocument => {
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                // console.log(error);
                res.send({ message: error })
              } else {
                // console.log('Email sent: ' + info.response);
                res.status(200).send({ message: "Registration Successfull" });
              }
            });

          })

          .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
          });//CLOSE CATCH
      }
    })
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26
router.delete('/remove/:emailid', (req, res) => {
  EmpModel.findOneAndRemove({ "empemail": req.params.emailid })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 60
); //CLOSE Delete METHOD Line 59


// localhost:4500/emp/10
//SEARCH EMPLOYEE BY EMPID
// "empid" : parseInt(req.params.empid) Convert empid String to Int
// EmpModel.find({"empid" : parseInt(req.params.empid)})

// localhost:4500/emp/abc@gmail.com
//SEARCH EMPLOYEE BY EMPEMAIL
// CALLBACK function for get method using lambda 
router.get('/search/:emailid', (req, res) => {
  EmpModel.find({ "empemail": req.params.emailid })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.empid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 88
);//CLOSE GET METHOD Line 87 

// BROWSER URL :- localhost:4500/emp 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/', (req, res) => {
  EmpModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109  

router.post('/logincheck', (req, res) => {
  console.log(req.body.empemail)
  console.log(req.body.emppass)
  EmpModel.find({ "empemail": req.body.empemail, "emppass": req.body.emppass, "status": 1 })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.empid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE GET METHOD  


//UPDATE DOCUMENT IN MONGODB USING EMAILID
router.put('/update', (req, res) => {

  EmpModel.findOneAndUpdate({ "empemail": req.body.empemail},
    {
      $set: {
        "empmobile": req.body.empmobile,
        "emppass": req.body.emppass,
        "empaddress": req.body.empaddress
      }
    }, { new: true })
    .then(getupdateddocument => {
      if (getupdateddocument != null)
        res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
      else
        res.status(404).send('INVALID EMAILID ' + req.body.empemail);
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.empid });
    }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION Line No 108
); //CLOSE PUT METHOD Line No 107
router.put('/approve/:studentid', (req, res) => {
  //console.log(req.params.email);
  EmpModel.updateOne({ "_id": req.params.studentid }, {
    $set: {
      "status": "1"
    }
  }, { new: true })
    .sort({ "createdAt": -1 })
    .then(active => {
      res.status(200).send(active);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})
router.put('/reject/:studentid', (req, res) => {
  // console.log(req.params.uid);
  EmpModel.updateOne({ "_id": req.params.studentid }, {
    $set: {
      "status": "-1"
    }
  }, { new: true })
    .sort({ "createdAt": -1 })
    .then(reject => {
      res.status(200).send(reject);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})




//SHOULD BE EXPORTED
module.exports = router;