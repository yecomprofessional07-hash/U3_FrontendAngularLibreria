export class LibroModel {

    id: number;
    Titulo: string;
    Autor: string;
    Precio: number;
    Stock: number;
    Sinopsis: string;
    
    constructor( id: number, Titulo: string, Autor: string, Precio: number, Stock: number, Sinopsis: string){
        this.id = id;
        this.Autor = Autor;
        this.Titulo = Titulo;
        this.Precio = Precio;
        this.Stock = Stock;
        this.Sinopsis = Sinopsis;
    }
}
//Interface para estructurar los Datos