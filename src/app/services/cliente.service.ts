import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../Models/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

    private url= "http apis y mas";
    constructor(private http: HttpClient){}

    registrar(cliente: ClienteModel){
        return this.http.post<ClienteModel>(this.url, cliente);
    }

}

//Este Archivo, es para conectarse a la api, manda lo de log-venta a la api con estructura.