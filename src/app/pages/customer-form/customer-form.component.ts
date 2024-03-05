import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  idCustomer: string | null = null;
  customer: Customer | undefined;
  form: FormGroup | undefined;
  isSubmited: boolean = false;

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this._activatedRouter.params.subscribe((params) => {
      if(params['idCustomer'] !== undefined){
        this.idCustomer = params['idCustomer'];
      }
    });
    this.initForm();


    if (this.idCustomer !== null) {
      this.customer = await this._customerService.get_customer_by_id(this.idCustomer );
      console.log(this.customer); 
      if (this.form && this.customer) {
        this.form.patchValue({
          id: this.customer.id,
          name: this.customer.name,
          firstName: this.customer.firstName,
          numBarCode: this.customer.numBarCode,
        });
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      numBarCode: ['', Validators.required],
    });
  }

  onSend() {
    this.isSubmited = true;
    if (this.form?.valid) {
      console.log(this.form?.value);
      if (this.idCustomer === null) {
        let customer = new Customer(
          '',
          this.form?.value.name,
          this.form?.value.firstName,
          this.form?.value.numBarCode
        );
        this._customerService.create_customer(customer);
        
        this._router.navigate(['/customer']);
      } else {
        let customer = this.customer;
        if (customer) {
          customer.name = this.form?.value.name;
          customer.firstName = this.form?.value.firstName;
          customer.numBarCode = this.form?.value.numBarCode;
          this._customerService.update_customer(customer);
        } else {
          this._snackBar.open(
            'la modification du rayon à échoué veuillez rééssayer plus tard ! ',
            'Ok '
          );
        }
        this._router.navigate(['/customer']);
      }

      this.isSubmited = false;
    }
  }

  deleteDepartment() {
    if (this.customer) {
      this._customerService.deleteCustomer(this.customer.id);
    }
    this._router.navigate(['/customer']);
  }
}
