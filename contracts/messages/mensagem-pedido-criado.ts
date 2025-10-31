export interface MensagemPedidoCriado {
  pedidoId: string
  quantidade: number
  cliente: {
    id: string
  },
}