export class Service{
    id:string;
    nombre:string;
    descripcion:string;
    estatus:boolean;
    constructor(id:string){
        this.id = id;
        this.nombre ="";
    }
}