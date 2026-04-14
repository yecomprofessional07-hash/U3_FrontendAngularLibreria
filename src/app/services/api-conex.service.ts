import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importar esto
import { ClienteModel } from '../Models/cliente.model';
import { LibroModel } from '../Models/libro.model';
import { VentaModel } from '../Models/venta.model';
import { CategoriaModel } from '../Models/categoria.model';

@Injectable({
  providedIn: 'root'
})

export class ApiConexService {

    private urlBase = "https://localhost:7263/api";
    private urlClientes = `${this.urlBase}/Clientes`;
    private urlLibros = `${this.urlBase}/Libros`; 
    private urlCategoria = `${this.urlBase}/categorias`;
    constructor(private http: HttpClient){}

    //Metodos del Cliente

    CrearCliente(cliente: ClienteModel): Observable<ClienteModel>{
        return this.http.post<ClienteModel>(this.urlClientes, cliente);
    }

    ObtenerCliente(id: number): Observable<ClienteModel>{
        return this.http.get<ClienteModel>(`${this.urlClientes}/${id}`);
    }
    ActualizarCliente(id: number,cliente: ClienteModel): Observable<ClienteModel>{
        return this.http.put<ClienteModel>(`${this.urlClientes}/${id}`, cliente);
    }
    EliminarCliente(id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlClientes}/${id}`);
    }
    ListarClientes(): Observable<ClienteModel[]>{
        return this.http.get<ClienteModel[]>(this.urlClientes);
    }

    //Metodos del Libro

    CrearLibro(libro: LibroModel): Observable<LibroModel>{
        return this.http.post<LibroModel>(this.urlLibros, libro);
    }

    ObtenerLibro(id: number): Observable<LibroModel>{
        return this.http.get<LibroModel>(`${this.urlLibros}/${id}`);
    }
    ActualizarLibro(id: number, libro: LibroModel): Observable<LibroModel>{
        return this.http.put<LibroModel>(`${this.urlLibros}/${id}`, libro);
    }
    EliminarLibro(id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlLibros}/${id}`);
    }
    ListarLibro(): Observable<any>{
        return this.http.get<any>(this.urlLibros);
    }

    //Metodos de las categorias
    CrearCategoria(cliente: CategoriaModel): Observable<CategoriaModel>{
        return this.http.post<CategoriaModel>(this.urlCategoria, cliente);
    }

    ObtenerCategoria(id: number): Observable<CategoriaModel>{
        return this.http.get<CategoriaModel>(`${this.urlClientes}/${id}`);
    }
    ActualizarCategoria(id: number,cliente: CategoriaModel): Observable<CategoriaModel>{
        return this.http.put<CategoriaModel>(`${this.urlCategoria}/${id}`, cliente);
    }
    EliminarCategoria(id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlCategoria}/${id}`);
    }
    ListarCategoria(): Observable<CategoriaModel[]>{
        return this.http.get<CategoriaModel[]>(this.urlCategoria);
    }


    //Metodos de la Venta

    guardarVenta(venta: VentaModel){
        return this.http.post<VentaModel>(this.urlLibros, venta);
    }

}
