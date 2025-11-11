import type { CarroDTO } from "../interface/CarroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Carro {

    private idCarro: number = 0;
    private marca: string;
    private modelo: string;
    private ano: number;
    private cor: string;

    /**
     * Construtor da classe Carro
     * @param _marca Marca de carro
     * @param _modelo Modelo do carro
     * @param _ano Ano do carro
     * @param _cor Cor do carro
     */
    constructor(
        _marca: string,
        _modelo: string,
        _ano: number,
        _cor: string
    ) {
        this.marca = _marca;
        this.modelo = _modelo;
        this.ano = _ano;
        this.cor = _cor;
    }

    /**
     * Retorna o ID do carro
     * @returns ID do carro
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Atribui um ID ao carro
     * @param idCarro novo ID
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Retorna a marca do carro
     * @returns Marca do carro
     */
    public getMarca(): string {
        return this.marca;
    }

    /**
     * Atribui uma marca ao carro
     * @param marca nova marca do carro
     */
    public setMarca(marca: string): void {
        this.marca = marca;
    }

    /**
     * Retorna o modelo do carro
     * @returns Modelo do carro
     */
    public getModelo(): string {
        return this.modelo;
    }

    /**
     * Atribui um modelo ao carro
     * @param modelo novo modelo do carro
     */
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    /**
     * Retorna o ano do carro
     * @returns Ano do carro
     */
    public getAno(): number {
        return this.ano;
    }

    /**
     * Atribui um ano ao carro
     * @param ano novo ano do carro
     */
    public setAno(ano: number): void {
        this.ano = ano;
    }

    /**
     * Retorna a cor do carro
     * @returns Cor do carro
     */
    public getCor(): string {
        return this.cor;
    }

    /**
     * Atribui uma cor ao carro
     * @param cor nova cor do carro
     */
    public setCor(cor: string): void {
        this.cor = cor;
    }

    /**
     * Retorna os carros cadastrados no banco de dados
     * @returns Lista com carros cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarCarros(): Promise<Array<Carro> | null> {
        try {
            let listaDeCarros: Array<Carro> = [];

            const querySelectCarro = `SELECT * FROM carros;`;

            const respostaBD = await database.query(querySelectCarro);

            respostaBD.rows.forEach((carroBD) => {
                const novoCarro: Carro = new Carro(
                    carroBD.marca,
                    carroBD.modelo,
                    carroBD.ano,
                    carroBD.cor
                );

                novoCarro.setIdCarro(carroBD.id_carro);

                listaDeCarros.push(novoCarro);
            });

            return listaDeCarros;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarCarro(carro: CarroDTO): Promise<boolean> {
        try {
            const queryInsertCarro = `INSERT INTO clientes (nome, cpf, telefone) VALUES
                                    ($1, $2, $3)
                                    RETURNING id_carro;`;

            const respostaBD = await database.query(queryInsertCarro, [
                carro.marca,
                carro.modelo,
                carro.ano,
                carro.cor
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Carro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_carro}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

}

export default Carro;