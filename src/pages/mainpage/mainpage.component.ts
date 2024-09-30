import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { LogicService } from '../../services/logic.service';
import { FormView } from '../../services/form-view';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent implements OnInit{
dapartmentForm!: FormGroup;
formView: FormView = FormView.listView();
deptList:any ;

constructor(private fb: UntypedFormBuilder,private logicService:LogicService){}

ngOnInit(): void {
  this.intiForm();
  this.getDept();
}

getDept(){
  this.logicService.getDepartments().then((data)=>{
    console.log(data);
    this.deptList = data;
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
}

updateDept(item:any){
  this.formView.resetToCreateView();
  this.dapartmentForm.reset();
  this.dapartmentForm.patchValue(item);
}

deleteDept(item:any){
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
      // this.backend.deleteFunction(`/tenders/${tenders.id}`).then((v)=>{
      //   // this.tenderpostingForm.reset();
      // });
    }
  });
}


  intiForm()
  {
     this.dapartmentForm = this.fb.group({
      id:null,
      managerEmail:null,
       name: null,
       managerName:null
    })
   }
}
