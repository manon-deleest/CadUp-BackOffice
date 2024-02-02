import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnecte: boolean | undefined;
  private _estConnecteSubscription?: Subscription;
  
  constructor(
    private _router: Router,
    private authentificationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._estConnecteSubscription = this.authentificationService.utilisateurEstConnecteObservable.subscribe(estConnecte =>{this.isConnecte = estConnecte; console.log(estConnecte)} ); 
    this.authentificationService.getInfosUser()
    this._router.navigate(['']);

  }

  ngOnDestroy(): void {
    if(this._estConnecteSubscription){
      this._estConnecteSubscription.unsubscribe();
    }
  }


}
