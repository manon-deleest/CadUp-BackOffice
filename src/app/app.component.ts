import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnecte: boolean | undefined;
  
  constructor(
    private _router: Router,
    private authentificationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isConnecte = this.authentificationService.utilisateurEstConnecte; 
    console.log(this.isConnecte); 
    const user = localStorage.getItem('userEstConnecte');
    if(user){
      this.isConnecte =JSON.parse(user);
    }
    console.log(this.isConnecte)

  }


}
