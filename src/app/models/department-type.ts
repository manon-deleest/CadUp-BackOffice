export class DepartmentType {
    id: string;
    name: string;
    favorite: boolean = false;

    constructor(id:string, name:string, favorite:boolean = false) {
        this.id = id;
        this.name = name;
        this.favorite = favorite;
    }
    static fromFirebase(doc:any): DepartmentType {
        let data = doc.data();
        return new DepartmentType(doc.id, data.Titre, data.favori);
    }
}
