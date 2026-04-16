import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiConexService } from '../../services/api-conex.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  // Listas de datos
  clientes: any[] = [];
  libros: any[] = [];
  categorias: any[] = [];
  proveedores: any[] = [];
  

  // Entidades
  public entidad: any[] = [];
  public selecEntidad: string = "";
  public accion: string = "";
  
   // VARIABLES PARA EL MODAL
  mostrarModal: boolean = false;
  editando: boolean = false; // Para saber si es POST o PUT
  registroSeleccionado: any = null; // El objeto que se vincula al formulario
  


  constructor(private apiService: ApiConexService, 
    private router: Router,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit() {
  this.selecEntidad = 'clientes'; // Define una por defecto
  this.cargarEntidad(this.selecEntidad);
  }

  // Carga inicial de todas las tablas: Mapeamos .data por el estándar de la API
  cargarEntidad(tipo: string) {
    this.selecEntidad = tipo; 
    
    switch (tipo) {
      case 'clientes':
        this.cargarClientes();
        break;
      case 'libros':
        this.cargarLibros();
        break;
      case 'proveedor':
        this.cargarProveedor();
        break;
      case 'categoria':
        this.cargarCategoria();
        break;
      default:
        console.warn("La pestaña no existe");
        break;
    }
  }

   // --- MÉTODOS DEL MODAL ---

  // Si pasas 'datos', es para EDITAR. Si no pasas nada, es NUEVO.
  abrirModal(datos: any = null) {
    this.editando = !!datos; 
    // Si editamos, clonamos los datos. Si es nuevo, objeto vacío.
    this.registroSeleccionado = datos ? { ...datos } : {}; 
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.registroSeleccionado = null;
  }

  guardarPost(data: any) {
    // Si estamos editando, recuperamos el ID original del registro seleccionado
    const payload = this.editando 
      ? { ...data, id: this.registroSeleccionado.id || this.registroSeleccionado.Id } 
      : data;
    const id = this.editando ? (this.registroSeleccionado.id || this.registroSeleccionado.Id) : null;

    switch (this.selecEntidad) {
      case 'clientes':
        if (this.editando) {
          this.apiService.ActualizarCliente(id, payload).subscribe(() => this.cargarClientes());
        } else {
          this.apiService.CrearCliente(payload).subscribe(() => this.cargarClientes());
        }
        break;

      case 'libros':
        if (this.editando) {
          this.apiService.ActualizarLibro(id, payload).subscribe(() => this.cargarLibros());
        } else {
          this.apiService.CrearLibro(payload).subscribe(() => this.cargarLibros());
        }
        break;

      case 'proveedor':
        if (this.editando) {
          this.apiService.ActualizarProveedor(id, payload).subscribe(() => this.cargarProveedor());
        } else {
          this.apiService.CrearProveedor(payload).subscribe(() => this.cargarProveedor());
        }
        break;

      case 'categoria':
        if (this.editando) {
          this.apiService.ActualizarCategoria(id, payload).subscribe(() => this.cargarCategoria());
        } else {
          this.apiService.CrearCategoria(payload).subscribe(() => this.cargarCategoria());
        }
        break;

      default:
        console.warn("Entidad no reconocida para guardar");
        break;
    }

    this.cerrarModal();
  }


    // --- CARGAS DE LA API ---
  cargarClientes(){
    this.apiService.ListarClientes().subscribe((response: any) => {
      this.entidad = response.data; 
      this.cdr.detectChanges();
    });
  }

  cargarLibros(){
    this.apiService.ListarLibro().subscribe((response: any) => {
      this.entidad = response.data; 
      this.cdr.detectChanges();
    });
  }

  cargarProveedor(){
    this.apiService.ListarProveedor().subscribe((response: any) => {
      this.entidad = response.data; 
      this.cdr.detectChanges();
    });
  }

  cargarCategoria(){
    this.apiService.ListarCategoria().subscribe((response: any) => {
      this.entidad = response.data; 
      this.cdr.detectChanges();
    });
  }
  get headers() {
  // Verificamos que exista el array Y que tenga al menos un objeto
  if (this.entidad && this.entidad.length > 0) {
    return Object.keys(this.entidad[0]);
  }
  return [];
  }

  originalOrder = (a: any, b: any): number => {
  return 0;
  }

  eliminar(data: any) {
  // 1. Siempre pide confirmación
    if (!confirm(`¿Estás seguro de eliminar este registro de ${this.selecEntidad}?`)) {
      return;
    }

    const id = data.id || data.Id; // Por si el backend usa mayúscula

    switch(this.selecEntidad) {
      case 'clientes':
        this.apiService.EliminarCliente(id).subscribe(() => this.cargarClientes());
        break;
      case 'libros':
        this.apiService.EliminarLibro(id).subscribe(() => this.cargarLibros());
        break;
      case 'proveedor':
        this.apiService.EliminarProveedor(id).subscribe(() => this.cargarProveedor());
        break;
      case 'categoria':
        this.apiService.EliminarCategoria(id).subscribe(() => this.cargarCategoria());
        break;
    }
  }
  irLogin(){
    this.router.navigate(['/Login']);
  }


}
