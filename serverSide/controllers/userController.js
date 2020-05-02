var mongoose = require("mongoose");
var User = require("../models/userModel");
var styles = require("../utilities/styles")
const excel = require('node-excel-export');

exports.getAllRecord = (req, res) => {
  User.find({})
    .then((data) => {
      return res.json(data)
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    })
}
exports.viewRecord = (req, res, aadharNumber) => {
  User.find({ aadharNumber: aadharNumber })
    .then((data) => {
      res.json({ "record": "Record of" + aadharNumber + "is:" + data })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })

}
exports.addRecord = (req, res, record) => {
  var record = new User(record);
  record.save()
    .then(() => {
      res.json({ "msg": "User created successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    })
}

exports.deleteRecord = (req, res, id) => {
  User.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    .then((data) => {
      res.json({ "record": "User deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    })
}
exports.downloadReport = (req, res) => {
  let reportData = []
  User.find({})
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        reportData.push({
          firstName: data[i].name[0].firstName, lastName: data[i].name[0].lastName, village: data[i].address[0].village
          , city: data[i].address[0].city, dateOfBirth: data[i].dateOfBirth, aadharNumber: data[i].aadharNumber, email: data[i].email
        });
      }
      const heading = [
        [{ value: 'UIDAI', style: styles.headerLightPink }],
        [{ value: '', style: styles.headerCream }],
        [{ value: 'Unique Identification Authority Of India', style: styles.headerCream }],
        [{ value: '', style: styles.headerCream }],
        [{ value: 'Aadhar Data Collection', style: styles.headerCream }],
        [{ value: '', style: styles.headerCream }],
        [{ value: 'Switch tabs/pages to view other result breakdown', style: styles.headerBlue }]
      ];

      //Here you specify the export structure
      const specification = {}
      const dataset = []
      const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 18 } },
        { start: { row: 2, column: 1 }, end: { row: 2, column: 10 } },
        { start: { row: 3, column: 1 }, end: { row: 3, column: 10 } },
        { start: { row: 4, column: 1 }, end: { row: 4, column: 10 } },
        { start: { row: 5, column: 1 }, end: { row: 5, column: 10 } },
        { start: { row: 6, column: 1 }, end: { row: 6, column: 10 } },
        { start: { row: 7, column: 1 }, end: { row: 7, column: 10 } },
      ]
      const heading1 = [
        [{ value: "UIDAI", style: styles.headerLightPink }],
        [{ value: "Personal Data", style: styles.headerBrin }],
        [{ value: "", style: styles.cellWhite }]
      ];

      //Here you specify the export structure
      const specification1 = {
        firstName: {
          displayName: 'First Name',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        },
        lastName: {
          displayName: 'Last Name',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        },
        village: {
          displayName: 'Village',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        },
        city: {
          displayName: 'City',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        },
        dateOfBirth: {
          displayName: 'DOB',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        },
        aadharNumber: {
          displayName: 'Aadhar No.',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        },
        email: {
          displayName: 'Email',
          headerStyle: styles.headerBrin,
          cellStyle: styles.cellWhite,
          width: 160
        }
      }
      const dataset1 = reportData
      const merges1 = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
        { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
        { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
      ]

      const report = excel.buildExport(
        [
          {
            name: 'Introduction',
            heading: heading,
            merges: merges,
            specification: specification,
            data: dataset
          },
          {
            name: 'User Info',
            heading: heading1,
            merges: merges1,
            specification: specification1,
            data: dataset1
          }
        ]
      );
      res.attachment('report.xlsx'); 
      return res.send(report);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    })

}