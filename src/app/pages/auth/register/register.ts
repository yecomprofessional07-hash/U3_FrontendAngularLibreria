import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // 👈 AGREGE ESTA LÍNEA
import { ApiConexService } from '../../../services/api-conex.service';
import { LoginRequest } from '../../../Models/login-request.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
public correo: string = "";
public password: string= "";
    constructor(
    private apiService: ApiConexService, 
    private router: Router  // 👈 AGREGAR ESTA LÍNEA
    ) {}

  // Asegúrate de que ClienteLog tenga el tipo Partial o haz el cast en la llamada
  LoginCliente(){
    const ClienteLog : LoginRequest = {
      correo : this.correo,
      password: this.password
    };
    this.apiService.loginCliente(ClienteLog).subscribe({
      next: (res) => {
        alert("Creedenciales Aceptadas");
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
      console.error('Error en Login:', err);
      alert('Error al procesar las credenciales');
    }
    }); 
  }
}
