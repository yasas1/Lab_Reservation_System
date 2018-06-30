var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

router.post('/doReservation', function(req, res, next) {
    addToDB(req,res);
});
  
async function addToDB(req,res){
    var reservation = new Reservation({
      username:req.body.username,
      lab:req.body.lab,
      date:req.body.date,
      stime:req.body.stime,
      etime:req.body.etime
    });
    try{
      doc = await reservation.save();
  
      return res.status(201).json(doc);
    }
    catch(err){
      return res.status(501).json(err);
    }
      
}


var date=new Date("2018-06-18"); // change the today date 

router.get('/labAreservation',function(req,res,next){
  
  Reservation.find({ lab:"A", date:date }).select('username stime etime').exec(function (err, reservations) {
    if (err){
        res.send(err);
    }
    else {
        res.json(reservations);
       // res.send(date);
    }
});

});

module.exports = router;