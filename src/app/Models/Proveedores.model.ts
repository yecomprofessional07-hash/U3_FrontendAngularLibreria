export class ProveedoresModel {

    id?: number;
    Nombre: string;
    Telefono: number;
    Correo: string;
    
    
    constructor( id: number, Nombre: string, Telefono: number, Correo: string){
        this.id = id;
        this.Nombre = Nombre;
        this.Telefono = Telefono;
        this.Correo = Correo;
    }
}