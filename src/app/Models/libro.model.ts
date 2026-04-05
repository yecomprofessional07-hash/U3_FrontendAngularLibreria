export class LibroModel {

    id: number;
    Titulo: string;
    Autor: string;
    Precio: number;
    Stock: number;
    
    constructor( id: number, Titulo: string, Autor: string, Precio: number, Stock: number){
        this.id = id;
        this.Autor = Autor;
        this.Titulo = Titulo;
        this.Precio = Precio;
        this.Stock = Stock;
    }
}
//Interface para estructurar los Datos