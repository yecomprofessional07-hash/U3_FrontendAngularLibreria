import { Component } from '@angular/core';
import { ClienteModel } from "../../Models/cliente.model";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaModel } from '../../Models/venta.model';
import { ApiConexService } from '../../services/api-conex.service';

@Component({
  selector: 'app-log-venta',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './log-venta.html',
  styleUrl: './log-venta.css',
})
export class LogVenta {
  // Propiedades vinculadas al formulario (ngModel)
  nameCliente: string = "";
  DNIcliente: string = "";
  emailCliente: string = "";
  SelectLibroId: number = 10;
  cantidad: number = 5;
  precio: number = 150;

  constructor(
    private ApiConexService: ApiConexService
  ) {}

  guardarVenta() {
    // 1. Primero registramos al cliente
    const nuevoCliente: ClienteModel = {
      Nombre: this.nameCliente,
      Correo: this.emailCliente,
      DNI: this.DNIcliente
    };

    this.ApiConexService.CrearCliente(nuevoCliente).subscribe({
      next: (clienteCreado) => {
        
        // 2. Una vez creado el cliente, preparamos la venta con su ID
        const miVenta: VentaModel = {
          fecha: new Date(),
          clienteId: clienteCreado.id!, // Usamos el ID devuelto por la base de datos
          productoId: this.SelectLibroId,
          cantidad: this.cantidad,
          total: this.precio * this.cantidad,
        };

        // 3. Registramos la venta final
        this.ApiConexService.guardarVenta(miVenta).subscribe({
          next: (res) => {
            alert("Venta Realizada con éxito");
            this.resetForm(); // Limpiamos los campos
          },
          error: (err) => console.error("Error al registrar la venta", err)
        });
      },
      error: (err) => console.error("Error al registrar el cliente", err)
    });
  }

  // Método para dejar el formulario en blanco
  resetForm() {
    this.nameCliente = "";
    this.DNIcliente = "";
    this.emailCliente = "";
    this.SelectLibroId = 0;
    this.cantidad = 0;
    this.precio = 0;
  }
}

/* Esto lo hice con la intencion de registro de ventas para carrito, 
por si la compra es de una sola vez y evitar hacer un registro forzado*/
