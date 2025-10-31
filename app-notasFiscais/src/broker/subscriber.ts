import { pedidos } from "./channels/pedidos.ts";

pedidos.consume(
  "pedidos",
  async (message) => {
    if (!message) {
      return null;
    }

    console.log(message?.content.toString());

    pedidos.ack(message);
  },
  {
    noAck: false,
  }
);

// acknowledge => reconhecer
