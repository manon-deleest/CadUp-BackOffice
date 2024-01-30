import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor(
    private _router: Router,
    private authentificationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authentificationService.utilisateurEstConnecte) {
      this._router.navigate(['/home']);
    } else {
      this._router.navigate(['/login']);
    }
  }
}
