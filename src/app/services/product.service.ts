import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc,  getDoc,  getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _product = new BehaviorSubject<Product[]>([]);
  
  
  get ProductFromDepartmentObservable(): Observable<Product[]> {
    return this._product.asObservable();
  }


  constructor(private db: Firestore) { }
  collecti = collection(this.db, 'product'); 

  // Récupérer tous les objet departments dans firebase 
  get_product_without_department(){
    let queryDate = query(this.collecti, where('idDepartment', '==', '')); 

    let products : Product[] = [];
    
    getDocs(queryDate).then((docs) => {
      docs.docs.forEach((doc) => {
        products.push(Product.fromFirebase(doc));
      });
    });
    return products;
  }

  get_product_form_department(idDepartment : string){
    let queryDate = query(this.collecti, where('idDepartment', '==', idDepartment)); 

    let products : Product[] = [];
    
    getDocs(queryDate).then((docs) => {
      docs.docs.forEach((doc) => {
        products.push(Product.fromFirebase(doc));
      });
    });

    this._product.next(products);
    return true; 
  }

  delete_product(idProduct : string){
    deleteDoc(doc(this.db, "product", idProduct));
  }

  create_product(product : Product){
    addDoc(this.collecti, Product.transformToMap(product));
  }

  update_product(product : Product, idDepartment : string = '0'){
    updateDoc(doc(this.db, "product", product.id), Product.transformToMap(product));
    if(idDepartment !== '0' ){
      this.get_product_form_department(idDepartment);
    }
  }

  detached_product(product : string, idService : string){
    this.get_product_by_id(product).then((productObject) => {
      if(productObject !== undefined){
        productObject.idDepartment = '';
        updateDoc(doc(this.db, "product", productObject.id), Product.transformToMap(productObject));
      }
    }); 
    this.get_product_form_department(idService);
  }

  async get_product_by_id(idProduct : string) : Promise<Product | undefined> {
    let product : Product|undefined = undefined ;
    let docRef = doc(this.db, "product", idProduct);
  
    await getDoc(docRef).then((doc) => {
      product = Product.fromFirebase(doc);
    }).catch((error) => {
      console.log("Error getting document:", error);
    }); 
    return product;    
  }
}
