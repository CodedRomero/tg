import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  baseUrl = 'https://techadgroup.com/app';

  constructor(private http: HttpClient,private router:Router) { }
// tamoah@gmail.com
// Mantee


  async authenticateUser(authData:any){ 
      this.http.post(this.baseUrl + '/api/v1/signin',authData).subscribe((val:any)=>{
      console.log(val) ;

      if (val != undefined) {
     let keyWard=   CryptoJS.enc.Base64.parse( val.key)
      // console.log(keyWard);

      let dataWard=   CryptoJS.enc.Base64.parse( val.sessiontoken)

      // Convert wordArray to CipherParams
      let cipherParams = CryptoJS.lib.CipherParams.create(
         {ciphertext: dataWard}
      );

  
        let decryptedMessage =  CryptoJS.AES.decrypt(cipherParams,  keyWard,{
          mode: CryptoJS.mode.ECB,
          padding:CryptoJS.pad.Pkcs7
        } );

        let newData =    decryptedMessage.toString(CryptoJS.enc.Utf8)
        let userObj = JSON.parse(newData)
        console.log(userObj.token);

        sessionStorage.setItem('userToken', userObj.token); 
                 
          this.router.navigate(['/main']); 
      }
 
    },(error)=>{
      console.log(  error.error['msg'] ) ;

      Swal.fire({
        title: "Oops",
        text:   'Something went wrong, Please try again',
        icon: "error"
      });
    }); 
  }


  async createNew(data:any){
    let token =   sessionStorage.getItem('userToken');
   return this.http.post(this.baseUrl + '/api/v1/department/add',data, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token,'Content-Type':'application/json'})})
   .subscribe((val:any)=>{
    console.log( val.data) ;

    Swal.fire({
      title: "Saved!",
   
      icon: "success"
    });

    setTimeout(() => 
      {
        location.reload();
      }, 1000);

  },(error)=>{
    // console.log(  error.error['msg'] ) ;

    Swal.fire({
      title: "Oops",
      text:   'Something went wrong, Please try again',
      icon: "error"
    });
  });

  }

  getDepartments(){
    let token =   sessionStorage.getItem('userToken');
   return this.http.get(this.baseUrl + '/api/v1/department/list', { headers: new HttpHeaders({'Authorization': 'Bearer ' + token,'Content-Type':'application/json'})}).toPromise();
    }

  async  editDept(data:any){
    let token = sessionStorage.getItem('userToken');
   return this.http.post(this.baseUrl + '/api/v1/department/edit',data, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token,'Content-Type':'application/json'})}) 
   .subscribe((val:any)=>{

    Swal.fire({
      title: "Saved!",
      icon: "success"
    });
    setTimeout(() => 
      {
        location.reload();
      }, 1000);
 
  },(error)=>{
    // console.log(  error.error['msg'] ) ;

    Swal.fire({
      title: "Oops",
      text:   'Something went wrong, Please try again',
      icon: "error"
    });
  });

  }

  async deleteDept(id:any){
    let token =  sessionStorage.getItem('userToken');
   return this.http.delete(this.baseUrl + `/api/v1/department/${id}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token,'Content-Type':'application/json'})})
   .subscribe((val:any)=>{
  

    Swal.fire({
      title: "Deleted!",
      icon: "success"
    });

    setTimeout(() => 
      {
        location.reload();
      }, 1000);

  },(error)=>{
    // console.log(  error.error['msg'] ) ;

    Swal.fire({
      title: "Oops",
      text:   'Something went wrong, Please try again',
      icon: "error"
    });
  });

  }
}
