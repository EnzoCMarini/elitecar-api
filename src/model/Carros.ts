import type { CarroDTO } from "../interface/CarroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Carro {

    private idCarro: number = 0;
    private marca: string;
    private modelo: string;
    private ano: number;
    private cor: string;

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

    public getIdCarro(): number {
        return this.idCarro;
    }

    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    public getAno(): number {
        return this.ano;
    }

    public setAno(ano: number): void {
        this.ano = ano;
    }

    public getCor(): string {
        return this.cor;
    }

    public setCor(cor: string): void {
        this.cor = cor;
    }

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
            const queryInsertCarro = `INSERT INTO carros (marca, modelo, ano, cor) VALUES
                                    ($1, $2, $3, $4)
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

    static async removerCarro(id_carro: number): Promise<boolean> {
        try {
            const queryDeleteCarro = `UPDATE carros SET situacao = FALSE WHERE id_carro = $1`;

            const respostaBD = await database.query(queryDeleteCarro, [id_carro]);

            if(respostaBD.rowCount != 0) {
                console.info(`Carro removido com sucesso`);
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro ao remover carro do banco de dados, ${error}`);
            return false;
        }
    }
}

export default Carro;