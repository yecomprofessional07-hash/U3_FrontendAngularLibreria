
export interface VentaModel {
    id?: number;          // Opcional porque SQL Server lo genera
    fecha: Date;
    clienteId: number;    // ID del cliente que acaba de comprar
    productoId: number;   // ID del producto comprado
    cantidad: number;
    total: number;

}

//Interface para estructurar los Datos
