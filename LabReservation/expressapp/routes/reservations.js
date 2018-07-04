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
//new Date(Date.now()).toLocaleString();


//,date:req.params.date
router.get('/viewreservations/:lab/:date',function(req,res,next){
  
  Reservation.find({ lab:req.params.lab, date:req.params.date }).select('username stime etime').exec(function (err, reservations) {
    if (err){
        res.send(err);
    }
    else {
        res.json(reservations);
       // res.send(date);
    }
  });

});


///checkAvailable/:lab/:date/:stime/:etime
//req.params.date 

//stime:{$lte:"09:00"},etime:{$gt:"09:00"} 8<9<10

router.get('/checkAvailable/:lab/:date/:stime/:etime',function(req,res,next){
  var stime=req.params.stime;
  var etime=req.params.etime;
  
  Reservation.find({ lab:req.params.lab, date:req.params.date}).select('username stime etime').exec(function (err, reservations) {
    if (err){
        res.send(err);
    }
    else {
      //res.json(reservations);      
      //reservations[0].username)
        //res.json(reservations); res.json(reservations.length);
       //res.send(reservations[0].username);
       if(reservations.length==0){
          res.json({ available: true, message: 'Lab is available' });
       }
       else{
          
          for(i in reservations){
            //res.send(val.stime); console.log(reservations[i].stime);
         
             //db st 8 and req st 8
            if(reservations[i].stime == stime){
              return res.json({ available: false, message: 'Lab is not available' });
            }
            //db st 8-10 and req st 9
            else if(reservations[i].stime < stime && reservations[i].etime > stime){
              return res.json({ available: false, message: 'Lab is not available' });
            }//db st 8-10 and req st 7-9 or 7-11
            else if(reservations[i].stime > stime && reservations[i].stime < etime){
              return res.json({ available: false, message: 'Lab is not available' });
            }
            else{
              return res.json({ available: true, message: 'Lab is available' });
            }
          }       
         
       }

    }
  });

}); //{ $sort : { lab : 1 } }

router.get('/getlabrescount/:date',function(req,res,next){
  var dd = new Date(req.params.date);
  console.log(dd);
  Reservation.aggregate( [{ $match : {date :dd} }, { $group:{ _id: "$lab", total:{$sum:1} } } ] ).sort({_id:1}).exec(function (err, reservations) {
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