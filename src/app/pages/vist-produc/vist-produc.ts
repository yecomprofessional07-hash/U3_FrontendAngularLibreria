import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    descripcion: 'Cargando información del libro...',
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

  constructor(private router: Router) {}

  ngOnInit() {
    // SOLO usar localStorage, NO llamar a la API
    const libroGuardado = localStorage.getItem('libroSeleccionado');
    
    if (libroGuardado) {
      const libroOriginal = JSON.parse(libroGuardado);
      console.log('Libro recuperado del localStorage:', libroOriginal); // Para depurar
      
      // Mapear los datos del libro
      this.libro = {
        titulo: libroOriginal.Titulo || libroOriginal.titulo || 'Título no disponible',
        autor: libroOriginal.Autor || libroOriginal.autor || 'Autor no disponible',
        precio: libroOriginal.Precio || libroOriginal.precio || 0,
        categoriaNombre: libroOriginal.categoriaNombre || this.obtenerCategoriaNombre(libroOriginal.CategoriaId),
        descripcion: libroOriginal.Descripcion || libroOriginal.descripcion || `"${libroOriginal.Titulo || libroOriginal.titulo}" - Una obra fascinante.`,
        editorial: libroOriginal.Editorial || libroOriginal.editorial || 'No especificada',
        anio: libroOriginal.Anio || libroOriginal.anio || 'No especificado',
        paginas: libroOriginal.Paginas || libroOriginal.paginas || 'No especificado',
        idioma: libroOriginal.Idioma || libroOriginal.idioma || 'Español',
        imagen: libroOriginal.ImagenUrl || libroOriginal.imagen || '/images/test.jpg'
      };
    } else {
      console.warn('No hay libro seleccionado en localStorage');
      // Opcional: redirigir al inicio si no hay libro
      // this.router.navigate(['/inicio']);
    }
  }

  obtenerCategoriaNombre(categoriaId: number): string {
    const categorias: { [key: number]: string } = {
      1: 'Ficción',
      2: 'Ciencia',
      3: 'Historia',
      4: 'Autoayuda'
    };
    return categorias[categoriaId] || 'General';
  }

  changeQty(delta: number) {
    const nuevaCantidad = this.cantidad + delta;
    if (nuevaCantidad >= 1) {
      this.cantidad = nuevaCantidad;
    }
  }

  get precioTotal(): number {
    return (this.libro.precio || 0) * this.cantidad;
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
}