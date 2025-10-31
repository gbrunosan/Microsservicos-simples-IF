import { channels } from "../channels/index.ts";
import type { MensagemPedidoCriado } from "../../../../contracts/messages/mensagem-pedido-criado.ts";

export function enviarPedidoCriado(data: MensagemPedidoCriado) {
  channels.pedidos.sendToQueue("pedidos", Buffer.from(JSON.stringify(data)));
}
