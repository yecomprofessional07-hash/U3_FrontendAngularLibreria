import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiConexService } from '../../services/api-conex.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-post-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-compras.html',
  styleUrl: './post-compras.css',
})
export class PostCompras implements OnInit {
  public libros: any[] = [];
  public categorias: any[] = [];
  public categoriaSelect: string = "Todas";
  public textoBusqueda: string = "";

  constructor(
    private apiService: ApiConexService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.obtenerCategorias();
    const librosGuardados = localStorage.getItem('mis_libros');
    if (librosGuardados) {
      this.libros = JSON.parse(librosGuardados);
    } else {
      this.obtenerLibros();
    }
  }

  obtenerLibros() {
    this.apiService.ListarLibro().subscribe((response: any) => {
      this.libros = response.data; 
      this.cdr.detectChanges();
      localStorage.setItem('mis_libros', JSON.stringify(response.data));
    });
  }

  obtenerCategorias() {
    this.apiService.ListarCategoria().subscribe((response: any) => {
      this.categorias = response.data;
      this.cdr.detectChanges();
    });
  }

  get librosFiltrados() {
    return this.libros.filter(libro => {
      const cumpleCategoria = this.categoriaSelect === "Todas" || 
                              libro.categoriaNombre === this.categoriaSelect;

      const busqueda = this.textoBusqueda.toLowerCase();
      const cumpleTexto = libro.titulo.toLowerCase().includes(busqueda) || 
                          libro.autor.toLowerCase().includes(busqueda);

      return cumpleCategoria && cumpleTexto;
    });
  }

  get librosCiencia() {
    return this.libros.filter(libro => libro.categoriaNombre === "Ciencia");
  }

  get librosHistoria() {
    return this.libros.filter(libro => libro.categoriaNombre === "Historia");
  }
}