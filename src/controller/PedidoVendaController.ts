import type { PedidoVendaDTO } from "../interface/PedidoVendaDTO.js";
import Pedido_Venda from "../model/Pedidos_Venda.js";
import type { Request, Response } from "express";

class PedidoVendaController extends Pedido_Venda {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaPedidos: Array<Pedido_Venda> = await Pedido_Venda.listarPedido() ?? [];

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de pedidos." });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosPedido = req.body;

            const respostaModelo = await Pedido_Venda.cadastrarPedido(dadosRecebidosPedido);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar pedido." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o pedido" });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idPedido: number = parseInt(req.params.idPedido as string);

            if (isNaN(idPedido) || idPedido <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

            const respostaModelo: boolean = await Pedido_Venda.removerPedido(idPedido);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Pedido removido com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o pedido." });
            }
        } catch (error) {
            console.error(`Erro ao acessar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o pedido de venda." });
        }
    }
}

export default PedidoVendaController;