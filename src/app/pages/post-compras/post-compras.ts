import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiConexService } from '../../services/api-conex.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-post-compras',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-compras.html',
  styleUrl: './post-compras.css',
})
export class PostCompras {
public libros: any[] = []; // Aquí se guardará lo que devuelva tu API
public categoriaSelect: string = "Todas";
public categorias: any[] = [];
public textoBusqueda: string = "";

  constructor(
  private apiService: ApiConexService, 
  private cdr: ChangeDetectorRef 
  ) {}

    obtenerLibros() {
      this.apiService.ListarLibro().subscribe((response: any) => { // Cambia esto a :any
      this.libros = response.data; 
      this.cdr.detectChanges();
      localStorage.setItem('mis_libros', JSON.stringify(response.data));
    });
    }
    ngOnInit() {
      this.obtenerCategorias();
      const librosGuardados = localStorage.getItem('mis_libros');
      if (librosGuardados) {
        this.libros = JSON.parse(librosGuardados);
      } else {
        this.obtenerLibros(); // Si no hay nada, pedimos a la API
      }
    }
    obtenerCategorias() {
    this.apiService.ListarCategoria().subscribe((response: any) => {
      this.categorias = response.data; // Suponiendo que tu API devuelve { data: [...] }
      this.cdr.detectChanges();
    });
  }
  get librosFiltrados() {
    return this.libros.filter(libro => {
      // Filtro por categoría
      const cumpleCategoria = this.categoriaSelect === "Todas" || 
                              libro.categoriaNombre === this.categoriaSelect;

      // Filtro por texto (título, autor o categoría)
      const busqueda = this.textoBusqueda.toLowerCase();
      const cumpleTexto = libro.titulo.toLowerCase().includes(busqueda) || 
                          libro.autor.toLowerCase().includes(busqueda);

      return cumpleCategoria && cumpleTexto;
    });
  }
  get librosCiencia(){
    return this.libros.filter(libro => libro.categoriaNombre === "Ciencia")
  }
  get librosHistoria(){
    return this.libros.filter(libro => libro.categoriaNombre === "Historia")
  }
}
