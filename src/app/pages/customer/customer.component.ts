import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(
    private _CustomerService: CustomerService
  ) { }
  
  columns: Column[] = [
    {
      'nom':"Nom", 
      "visibleMobile": true, 
      "nameAttribut":"name",
      "type": 'texte',
      "width": '200px'
    },{
      'nom':"Prénom", 
      "visibleMobile": false, 
      "nameAttribut":"firstName",
      "type": 'texte',
      "width": '200px'
    },{
      'nom':"Code barre", 
      "visibleMobile": true, 
      "nameAttribut":"numBarCode",
      "type": 'texte',
      "width": '200px'
    }
  ];
  data: Customer[] = []; 

  ngOnInit(): void {
    this.data = this._CustomerService.get_all_customer(); 
  }

  
  onDelete(customers: Set<string> ){
    customers.forEach( (customer) => {
      this._CustomerService.deleteCustomer(customer);
    }); 
    this.data = this._CustomerService.get_all_customer(); 
  }

}
