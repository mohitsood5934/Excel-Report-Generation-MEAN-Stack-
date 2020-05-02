import { Component, OnInit } from '@angular/core';
import {RecordService} from "../record.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  data:any;
  error:string;
  constructor(private record:RecordService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.getUsers()
  }
  //getting the all users
  getUsers(){
   this.record.getUsers()
   .subscribe(
     result =>{ 
       console.log(result);
      this.data=result;
     },
     err => this.error = 'Can"t find data!!'
   );
  }
  //delete the user 
  deleteUser(id){
    this.record.deleteUser(id)
    .then((data)=>{
      console.log("User deleted successfully!!")
      this.getUsers();
      this.toastr.success("User deleted successfully");
    })
    .catch((err)=>{
      console.log("Error occured while deleting the user!!")
    })
  }
  
  downloadReport() {
    this.record.generateReport()
      .then(
        
        blob => {
        this.toastr.success("File downloaded successfully");
        saveAs(blob, "AadharReport.xlsx");
        
      })
      .catch((err) => {
        console.log("Not able to generate the file!!")
      })
  }


}
