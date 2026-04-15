import { Routes } from '@angular/router';
import { LogVenta } from './pages/log-venta/log-venta';
import { PostCompras } from "./pages/post-compras/post-compras";
import { Admin } from "./pages/admin/admin";
import { VistProduc } from "./pages/vist-produc/vist-produc";

export const routes: Routes = [
    { path: "ventas", component: LogVenta },
    { path: "inicio", component: PostCompras },  // 👈 CAMBIE "Inicio" a "inicio" (minúscula)
    { path: "PanelAdmin", component: Admin },
    { path: "productos", component: VistProduc }, 
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }  // 👈 CAMBIE 'Inicio' a 'inicio'
];