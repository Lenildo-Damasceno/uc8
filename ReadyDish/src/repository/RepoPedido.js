import { abrirDB } from '../database/database';

export async function inserirPedido(nomeCliente, itens, total) {
  const db = await abrirDB();
  const resultado = await db.runAsync(
    `INSERT INTO pedidos (nome_cliente, itens, total, status, criado_em)
     VALUES (?, ?, ?, ?, ?)`,
    nomeCliente,
    JSON.stringify(itens.map(({ id, nome, preco, quantidade }) => ({ id, nome, preco, quantidade }))),
    total,
    'recebido',
    new Date().toISOString()
  );
  return resultado.lastInsertRowId;
}
