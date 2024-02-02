import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentType } from 'src/app/models/department-type';
import { DepartmentTypeService } from 'src/app/services/department-type.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-type-form',
  templateUrl: './department-type-form.component.html',
  styleUrls: ['./department-type-form.component.scss'],
})
export class DepartmentTypeFormComponent implements OnInit {
  idDepartmentType: string | null = null;
  departmentType: DepartmentType | undefined;
  form: FormGroup | undefined;
  isSubmited: boolean = false;

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _departmentTypeService: DepartmentTypeService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this._activatedRouter.params.subscribe((params) => {
      this.idDepartmentType = params['id'];
    });
    this.initForm();


    if (this.idDepartmentType !== null) {
      this.departmentType = await this._departmentTypeService.get_department_type_by_id(this.idDepartmentType );
      if (this.form && this.departmentType) {
        this.form.patchValue({
          id: this.departmentType.id,
          name: this.departmentType.name,
          favorite: this.departmentType.favorite,
        });
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      favorite: [false, Validators.required],
    });
  }

  onSend() {
    this.isSubmited = true;
    if (this.form?.valid) {
      console.log(this.form?.value);
      if (this.idDepartmentType === null) {
        let departmenttype = new DepartmentType(
          '',
          this.form?.value.name,
          this.form?.value.favorite
        );
        this._departmentTypeService.add_department_type(departmenttype);
        
        this._router.navigate(['/admin']);
      } else {
        let departmenttype = this.departmentType;
        if (departmenttype) {
          departmenttype.name = this.form?.value.name;
          departmenttype.favorite = this.form?.value.favorite;
          this._departmentTypeService.update_department_type(departmenttype);
        } else {
          this._snackBar.open(
            'la modification du rayon à échoué veuillez rééssayer plus tard ! ',
            'Ok '
          );
        }
        this._router.navigate(['/admin']);
      }

      this.isSubmited = false;
    }
  }

  deleteDepartment() {
    if (this.departmentType) {
      this._departmentTypeService.deleteDepartementType(this.departmentType.id);
    }
    this._router.navigate(['/admin']);
  }
}
