const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const controller = require("./controllers/professoresController");

// Rotas
app.get("/professores", controller.listarProfessores);
app.get("/professores/:id", controller.buscarProfessorPorId);
app.get("/professores/:id/turmas", controller.listarTurmas);
app.put("/professores/:id", controller.atualizarProfessor);
app.post("/professores/:id/turmas", controller.adicionarTurma);
app.get("/professores/departamento/:departamento", controller.listarPorDepartamento);
app.delete("/professores/:id", controller.removerProfessor);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
