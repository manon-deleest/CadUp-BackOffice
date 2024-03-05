import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc,  getDoc,  getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Add } from '../models/add';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private db: Firestore) { }
  collecti = collection(this.db, 'add'); 
  queryDate = query(this.collecti); 

  get_add_all(){
    let adds : Add[] = [];
    
    getDocs(this.queryDate).then((docs) => {
      docs.docs.forEach((doc) => {
        adds.push(Add.fromFirebase(doc));
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    }); ;

    return adds; 
  }

  delete_add(idProduct : string){
    deleteDoc(doc(this.db, "add", idProduct));
  }

  create_add(add : Add){
    addDoc(this.collecti, Add.transformToMap(add));
  }

}
