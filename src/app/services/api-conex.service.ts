import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from '../Models/cliente.model';
import { LibroModel } from '../Models/libro.model';
import { VentaModel } from '../Models/venta.model';
import { ProveedoresModel } from '../Models/Proveedores.model';
import { CategoriaModel } from '../Models/categoria.model';

import { LoginRequest } from '../Models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConexService {

    private urlBase = "https://localhost:7263/api";
    private urlClientes = `${this.urlBase}/Clientes`;
    private urlLibros = `${this.urlBase}/Libros`; 
    private urlCategoria = `${this.urlBase}/categorias`;
    private urlProveedores = `${this.urlBase}/Proveedores`; 
    private urlAdmin = `${this.urlBase}/Administradores`;

    constructor(private http: HttpClient){}

    // Metodos del Administrador

    loginAdmin(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.urlAdmin}/Login`, credentials); 
    }
    // Metodos del Cliente
    CrearCliente(cliente: ClienteModel): Observable<ClienteModel>{
        return this.http.post<ClienteModel>(this.urlClientes, cliente);
    }
    ObtenerCliente(id: number): Observable<ClienteModel>{
        return this.http.get<ClienteModel>(`${this.urlClientes}/${id}`);
    }
    ActualizarCliente(id: number, cliente: ClienteModel): Observable<ClienteModel>{
        return this.http.put<ClienteModel>(`${this.urlClientes}/${id}`, cliente);
    }
    EliminarCliente(id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlClientes}/${id}`);
    }
    ListarClientes(): Observable<ClienteModel[]>{
        return this.http.get<ClienteModel[]>(this.urlClientes);
    }
    loginCliente(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.urlClientes}/Login`, credentials); 
    }

    // Metodos del Libro
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

    // Metodos de las categorias
    CrearCategoria(categoria: CategoriaModel): Observable<CategoriaModel>{
        return this.http.post<CategoriaModel>(this.urlCategoria, categoria);
    }
    ObtenerCategoria(id: number): Observable<CategoriaModel>{
        return this.http.get<CategoriaModel>(`${this.urlCategoria}/${id}`);
    }
    ActualizarCategoria(id: number, categoria: CategoriaModel): Observable<CategoriaModel>{
        return this.http.put<CategoriaModel>(`${this.urlCategoria}/${id}`, categoria);
    }
    EliminarCategoria(id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlCategoria}/${id}`);
    }
    ListarCategoria(): Observable<any>{
        return this.http.get<any>(this.urlCategoria);
    }

    // Metodos del Proveedor
    CrearProveedor(Proveedor: ProveedoresModel): Observable<ProveedoresModel>{
        return this.http.post<ProveedoresModel>(this.urlProveedores, Proveedor);
    }
    ObtenerProveedor(id: number): Observable<ProveedoresModel>{
        return this.http.get<ProveedoresModel>(`${this.urlProveedores}/${id}`);
    }
    ActualizarProveedor(id: number, Proveedor: ProveedoresModel): Observable<ProveedoresModel>{
        return this.http.put<ProveedoresModel>(`${this.urlProveedores}/${id}`, Proveedor);
    }
    EliminarProveedor(id: number): Observable<any>{
        return this.http.delete<any>(`${this.urlProveedores}/${id}`);
    }
    ListarProveedor(): Observable<ProveedoresModel[]>{
        return this.http.get<ProveedoresModel[]>(this.urlProveedores);
    }

    // Metodos de la Venta
    guardarVenta(venta: VentaModel): Observable<VentaModel>{
        return this.http.post<VentaModel>(`${this.urlBase}/Ventas`, venta);
    }
}

