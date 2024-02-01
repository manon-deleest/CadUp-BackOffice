import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc,  getDoc,  getDocs, query, updateDoc } from '@angular/fire/firestore';
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
        departments.push(Department.fromFirebase(doc));
      });
    });
    return departments;
  }

  // Créer un nouveau department dans firebase
  create_department(department:Department){
    addDoc(this.collecti, Department.transformToMap(department))
  }

  // Update un department dans firebase
  update_department(department:Department){
    let docRef = doc(this.db, "department", department.id);
    updateDoc(docRef, Department.transformToMap(department));
  }

  async get_department_by_id(id:string) : Promise<Department | any> {
    let department : Department|undefined = undefined ;
    let docRef = doc(this.db, "department", id);
  
    await getDoc(docRef).then((doc) => {
      department = Department.fromFirebase(doc);
      return department;
    }); 
    return department;
  }

  delete_department(department:Department){
    let docRef = doc(this.db, "department", department.id);
    deleteDoc(docRef);
  }
}
