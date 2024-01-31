import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column';
import { DepartmentType } from 'src/app/models/department-type';
import { DepartmentTypeService } from 'src/app/services/department-type.service';

@Component({
  selector: 'app-departments-types',
  templateUrl: './departments-types.component.html',
  styleUrls: ['./departments-types.component.scss']
})
export class DepartmentsTypesComponent implements OnInit {

  constructor(
    private _departmentTypeService: DepartmentTypeService
  ) { }
  
  columns: Column[] = [
    {
      'nom':"Nom", 
      "visibleMobile": true, 
      "nameAttribut":"name",
      "type": 'texte'
    },{
      'nom':"Favorie", 
      "visibleMobile": false, 
      "nameAttribut":"favorite",
      "type": 'boolean'
    }
  ]
  data: DepartmentType[] = []; 

  ngOnInit(): void {
    this.data = this._departmentTypeService.get_all_department_type(); 
  }

  
  onDelete(departementType: Set<string> ){
    console.log(departementType);
    departementType.forEach( (departmenttype) => {
      console.log(departmenttype);
      this._departmentTypeService.deleteDepartementType(departmenttype);
    }); 
    this.data = this._departmentTypeService.get_all_department_type(); 
  }

}
