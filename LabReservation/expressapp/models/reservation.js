var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 

var ResSchema = new Schema({
    username: {type: String}, 
    lab: { type: String, required: true}, 
    date: { type : Date, default: Date.now , required: true},
    stime: {type: String , timestamps: true, required: true},
    etime: { type: String , timestamps: true, required: true}
    
});

module.exports = mongoose.model('Reservation', ResSchema);