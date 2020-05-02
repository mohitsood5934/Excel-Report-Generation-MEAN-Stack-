import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";
let headers = new HttpHeaders({
  "Authorization": "Bearer"
});

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http:HttpClient) { }
  //to get all the users
  getUsers(){
    return this.http.get('http://localhost:8080/api/getAllRecord')
      .pipe(
        map(result => {
          console.log("Accessing Users ");
          return result
        })
      );
  }

//to add the user 
addUser(data){
  return this.http.post("http://localhost:8080/api/addRecord/",{data:data})
  .toPromise()
}
//delete  the users
deleteUser(id){
  return this.http.delete("http://localhost:8080/api/deleteRecord/"+id)
    .toPromise()
}
generateReport() {
    return this.http
      .get("http://localhost:8080/api/downloadReport", { headers, responseType: "blob" })
      .toPromise()
}
}
