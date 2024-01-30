import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private db: Firestore) { }
  collecti = collection(this.db, 'department');
  queryDate = query(this.collecti); 

  // Récupérer tous les objet departments dans firebase 
  get_all_department(){
    let departments : Department[] = [];
    
    getDocs(this.queryDate).then((docs) => {
      docs.docs.forEach((doc) => {
        let department : Department = Department.fromFirebase(doc);
        departments.push(department);
      });
    });
    return departments;
  }

  // Créer un nouveau department dans firebase
  create_department(department:Department){
    addDoc(this.collecti,{
      description: department.description, 
      height: department.height,
      left : department.left,
      name : department.name,
      top : department.top,
      width : department.width
    })
  }

  // Update un department dans firebase
  update_department(department:Department){
    let docRef = doc(this.db, "department", department.id);
    updateDoc(docRef, {
      description: department.description, 
      height: department.height,
      left : department.left,
      name : department.name,
      top : department.top,
      width : department.width
    });
  }
}
