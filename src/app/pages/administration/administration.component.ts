import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  departmentType: string | null = null;
  departments: Department[] = [];

  movingElement: HTMLDivElement | null = null;
  resizeElement: HTMLDivElement | null = null;
  savePositionResizeX: number | null = null;
  savePositionResizeY: number | null = null;
  
  constructor(
    private _activatedRouter: ActivatedRoute,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentType = this._activatedRouter.snapshot.paramMap.get('departmentType');
    const self = this;
    document.addEventListener('mouseup', () => {
      self.movingElement = null;
      self.resizeElement = null;
    });
    this.departments = this._departmentService.get_all_department();

    document.addEventListener('mousemove', function (e) {
      if (self.movingElement) {
        self.move(e);
      } else if (self.resizeElement) {
        self.resize(e);
      }
    });
  }
  
  movingFromElement(e:any){
    e.stopPropagation();
    this.movingElement = e.target;
  }

  resizeFromElement(e:any){
    e.stopPropagation();
    this.savePositionResizeX = e.clientX;
    this.savePositionResizeY = e.clientY;
    this.resizeElement = e.target.parentElement;
  }

  createNewDepartment() {
    let department = new Department('', '', '', 100, 100, 400, 200);
    this._departmentService.create_department(department); 
    this.departments = this._departmentService.get_all_department(); 
  }

  resize(e: any) {
    if ( e.clientX - this.savePositionResizeX! < -5 || e.clientX - this.savePositionResizeX! > 5 || e.clientY - this.savePositionResizeY! < -5 || e.clientY - this.savePositionResizeY! > 5) {
      const width = this.resizeElement!.offsetWidth + e.clientX - this.savePositionResizeX!;
      const height = this.resizeElement!.offsetHeight +e.clientY - this.savePositionResizeY!;
      const department = this.departments.filter((department) => department.id === this.resizeElement!.id)[0];
      
      if (height > 50 && height < 300) {
        department.height = height;
      }
      if (width > 50 && width < 300) {
        department.width = width ;
      }
      this._departmentService.update_department(department);

      this.savePositionResizeX = e.clientX;
      this.savePositionResizeY = e.clientY;
    }
  }

  move(e: any) {
    const rect = document.querySelector('#container')!.getBoundingClientRect();
    const isAfterRight = e.clientX < rect.right - this.movingElement!.offsetWidth / 2;
    const isBeforeLeft = e.clientX > rect.x + this.movingElement!.offsetWidth / 2;
    const isAfterTop = e.clientY > rect.y + this.movingElement!.offsetHeight / 2;
    const isBeforeBottom = e.clientY < rect.bottom - this.movingElement!.offsetHeight / 2;

    const department = this.departments.filter((department) => department.id === this.movingElement!.id)[0];

    if (isBeforeLeft && isAfterRight) {
      department.left = e.clientX - this.movingElement!.offsetWidth / 2;
    } else if (isAfterRight) {
      department.left = rect.x;
    } else {
      department.left = rect.right - this.movingElement!.offsetWidth;
    }

    if (isAfterTop && isBeforeBottom) {
      department.top = e.clientY - this.movingElement!.offsetHeight / 2;
    } else if (isBeforeBottom) {
      department.top = rect.y;
    } else {
      department.top = rect.bottom - this.movingElement!.offsetHeight;
    }
    
    this._departmentService.update_department(department);
  }
}
