export interface PedidoVendaDTO {
    idPedido?: number,    // ID do Pedido (Opcional)
    idCliente: number,    // ID do Cliente
    idCarro: number,      // ID do Carro
    dataPedido: Date,     // Data do Pedido
    valorPedido: number,  // Valor do Pedido
    nomeCliente?: string, // Nome do Cliente (Opcional)
    marcaCarro?: string,  // Marca do Carro (Opcional)
    modeloCarro?: string, // Modelo do Carro (Opcional)
    situacao?: boolean    // Situação do Pedido (Opcional)
}