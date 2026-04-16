import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // 👈 AGREGE ESTA LÍNEA
import { ApiConexService } from '../../../services/api-conex.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  constructor(
    private apiService: ApiConexService, 
    private cdr: ChangeDetectorRef,
    private router: Router  // 👈 AGREGAR ESTA LÍNEA
    ) {}

  irLogAdmin(){
    this.router.navigate(['/AdminsLog']);
  }
  irLogCliente(){
    this.router.navigate(['/ClientesLog']);
  }
}
