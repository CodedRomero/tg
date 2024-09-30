import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  baseUrl = 'https://techadgroup.com/app';

  constructor(private http: HttpClient,) { }

  async authenticateUser(authData:any){
    return this.http.post(this.baseUrl + '/api/v1/signin',authData).subscribe((val:any)=>{
      console.log( val.key   ) ;

      let key = JSON.parse( JSON.stringify(val));
      console.log(key)

      if (val != undefined) {
        let decryptedMessage =  CryptoJS.AES.decrypt(val, val.key ).toString(CryptoJS.enc.Utf8);
        console.log(decryptedMessage);


      //  localStorage.setItem('userDetails',JSON.stringify(val.data));
          
          // this.router.navigate(['/user-dashbaord']); 
      }
  

      

    },(error)=>{
      console.log(  error.error['msg'] ) ;

      Swal.fire({
        title: "Oops",
        text:  error.error['msg'],
        icon: "error"
      });
    }); 
  }


  createNew(){
  }

  getDepartments(){}

  editDept(){}

  deleteDept(){}
}
