var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var userController = require("../controllers/userController");

router.get("/getAllRecord",function(req,res){
  userController.getAllRecord(req,res)

})
router.get("/viewRecord/:aadharNumber",function(req,res){
  var aadharNumber = req.params.aadharNumber;
  userController.viewRecord(req,res,aadharNumber)

})
router.post("/addRecord",function(req,res){
  var record=req.body.data;
  userController.addRecord(req,res,record);
})
router.put("/editRecord",function(req,res){
    userController.editRecord(req,res,aadharNumber);
})
router.delete("/deleteRecord/:id",function(req,res){
    var id = req.params.id;
    userController.deleteRecord(req,res,id);
})
router.get("/downloadReport",function(req,res){
  userController.downloadReport(req,res)

})
module.exports=router