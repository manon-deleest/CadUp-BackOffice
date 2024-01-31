import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
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

  async get_department_type_by_id(id:string) : Promise<DepartmentType | any> {
    let departmentType : DepartmentType|undefined = undefined ;
    let docRef = doc(this.db, "TypeRayon", id);
  
    await getDoc(docRef).then((doc) => {
      departmentType = DepartmentType.fromFirebase(doc);
      return departmentType;
    }); 
    return departmentType;
  }
 
  update_department_type(departmentType: DepartmentType){
    let docRef = doc(this.db, "TypeRayon", departmentType.id);
    updateDoc(docRef, DepartmentType.transformToMap(departmentType));
  }

  add_department_type(departmentType:DepartmentType){
    addDoc(this.collecti, DepartmentType.transformToMap(departmentType))
  }
}
