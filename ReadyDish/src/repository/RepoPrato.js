import { abrirDB } from '../database/database';

export async function listarPratos() {
  const db = await abrirDB();

  const pratos = await db.getAllAsync(
    `SELECT id, nome, descricao, preco, categoria, emoji, destaque
     FROM pratos
     ORDER BY destaque DESC, nome ASC`
  );

  return pratos.map((prato) => ({
    ...prato,
    destaque: Boolean(prato.destaque),
  }));
}

export async function inserirPrato(prato) {
  const db = await abrirDB();
  const nomeTratado = prato.nome.trim();
  const descricaoTratada = prato.descricao.trim();
  const categoriaTratada = prato.categoria.trim();
  const emojiTratado = prato.emoji.trim() || '🍽️';
  const destaqueTratado = prato.destaque ? 1 : 0;
  const precoTratado = Number(String(prato.preco).replace(',', '.'));

  const resultado = await db.runAsync(
    `INSERT INTO pratos (nome, descricao, preco, categoria, emoji, destaque)
     VALUES (?, ?, ?, ?, ?, ?)`,
    nomeTratado,
    descricaoTratada,
    precoTratado,
    categoriaTratada,
    emojiTratado,
    destaqueTratado
  );

  return {
    id: resultado.lastInsertRowId,
    nome: nomeTratado,
    descricao: descricaoTratada,
    preco: precoTratado,
    categoria: categoriaTratada,
    emoji: emojiTratado,
    destaque: Boolean(destaqueTratado),
  };
}

export async function editarPrato(id, prato) {
  const db = await abrirDB();
  const nomeTratado = prato.nome.trim();
  const descricaoTratada = prato.descricao.trim();
  const categoriaTratada = prato.categoria.trim();
  const emojiTratado = prato.emoji.trim() || '🍽️';
  const destaqueTratado = prato.destaque ? 1 : 0;
  const precoTratado = Number(String(prato.preco).replace(',', '.'));

  await db.runAsync(
    `UPDATE pratos
     SET nome = ?, descricao = ?, preco = ?, categoria = ?, emoji = ?, destaque = ?
     WHERE id = ?`,
    nomeTratado,
    descricaoTratada,
    precoTratado,
    categoriaTratada,
    emojiTratado,
    destaqueTratado,
    id
  );

  return {
    id,
    nome: nomeTratado,
    descricao: descricaoTratada,
    preco: precoTratado,
    categoria: categoriaTratada,
    emoji: emojiTratado,
    destaque: Boolean(destaqueTratado),
  };
}

export async function deletarPrato(id) {
  const db = await abrirDB();

  await db.runAsync(
    `DELETE FROM pratos
     WHERE id = ?`,
    id
  );
}

export async function preencherPratosIniciais(pratosIniciais) {
  const db = await abrirDB();
  const quantidade = await db.getFirstAsync(
    `SELECT COUNT(*) AS total
     FROM pratos`
  );

  if (quantidade?.total > 0) {
    return;
  }

  for (const prato of pratosIniciais) {
    await db.runAsync(
      `INSERT INTO pratos (id, nome, descricao, preco, categoria, emoji, destaque)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      Number(prato.id),
      prato.nome,
      prato.descricao,
      prato.preco,
      prato.categoria,
      prato.emoji,
      prato.destaque ? 1 : 0
    );
  }
}