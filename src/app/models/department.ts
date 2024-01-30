export class Department {
    id: string;
    name: string;
    description: string;
    width: number = 100;
    height: number = 100;
    left: number = 0;
    top: number = 0;

    constructor(id:string, name:string, description:string, width:number = 100, height:number = 100, left:number = 0, top:number = 0) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;

    }

    static fromFirebase(doc:any): Department {
        let data = doc.data();
        return new Department(doc.id, data.name, data.description, data.width, data.height, data.left, data.top);
    }

}
