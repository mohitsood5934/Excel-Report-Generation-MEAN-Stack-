var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

var userSchema = new mongoose.Schema({
   name:[],
   address:[],
   dateOfBirth:Date,
   aadharNumber:String,
   email:String
   
});
var registeredResident = mongoose.model('registeredResident',userSchema);
module.exports=registeredResident;