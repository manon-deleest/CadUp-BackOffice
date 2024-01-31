import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { DepartmentType } from '../models/department-type';

@Injectable({
  providedIn: 'root'
})
export class DepartmentTypeService {

  constructor(private db: Firestore) { }
  collecti = collection(this.db, 'TypeRayon');
  queryALL = query(this.collecti); 
  queryFavorite = query(this.collecti, where('favori', '==', true));

  // Récupérer tous les TypeRayon dans firebase 
  get_all_department_type(){
    let departmentsTypes : DepartmentType[] = [];
    
    getDocs(this.queryALL).then((docs) => {
      docs.docs.forEach((doc) => {
        departmentsTypes.push(DepartmentType.fromFirebase(doc));
      });
    });
    return departmentsTypes;
  }

  get_favorite_department_type(){
    let departmentsTypes : DepartmentType[] = [];
    
    getDocs(this.queryFavorite).then((docs) => {
      docs.docs.forEach((doc) => {
        departmentsTypes.push(DepartmentType.fromFirebase(doc));
      });
    });
    return departmentsTypes;
  }

  deleteDepartementType(id: string){
    let docRef = doc(this.db, "TypeRayon", id);
    deleteDoc(docRef);
  }
}
