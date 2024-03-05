export class Add {
    id: string;
    image: string;

    constructor(id:string, image:string) {
        this.id = id;
        this.image = image;
    }

    static fromFirebase(doc:any): Add {
        let data = doc.data();
        return new Add(doc.id, data.image);
    }

    static transformToMap(add : Add){

        return {
            id: add.id, 
            image: add.image
          }
    }

    

}
