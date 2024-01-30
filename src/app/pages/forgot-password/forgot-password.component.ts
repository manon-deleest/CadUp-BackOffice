import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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
      email : ['', [Validators.required, Validators.email]]
    });
  }

  async send() {
    this.isSendForm = true;
    if (this.form.valid)
    {
      try {
        await this.authentificationService.sendResetPassword(this.form.value.email);
        this._router.navigate(['/login']);
      }
      catch (e){
        this.isConnexionError = true;
      }
    }
  }

}
