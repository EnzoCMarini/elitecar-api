// DTO => Data Transfer Object

export interface CarroDTO {
    idCarro?: number, // ID do Carro (? indica um parâmetro opcional)
    marca: string,     // Marca do Carro
    modelo: string,    // Modelo do Carro
    ano: number,       // Ano do Carro
    cor: string,       // Cor do Carro
    situacao?: boolean // Situação (cenas para os pr´próximos capítulos)
}
