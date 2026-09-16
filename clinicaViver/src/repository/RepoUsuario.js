import { abrirDB } from '../database/database';

export async function inserirUsuario(nome, email, senha) {
  const db = await abrirDB();

  const nomeTratado = nome.trim();
  const emailTratado = email.trim().toLowerCase();

  const resultado = await db.runAsync(
    `INSERT INTO usuarios (nome, email, senha)
     VALUES (?, ?, ?)`,
    nomeTratado,
    emailTratado,
    senha,
  );

  return {
    id: resultado.lastInsertRowId,
    nome: nomeTratado,
    email: emailTratado,
  };
}

export async function buscarUsuarioPorEmailESenha(email, senha) {
  const db = await abrirDB();

  const usuario = await db.getFirstAsync(
    `SELECT id, nome, email
     FROM usuarios
     WHERE email = ? AND senha = ?`,
    email.trim().toLowerCase(),
    senha,
  );

  return usuario;
}
