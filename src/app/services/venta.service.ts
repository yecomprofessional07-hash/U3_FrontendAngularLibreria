import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../Models/venta.model';

@Injectable({
  providedIn: 'root'
})

export class VentaService {
    private url = "http y mi api";

    constructor(private http: HttpClient){}

    guardar(venta: VentaModel){
        return this.http.post<VentaModel>(this.url, venta);
    }
}
//Este Archivo, es para conectarse a la api, manda lo de log-venta a la api con estructura.