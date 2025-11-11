export interface ClienteDTO {
    idCliente?: number, // ID do Cliente (? indica um parâmetro opcional)
    nome: string,       // Nome do Cliente
    cpf: string,        // CPF do Cliente
    telefone: string,   // Telefone do Cliente
    situacao?: boolean  // Situação do Cliente
}