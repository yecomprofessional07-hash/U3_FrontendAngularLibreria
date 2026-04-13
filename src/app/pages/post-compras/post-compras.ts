import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiConexService } from '../../services/api-conex.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-post-compras',
  imports: [CommonModule],
  templateUrl: './post-compras.html',
  styleUrl: './post-compras.css',
})
export class PostCompras {
public libros: any[] = []; // Aquí se guardará lo que devuelva tu API

  constructor(
  private apiService: ApiConexService, 
  private cdr: ChangeDetectorRef 
) {}

  ngOnInit() {
  this.apiService.ListarLibro().subscribe((response: any) => { // Cambia esto a :any
    this.libros = response.data; 
    this.cdr.detectChanges();
    console.log(this.libros);
  });
}
}
