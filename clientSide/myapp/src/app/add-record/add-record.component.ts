import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form } from '../../../node_modules/@angular/forms';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RecordService } from "../record.service";
@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  public data:any;
  //creation form group object  
  public userForm: FormGroup;

  constructor(private record: RecordService, private route: Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: this.fb.array([this.name]),
      address: this.fb.array([this.address]),
      dateOfBirth:["",Validators.required],
      aadharNumber:["",Validators.required],
      email:["",Validators.required]
    })
  }

  get name(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  get address(): FormGroup {
    return this.fb.group({
      village: ['', Validators.required],
      city: ['', Validators.required],
    });
  }
  submit(){
     this.data=this.userForm.value
     this.record.addUser(this.data)
    .then((data)=>{
      console.log("User added successfully!!")
      this.userForm.reset();
      this.toastr.success("User record added successfully!");
    })
    .catch((err)=>{
      console.log("Error occured while adding the user!!")
    })
  }

}
