import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router : Router,
    private authentificationService: AuthenticationService
    ) { }

  ngOnInit(): void {
  }

  signOut(){
    this.authentificationService.signOut();
    this._router.navigate(['/login']);
  }

}
