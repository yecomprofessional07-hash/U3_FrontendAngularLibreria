export class ClienteModel {

    id?: number;
    Nombre: string;
    DNI: string;
    Correo: string;
    
    constructor( id: number, Nombre: string, DNI: string, Correo: string){
        this.id = id;
        this.Nombre = Nombre;
        this.DNI = DNI;
        this.Correo = Correo;
    }
}
//Interface para estructurar los Datos