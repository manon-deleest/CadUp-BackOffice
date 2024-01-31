export class Department {
    id: string;
    name: string;
    description: string;
    idDepartmentType: string;
    width: number = 100;
    height: number = 100;
    left: number = 0;
    top: number = 0;
    color: string; 

    constructor(id:string, name:string, description:string, idDepartmentType: string = '1', width:number = 100, height:number = 100, left:number = 0, top:number = 0, color:string = '#1BA8A8') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.idDepartmentType = idDepartmentType;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.color = color;

    }

    static fromFirebase(doc:any): Department {
        let data = doc.data();
        return new Department(doc.id, data.name, data.description, data.idDepartmentType, data.width, data.height, data.left, data.top, data.color);
    }

    static transformToMap(department : Department){

        return {
            description: department.description, 
            idDepartmentType: department.idDepartmentType,
            height: department.height,
            left : department.left,
            name : department.name,
            top : department.top,
            width : department.width,
            color : department.color
          }
    }

    

}
