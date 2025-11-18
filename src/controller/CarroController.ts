import Carro from "../model/Carros.js";
import type { Request, Response } from "express";

class CarroController extends Carro {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaCarros: Array<Carro> = await Carro.listarCarros() ?? [];

            return res.status(200).json(listaCarros);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de carros." });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosCarro = req.body;

            const respostaModelo = await Carro.cadastrarCarro(dadosRecebidosCarro);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Carro cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar carro." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o carro" });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idCarro: number = parseInt(req.params.idCarro as string);

            if (isNaN(idCarro) || idCarro <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

            const respostaModelo: boolean = await Carro.removerCarro(idCarro);

            if(respostaModelo) {
                return res.status(200).json({ mensagem: "Carro removido com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o carro." });
            }
        } catch (error) {
            console.error(`Erro ao acessar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o carro." });
        }
    }
}

export default CarroController;