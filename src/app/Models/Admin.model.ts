export class AdminModel {

    id?: number;
    Nombre: string;
    Contraseña: string;
    Correo: string;
    
    constructor( id: number, Nombre: string, Contraseña: string, Correo: string){
        this.id = id;
        this.Nombre = Nombre;
        this.Contraseña = Contraseña;
        this.Correo = Correo;
    }
}