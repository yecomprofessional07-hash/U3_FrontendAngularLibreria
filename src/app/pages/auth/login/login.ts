import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // 👈 AGREGE ESTA LÍNEA
import { ApiConexService } from '../../../services/api-conex.service';
import { LoginRequest } from '../../../Models/login-request.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
public correo: string = "";
public password: string= "";
    constructor(
    private apiService: ApiConexService, 
    private router: Router  // 👈 AGREGAR ESTA LÍNEA
    ) {}

  // Asegúrate de que ClienteLog tenga el tipo Partial o haz el cast en la llamada
  LoginAdmin(){
    const AdminLog : LoginRequest = {
      correo : this.correo,
      password: this.password
    };
    this.apiService.loginAdmin(AdminLog).subscribe({
      next: (res) => {
        alert("Creedenciales Aceptadas");
        this.router.navigate(['/PanelAdmin']);
      },
      error: (err) => {
      console.error('Error en Login:', err);
      alert('Error al procesar las credenciales');
    }
    }); 
  }
}
