import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { LogicService } from '../../services/logic.service';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrl: './authpage.component.css'
})
export class AuthpageComponent implements OnInit{ 
  authForm!: FormGroup;
  loading:boolean =false;

  constructor(private fb: UntypedFormBuilder,private logicService:LogicService){}


  ngOnInit(): void {
    this.intiForm();
  }
// tamoah@gmail.com
// Mantee

  authenticateUser(){
    let formData = this.authForm.value;

    if (this.authForm.valid) {
      this.loading =true;
      this.logicService.authenticateUser(formData).then((v)=>{
        this.loading =false;
      });
    }else{
      Swal.fire({
        title: "Username and password required",
        icon: "error"
      });
    }
  }

  intiForm()
  {
     this.authForm = this.fb.group({
      password:null,
       username: null,
    })
   }

}
