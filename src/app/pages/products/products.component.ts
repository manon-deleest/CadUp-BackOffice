import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; 
  id_department : string | null = null;

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _productService: ProductService,
    private _router : Router,
    ) { }

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params) => {
      this.id_department = params['idDepartment']; 
    }); 
    this.products = this._productService.get_product_without_department();
  }

}
