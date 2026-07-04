/*
let cidades = [
  { id: 1, nome: 'Crateús' },
  { id: 2, nome: 'Fortaleza' },
  { id: 3, nome: 'Sobral' },
]

let equipamentos = [
  { id: 1, nome: 'Escavadeira HX300', setor: 'Extração', cidadeId: 1 },
  { id: 2, nome: 'Britador Primário', setor: 'Processamento', cidadeId: 2 },
  { id: 3, nome: 'Caminhão 793F', setor: 'Transporte', cidadeId: 3 },
]

let funcionarios = [
  { id: 1, nome: 'Carlos Mendes', cargo: 'Operador', setor: 'Extração', cidadeId: 1 },
  { id: 2, nome: 'Ana Lima', cargo: 'Engenheira', setor: 'Processamento', cidadeId: 2 },
  { id: 3, nome: 'João Silva', cargo: 'Motorista', setor: 'Transporte', cidadeId: 3 },
]

let servicos = [
  { id: 1, descricao: 'Manutenção preventiva', status: 'Pendente', equipamentoId: 1, cidadeId: 1 },
  { id: 2, descricao: 'Troca de correia', status: 'Em andamento', equipamentoId: 2, cidadeId: 2 },
  { id: 3, descricao: 'Troca de óleo', status: 'Concluído', equipamentoId: 3, cidadeId: 3 },
]

let movimentacoes = [
  { id: 1, titulo: 'Cidade cadastrada', subtitulo: 'Sobral - CE', tempo: 'Há 5 minutos', icon: 'apartment' },
  { id: 2, titulo: 'Equipamento adicionado', subtitulo: 'Escavadeira HX300', tempo: 'Há 15 minutos', icon: 'local_shipping' },
  { id: 3, titulo: 'Serviço iniciado', subtitulo: 'Troca de Correia', tempo: 'Há 32 minutos', icon: 'build' },
  { id: 4, titulo: 'Funcionário cadastrado', subtitulo: 'Carlos Mendes', tempo: 'Há 1 hora', icon: 'badge' },
  { id: 5, titulo: 'Serviço concluído', subtitulo: 'Troca de Óleo - Caminhão 793F', tempo: 'Há 2 horas', icon: 'check_circle' },
]

let nextId = (arr) => (arr.length ? Math.max(...arr.map((i) => i.id)) + 1 : 1)

const delay = (data, ms = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

export function listarCidades() { return delay([...cidades]) }

export function criarCidade({ nome }) {
  const nova = { id: nextId(cidades), nome }
  cidades = [...cidades, nova]
  movimentacoes = [
    { id: nextId(movimentacoes), titulo: 'Cidade cadastrada', subtitulo: `${nome} - CE`, tempo: 'Agora mesmo', icon: 'apartment' }, // Atualizado
    ...movimentacoes,
  ]
  return delay(nova)
}

export function listarEquipamentos() { return delay([...equipamentos]) }

export function criarEquipamento({ nome, setor, cidadeId }) {
  const novo = { id: nextId(equipamentos), nome, setor, cidadeId: cidadeId ?? null }
  equipamentos = [...equipamentos, novo]
  movimentacoes = [
    { id: nextId(movimentacoes), titulo: 'Equipamento adicionado', subtitulo: nome, tempo: 'Agora mesmo', icon: 'local_shipping' }, // Atualizado
    ...movimentacoes,
  ]
  return delay(novo)
}

export function listarFuncionarios() { return delay([...funcionarios]) }

export function criarFuncionario({ nome, cargo, setor, cidadeId }) {
  const novo = { id: nextId(funcionarios), nome, cargo, setor, cidadeId: cidadeId ? Number(cidadeId) : null }
  funcionarios = [...funcionarios, novo]
  movimentacoes = [
    { id: nextId(movimentacoes), titulo: 'Funcionário cadastrado', subtitulo: nome, tempo: 'Agora mesmo', icon: 'badge' }, // Atualizado
    ...movimentacoes,
  ]
  return delay(novo)
}

export function listarServicos() { return delay([...servicos]) }

export function criarServico({ descricao, status, equipamentoId, cidadeId }) {
  const novo = {
    id: nextId(servicos),
    descricao,
    status,
    equipamentoId: equipamentoId ? Number(equipamentoId) : null,
    cidadeId: cidadeId ? Number(cidadeId) : null,
  }
  servicos = [...servicos, novo]
  movimentacoes = [
    {
      id: nextId(movimentacoes),
      titulo: status === 'Concluído' ? 'Serviço concluído' : 'Serviço iniciado',
      subtitulo: descricao,
      tempo: 'Agora mesmo',
      icon: status === 'Concluído' ? 'check_circle' : 'build',
    },
    ...movimentacoes,
  ]
  return delay(novo)
}

export function listarMovimentacoes() { return delay([...movimentacoes]) }

*/



const delay = (data, ms = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

export function listarCidades() { 
  return delay([]) 
}

export function criarCidade({ nome }) {
  return delay({ id: Date.now(), nome })
}

export function listarEquipamentos() { 
  return delay([]) 
}

export function criarEquipamento({ nome, setor, cidadeId }) {
  return delay({ id: Date.now(), nome, setor, cidadeId })
}

export function listarFuncionarios() { 
  return delay([]) 
}

export function criarFuncionario({ nome, cargo, setor, cidadeId }) {
  return delay({ id: Date.now(), nome, cargo, setor, cidadeId })
}

export function listarServicos() { 
  return delay([]) 
}

export function criarServico({ descricao, status, equipamentoId, cidadeId }) {
  return delay({ id: Date.now(), descricao, status, equipamentoId, cidadeId })
}

export function listarMovimentacoes() { 
  return delay([]) 
}