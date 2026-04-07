import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importar esto
import { ClienteModel } from '../Models/cliente.model';
import { LibroModel } from '../Models/libro.model';
import { VentaModel } from '../Models/venta.model';

@Injectable({
  providedIn: 'root'
})

export class ApiConexService {

    private url= "http apis y mas";
    constructor(private http: HttpClient){}

    //Metodos del Cliente

    CrearCliente(cliente: ClienteModel): Observable<ClienteModel>{
        return this.http.post<ClienteModel>(this.url, cliente);
    }

    ObtenerCliente(id: number): Observable<ClienteModel>{
        return this.http.get<ClienteModel>(`${this.url}/${id}`);
    }
    ActualizarCliente(id: number,cliente: ClienteModel): Observable<ClienteModel>{
        return this.http.put<ClienteModel>(`${this.url}/${id}`, cliente);
    }
    EliminarCliente(id: number): Observable<any>{
        return this.http.delete<any>(`${this.url}/${id}`);
    }
    ListarClientes(): Observable<ClienteModel[]>{
        return this.http.get<ClienteModel[]>(this.url);
    }

    //Metodos del Libro

    CrearLibro(libro: LibroModel): Observable<LibroModel>{
        return this.http.post<LibroModel>(this.url, libro);
    }

    ObtenerLibro(id: number): Observable<LibroModel>{
        return this.http.get<LibroModel>(`${this.url}/${id}`);
    }
    ActualizarLibro(id: number, libro: LibroModel): Observable<LibroModel>{
        return this.http.put<LibroModel>(`${this.url}/${id}`, libro);
    }
    EliminarLibro(id: number): Observable<any>{
        return this.http.delete<any>(`${this.url}/${id}`);
    }
    ListarLibro(): Observable<LibroModel[]>{
        return this.http.get<LibroModel[]>(this.url);
    }

    //Metodos de la Venta

    guardarVenta(venta: VentaModel){
        return this.http.post<VentaModel>(this.url, venta);
    }

}
