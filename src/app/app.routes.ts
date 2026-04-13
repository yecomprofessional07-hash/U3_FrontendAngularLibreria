import { Routes } from '@angular/router';
import { LogVenta } from './pages/log-venta/log-venta';
import { PostCompras } from "./pages/post-compras/post-compras";
import { Admin } from "./pages/admin/admin";

export const routes: Routes = [
    {path: "ventas", component: LogVenta},
    {path: "Inicio", component: PostCompras},
    {path: "PanelAdmin", component: Admin},
    { path: '', redirectTo: 'ventas', pathMatch: 'full' }
];