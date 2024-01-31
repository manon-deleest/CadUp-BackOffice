import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentType } from 'src/app/models/department-type';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  idDepartment: string | null = null;
  department: Department | undefined;
  departmentTypes : DepartmentType[] = [];
  form: FormGroup | undefined; 
  isSubmited : boolean = false; 

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _departmentTypeService: DepartmentTypeService,
    private _snackBar: MatSnackBar,
    private _router : Router,
    private fb: FormBuilder,
    ) { }

  async ngOnInit(): Promise<void> {
    this._activatedRouter.params.subscribe((params) => {
      this.idDepartment = params['idDepartment']; 
    }); 
    this.initForm();
    this.departmentTypes = this._departmentTypeService.get_all_department_type();

    if(this.idDepartment !== null){
      this.department = await this._departmentService.get_department_by_id(this.idDepartment);
      if(this.form && this.department){
        this.form.patchValue({
          id : this.department.id,
          name : this.department.name, 
          description : this.department.description, 
          idDepartmentType : this.department.idDepartmentType, 
          color : this.department.color, 
        })
      }
      
    }

  }

  initForm(){
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      idDepartmentType: ['',Validators.required],
      color: ['',Validators.required],
    });
  }

  onSend(){
    this.isSubmited = true; 
    if(this.form?.valid){
      let department = this.department;
      if(department){
        department.color = this.form?.value.color;
        department.description = this.form?.value.description;
        department.idDepartmentType = this.form?.value.idDepartmentType;
        department.name = this.form?.value.name;
        this._departmentService.update_department(department);
      }else{
        this._snackBar.open("la modification du rayon à échoué veuillez rééssayer plus tard ! ", 'Ok ');
      }
      this._router.navigate(['/admin']);

      this.isSubmited = false; 
    }
  }

  deleteDepartment(){
    if(this.department){
      this._departmentService.delete_department(this.department);
    }
    this._router.navigate(['/admin']);
  }
}
