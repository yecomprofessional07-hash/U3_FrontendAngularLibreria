import { Component, OnInit } from '@angular/core';
import { ClienteModel } from "../../Models/cliente.model";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaModel } from '../../Models/venta.model';
import { LibroModel } from '../../Models/libro.model';
import { ApiConexService } from '../../services/api-conex.service';

@Component({
  selector: 'app-log-venta',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './log-venta.html',
  styleUrl: './log-venta.css',
})

export class LogVenta implements OnInit {
  // Propiedades vinculadas al formulario (ngModel)
  nameCliente: string = "";
  DNIcliente: string = "";
  emailCliente: string = "";
  SelectLibroId: number = 10;
  cantidad: number = 5;
  precio: number = 150;

// Selección de libros
  libros: LibroModel[] = [];
  librosFiltrados: LibroModel[] = [];

  // Buscador
  searchText: string = "";


  // 🔹 Cargar libros (simulación o comentario para API)
  cargarLibros() {
    // Aquí iría la llamada real a la API de libros
    // this.libroService.getAll().subscribe(data => {
    //   this.libros = data;
    //   this.librosFiltrados = data;
    // });

    // Datos de prueba mientras tanto
    this.libros = [
      new LibroModel(1, "El Principito", "Antoine de Saint-Exupéry", 200, 10),
      new LibroModel(2, "Clean Code", "Robert C. Martin", 500, 5),
      new LibroModel(3, "Harry Potter", "J.K. Rowling", 350, 8)
    ];

    this.librosFiltrados = this.libros;
  }

  // 🔍 Buscar libro por título
  buscar() {
    this.librosFiltrados = this.libros.filter(libro =>
      libro.Titulo.toLowerCase().includes(this.searchText.toLowerCase())
    );
  } 


  constructor(
    private ApiConexService: ApiConexService
  ) {}

 ngOnInit(): void {
    this.cargarLibros();
  }

  //  Seleccionar libro y actualizar precio automáticamente
  seleccionarLibro(libroId: number) {
    const libro = this.libros.find(l => l.id === libroId);
    if (libro) {
      this.SelectLibroId = libro.id;
      this.precio = libro.Precio;
      this.cantidad = 1; // Reiniciar cantidad al seleccionar
    }
  }


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
    this.searchText = "";
    this.librosFiltrados = this.libros; // Resetear la lista filtrada
  }
}

/* Esto lo hice con la intencion de registro de ventas para carrito, 
por si la compra es de una sola vez y evitar hacer un registro forzado*/
