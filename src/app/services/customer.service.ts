import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc,  getDoc,  getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private db: Firestore) { }
  collecti = collection(this.db, 'client'); 
  queryDate = query(this.collecti); 

  get_all_customer(){
    let customers : Customer[] = [];
    
    getDocs(this.queryDate).then((docs) => {
      docs.docs.forEach((doc) => {
        customers.push(Customer.fromFirebase(doc));
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    }); ;

    return customers; 
  }

  create_customer(customer : Customer){
    addDoc(this.collecti, Customer.transformToMap(customer));
  }

  deleteCustomer(idCustomer : string){
    deleteDoc(doc(this.db, "client", idCustomer));
  }

  update_customer(customer : Customer){
    updateDoc(doc(this.db, "client", customer.id), Customer.transformToMap(customer));
  }

  async get_customer_by_id(id:string) : Promise<Customer | any> {
    let customer : Customer|undefined = undefined ;
    let docRef = doc(this.db, "client", id);
  
    await getDoc(docRef).then((doc) => {
      customer = Customer.fromFirebase(doc);
      return customer;
    }).catch((error) => {
      console.log("Error getting document:", error);
    }); 
    return customer;
  }
}
