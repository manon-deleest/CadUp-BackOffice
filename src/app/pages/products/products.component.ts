import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; 
  id_department : string | null = null;
  selectedId: Set<string> = new Set();

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _productService: ProductService,
    private _router : Router,
    private _location: Location
    ) { }

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params) => {
      this.id_department = params['idDepartment']; 
      console.log(this.id_department);
    }); 
    this.products = this._productService.get_product_without_department();
  }

  onChecked(e:Event, id: string){
    e.stopPropagation();
    if(this.selectedId.has(id)){
      this.selectedId.delete(id); 
    }else{
      this.selectedId.add(id); 
    }
  }

  goBack(){
    this._location.back();
  }

  confirm(){
    console.log(this.selectedId.size); 
    if(this.selectedId.size == 0){
      alert("Vous devez sélectionner au moins un produit");
      return; 
    }else{
      this.selectedId.forEach((id) => {
        let product = this.products.find((product) => product.id == id);
        if(product !== undefined && this.id_department !== null){
          console.log(this.id_department);
          product.idDepartment = this.id_department;
          this._productService.update_product(product, this.id_department);
        }
      }); 
      this._location.back();
    }

  }

  create(){
    this._router.navigate(['department/'+this.id_department+'/product/create']);
  }

}
