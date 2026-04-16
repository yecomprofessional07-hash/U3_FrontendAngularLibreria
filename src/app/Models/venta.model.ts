// 1. Representa cada renglón del carrito
export interface VentaDetalleModel {
    libroId: number;
    cantidad: number;
}

// 2. Representa la venta completa que enviaremos al POST
export interface VentaModel {
    clienteId: number;
    detalles: VentaDetalleModel[]; // Array de productos
    
    // Estos campos son opcionales en el envío porque el Back los calcula o genera
    id?: number;
    fecha?: Date;
    totalVenta?: number;
}
