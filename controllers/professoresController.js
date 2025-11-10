let professores = require("../data/professores");

// Listar todos os professores
const listarProfessores = (req, res) => {
  res.json(professores);
};

// Buscar professor por ID
const buscarProfessorPorId = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }
  res.json(professor);
};

// Listar turmas de um professor
const listarTurmas = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }
  res.json(professor.turmas);
};

// Atualizar dados de um professor
const atualizarProfessor = (req, res) => {
  const { id } = req.params;
  const { nome, idade, departamento } = req.body;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  if (nome) professor.nome = nome;
  if (idade) professor.idade = idade;
  if (departamento) professor.departamento = departamento;

  res.json({ mensagem: "Professor atualizado com sucesso", professor });
};

// Adicionar turma
const adicionarTurma = (req, res) => {
  const { id } = req.params;
  const { codigo, disciplina, alunos } = req.body;

  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const novaTurma = { codigo, disciplina, alunos };
  professor.turmas.push(novaTurma);

  res.json({ mensagem: "Turma adicionada com sucesso", professor });
};

// Listar professores por departamento
const listarPorDepartamento = (req, res) => {
  const { departamento } = req.params;
  const resultado = professores.filter(
    p => p.departamento.toLowerCase() === departamento.toLowerCase()
  );

  if (resultado.length === 0) {
    return res.status(404).json({ mensagem: "Departamento não encontrado" });
  }

  res.json(resultado);
};

// Remover professor
const removerProfessor = (req, res) => {
  const { id } = req.params;
  const index = professores.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  professores.splice(index, 1);
  res.json({ mensagem: "Professor removido com sucesso" });
};

module.exports = {
  listarProfessores,
  buscarProfessorPorId,
  listarTurmas,
  atualizarProfessor,
  adicionarTurma,
  listarPorDepartamento,
  removerProfessor
};
