import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { LogicService } from '../../services/logic.service';
import { FormView } from '../../services/form-view';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent implements OnInit{
dapartmentForm!: FormGroup;
formView: FormView = FormView.listView();
deptList:any ;
loading:boolean =false;

constructor(private fb: UntypedFormBuilder,private logicService:LogicService,private router:Router){}

ngOnInit(): void {
  this.intiForm();
  this.getDept();
}

getDept(){
  this.loading = true;
  this.logicService.getDepartments().then((data)=>{
    console.log(data);
    this.deptList = data;
    this.loading = false;
  });
}

openForm(){
  this.formView.resetToCreateView();
  this.dapartmentForm.reset();
}

closeForm(){
  this.dapartmentForm.reset();
  this.formView.resetToListView();
}

newDept(){
  let formData = this.dapartmentForm.value;
  console.log(formData);

  // if (this.dapartmentForm.valid) {

  // ============ creat new department =========
  if(formData.id == null){
    console.log('posting');
    Swal.fire({
      // title: "Are you sure?",
      text: "Submit department?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
    let response =  this.logicService.createNew(formData);
    console.log(response);
      }
    })
    // ===========edit department ===========
  }else{
    console.log('edit');
    let response = this.logicService.editDept(formData);
    console.log(response);
  }

// } else {
//   Swal.fire({
//     title: "All fields required",
//     icon: "error"
//   });
// }

}

updateDept(item:any){
  this.formView.resetToCreateView();
  this.dapartmentForm.reset();
  this.dapartmentForm.patchValue(item);
}

deleteDept(id:any){
  Swal.fire({
    // title: "Are you sure?",
    text: "Delete department?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
        this.logicService.deleteDept(id);
    }
  });
}


logoutFunction(){
  Swal.fire({
    // title: "Are you sure?",
    text: "Do you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
   sessionStorage.clear(); 
  this.router.navigate(['/'])  
    }
  });
 
}

  intiForm()
  {
     this.dapartmentForm = this.fb.group({
      id:null,
      managerEmail:null,
       name: null,
       managerName:null,
       createdAt:null,
      
       createdBy:null,
       empId:null
    })
   }
}
