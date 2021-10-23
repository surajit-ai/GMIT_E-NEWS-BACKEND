// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

const EmpModel = require('../models/news_schema');
router.post('/newsupload', (req, res) => {

  const empobj = new EmpModel({
    authorid: req.body.authorid,
    authorname: req.body.authorname,
    authoremail: req.body.authoremail,
    nname: req.body.nname,
    //   nnews: req.body.nnews,
    ncat: req.body.ncat,
    ntitle: req.body.ntitle,
    ndesp: req.body.ndesp,
    nimg: req.body.nimg,
    status: 0

  });
  empobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });
}
);

router.get('/', (req, res) => {
  EmpModel.find()
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });
}
);

router.get('/home', (req, res) => {
  EmpModel.find({"status":"1"})
    .sort({ "createdAt": -1 })
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });
}
);


router.get('/viewall/:uid', (req, res) => {
  EmpModel.find({ "authorid": req.params.uid })
    //   .sort({"createdAt":-1})
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})
router.get('/readmore/:nid', (req, res) => {
  EmpModel.find({ "_id": req.params.nid })
    // .sort({ "createdAt": -1 })
    .then(news => {
      res.status(200).send(news)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message || 'Error in Fetch News ' });
    })

})
router.delete('/remove/:nid', (req, res) => {
  EmpModel.findOneAndRemove({ "_id": req.params.nid })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID NEWS ID ' + req.params.nid);
      }
    })
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.nid });
    })
})
router.get('/search/:cata', (req, res) => {
  var myregex = new RegExp(req.params.cata, "i");
  EmpModel.find({ "ncat": myregex })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.cata });
      }
    })
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.cata });
    })
}
);
router.put('/newsapprove/:nid', (req, res) => {
  // console.log(req.params.uid);
  EmpModel.findByIdAndUpdate(req.params.nid, {
    $set: {
      "status": "1"
    }
  }, { new: true })
    .sort({ "createdAt": -1 })
    .then(activenews => {
      res.status(200).send(activenews);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})
router.put('/newsreject/:nid', (req, res) => {
  // console.log(req.params.uid);
  EmpModel.findByIdAndUpdate(req.params.nid, {
    $set: {
      "status": "-1"
    }
  }, { new: true })
    .sort({ "createdAt": -1 })
    .then(rejectnews => {
      res.status(200).send(rejectnews);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch News ' })
    })
})



//SHOULD BE EXPORTED
module.exports = router;