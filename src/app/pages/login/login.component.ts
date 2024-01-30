import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSendForm = false;
  isConnexionError = false;
  constructor(
    private formBuilder : FormBuilder, 
    private _router : Router,
    private authentificationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    if(this.authentificationService.utilisateurEstConnecte){
      this._router.navigate(['/home']);
    }else{
      this.initForm();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  async login() {
    this.isSendForm = true;
    if (this.form.valid)
    {
      try {
        await this.authentificationService.loginUser(this.form.value.email, this.form.value.password);
        this._router.navigate(['/home']);
      }
      catch (e)
      {
        this.isConnexionError = true;
      }
    }
  }


}
