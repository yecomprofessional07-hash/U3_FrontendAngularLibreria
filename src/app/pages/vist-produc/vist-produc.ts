import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaModel } from '../../Models/venta.model';
import { ApiConexService } from '../../services/api-conex.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vist-produc',
  imports: [CommonModule, FormsModule],
  templateUrl: './vist-produc.html',
  styleUrl: './vist-produc.css',
})
export class VistProduc implements OnInit {
  libro: any = {
    titulo: 'Cargando...',
    autor: 'Cargando...',
    categoriaNombre: 'Cargando...',
    precio: 0,
    descripcion: 'Cargando...',
    editorial: '-',
    anio: '-',
    paginas: '-',
    idioma: '-',
    imagen: '/images/test.jpg'
  };
  
  cantidad: number = 1;
  calificacion: number = 4;
  totalResenas: number = 0;
  
  mostrarRecibo: boolean = false;
  tipoTransaccion: 'compra' | 'carrito' = 'compra';

  constructor(private router: Router,
    private apiService: ApiConexService
  ) {}

ngOnInit() {
  const libroGuardado = localStorage.getItem('libroSeleccionado');
  
  if (libroGuardado) {
    const objetoRecuperado = JSON.parse(libroGuardado);
    
    // 1. EXTRAER EL LIBRO:
    // Si guardaste la respuesta completa, buscamos dentro de .data[0]
    // Si guardaste el libro suelto, lo usamos directamente.
    let libroData = objetoRecuperado.data ? objetoRecuperado.data : objetoRecuperado;
    
    // Si es un array, tomamos el primero (o el que necesites)
    if (Array.isArray(libroData)) {
        libroData = libroData[0]; 
    }

    console.log('Datos finales del libro:', libroData);

    // 2. MAPEO SEGURO
    this.libro = {
      titulo: libroData.titulo || 'Sin título',
      autor: libroData.autor || 'Sin autor',
      precio: libroData.precio || 0,
      stock: libroData.stock || 0,
      sinopsis: libroData.sinopsis || 'Sinopsis no encontrada', // <--- Clave
      categoriaNombre: libroData.categoriaNombre || 'General',
      editorial: libroData.editorial || 'No especificada',
      anio: libroData.anio || 'N/A',
      idioma: libroData.idioma || 'Español',
      imagen: `images/${libroData.id}.jpg`
    };
  }
}


  changeQty(delta: number) {
    const nuevaCantidad = this.cantidad + delta;
    if (nuevaCantidad >= 1) {
      this.cantidad = nuevaCantidad;
    }
  }

  get precioTotal(): number {
    return this.libro.precio * this.cantidad;
  }

  comprarAhora() {
    this.tipoTransaccion = 'compra';
    this.mostrarRecibo = true;
  }

  agregarAlCarrito() {
    this.tipoTransaccion = 'carrito';
    this.mostrarRecibo = true;
  }

  cerrarRecibo() {
    this.mostrarRecibo = false;
  }

  seguirComprando() {
    this.mostrarRecibo = false;
    this.router.navigate(['/inicio']);
  }

  volverAlInicio() {
    this.router.navigate(['/inicio']);
  }

  comprar() {
  // 1. Recuperamos el libro original para obtener su ID real de la base de datos
  const libroGuardado = localStorage.getItem('libroSeleccionado');
  if (!libroGuardado) return;
  const libroOriginal = JSON.parse(libroGuardado);

  // 2. Estructuramos el objeto según VentaModel
  const nuevaVenta: VentaModel = {
    clienteId: 1, // TIP: Aquí deberías usar el ID del usuario logueado
    detalles: [
      {
        libroId: libroOriginal.id || libroOriginal.Id, // Usamos el ID de la DB
        cantidad: this.cantidad
      }
    ]
  };

  // 3. Llamamos al servicio
  this.apiService.guardarVenta(nuevaVenta).subscribe({
    next: (res) => {
      console.log('Venta procesada con éxito:', res);
      alert('¡Compra realizada con éxito!');
      this.mostrarRecibo = false;
      this.router.navigate(['/inicio']);
    },
    error: (err) => {
      console.error('Error al comprar:', err);
      // Si el backend devuelve el objeto ApiResponse, el mensaje viene en err.error.message
      alert('Error al procesar la compra: ' + (err.error?.message || 'Servidor no disponible'));
    }
  });
}

}