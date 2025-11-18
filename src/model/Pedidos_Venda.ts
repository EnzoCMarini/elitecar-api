import type { PedidoVendaDTO } from "../interface/PedidoVendaDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Pedido_Venda {

    private id_pedido: number = 0;
    private id_cliente: number = 0;
    private id_carro: number = 0;
    private data_pedido: Date;
    private valor_pedido: number;

    constructor(
        _id_carro: number,
        _id_cliente: number,
        _data_pedido: Date,
        _valor_pedido: number
    ) {
        this.id_carro = _id_carro;
        this.id_cliente = _id_cliente;
        this.data_pedido = _data_pedido;
        this.valor_pedido = _valor_pedido;
    }
    
    public getIdPedido(): number {
        return this.id_pedido;
    }

    public setIdPedido(id_pedido: number): void {
        this.id_pedido = id_pedido;
    }

    public getIdCarro(): number {
        return this.id_carro;
    }

    public setIdCarro(id_carro: number): void {
        this.id_carro = id_carro;
    }

    public getIdCliente(): number {
        return this.id_cliente;
    }

    public setIdCliente(id_cliente: number): void {
        this.id_cliente = id_cliente;
    }

    public getDataPedido(): Date {
        return this.data_pedido;
    }

    public setDataPedido(data_pedido: Date): void {
        this.data_pedido = data_pedido;
    }

    public getValorPedido(): number {
        return this.valor_pedido;
    }

    public setValorPedido(valor_pedido: number): void {
        this.valor_pedido = valor_pedido;
    }

    static async listarPedido(): Promise<Array<Pedido_Venda> | null> {
        try {
            let listaDePedidos: Array<Pedido_Venda> = [];

            const querySelectPedido = `SELECT * FROM pedidos_venda;`;

            const respostaBD = await database.query(querySelectPedido);

            respostaBD.rows.forEach((pedidoBD) => {
                const novoPedido: Pedido_Venda = new Pedido_Venda(
                    pedidoBD.id_carro,
                    pedidoBD.id_cliente,
                    pedidoBD.data_pedido,
                    pedidoBD.valor_pedido
                );

                novoPedido.setIdPedido(pedidoBD.id_pedido);

                listaDePedidos.push(novoPedido);
            });

            return listaDePedidos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarPedido(pedidos_venda: PedidoVendaDTO): Promise<boolean> {
            try {
                const queryInsertPedido = `INSERT INTO pedidos_venda (id_cliente, id_carro, data_pedido, valor_pedido) VALUES
                                        ($1, $2, $3, $4)
                                        RETURNING id_pedido;`;
    
                const respostaBD = await database.query(queryInsertPedido, [
                    pedidos_venda.idCliente,
                    pedidos_venda.idCarro,
                    pedidos_venda.dataPedido,
                    pedidos_venda.valorPedido
                ]);
    
                if (respostaBD.rows.length > 0) {
                    console.info(`Pedido cadastrado com sucesso. ID: ${respostaBD.rows[0].id_pedido}`);
    
                    return true;
                }
    
                return false;
            } catch (error) {
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                return false;
            }
        }
    

    static async removerPedido(id_pedido: number): Promise<boolean> {
        try {
            const queryDeletePedido = `UPDATE pedidos_venda SET situacao = FALSE WHERE id_pedido = $1`;

            const respostaBD = await database.query(queryDeletePedido, [id_pedido]);

            if(respostaBD.rowCount != 0) {
                console.info(`Pedido removido com sucesso`);
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro ao remover pedidos_venda do banco de dados, ${error}`);
            return false;
        }
    }

}

export default Pedido_Venda;