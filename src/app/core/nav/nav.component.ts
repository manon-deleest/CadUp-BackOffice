import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faXRay } from '@fortawesome/free-solid-svg-icons';
import { DepartmentType } from 'src/app/models/department-type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DepartmentTypeService } from 'src/app/services/department-type.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  readonly burger = faBars; 
  readonly cross = faXRay;
  menuIsOpen: boolean = false; 
  email: string | null = null;
  departementsTypes : DepartmentType[] = [];

  constructor(
    private _router : Router,
    private authentificationService: AuthenticationService,
    private departementTypeService: DepartmentTypeService
    ) { }

  ngOnInit(): void {
    this.menuIsOpen = window.innerWidth>740;
    this.email = this.authentificationService.getEmail();
    this.departementsTypes = this.departementTypeService.get_favorite_department_type();
  }

  toogleMenu(event: Event){
    event.stopPropagation(); 
    this.menuIsOpen = !this.menuIsOpen;
  }

  onCloseMenu() :void{
    if(window.innerWidth <= 740) {
      this.menuIsOpen = false; 
    }
  }

  signOut(){
    this.authentificationService.signOut();
    this._router.navigate(['/login']);
  }

  help(){
    // TODO ajouter le lien vers la vidéo d'aide
  }

}
