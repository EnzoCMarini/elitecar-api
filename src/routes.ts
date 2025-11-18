import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import ClienteController from "./controller/ClienteController.js";
import CarroController from "./controller/CarroController.js";
import PedidoVendaController from "./controller/PedidoVendaController.js";

const router = Router(); // cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

// Retorna a lista com todos os clientes
router.get("/api/clientes", ClienteController.todos);
// Cadastra um novo cliente
router.post("/api/clientes", ClienteController.novo);
// Retorna um cliente a partir do ID
router.get("/api/clientes/:idCliente", ClienteController.cliente);
// Remove um cliente a partir do ID
router.put("/api/clientes/remover/:idCliente", ClienteController.remover);

router.get("/api/carros", CarroController.todos);
router.post("/api/carros", CarroController.novo);
router.put("/api/carros/remover/:idCarro", CarroController.remover);

router.get("/api/pedidos_venda", PedidoVendaController.todos);
router.post("/api/pedidos_venda", PedidoVendaController.novo);
router.put("/api/pedidos_venda/remover/:idPedido", PedidoVendaController.remover);
export { router }; // Exporta o roteador