// src/pages/Funcionarios.jsx
import { useEffect, useState } from 'react'
import { listarFuncionarios, listarCidades, criarFuncionario } from '../services/api.js'
import OptionsMenu from '../components/OptionsMenu.jsx'
import ModalDelete from '../modais/ModalDelete.jsx' 
import ModalForm from '../modais/ModalForm.jsx' 
import AnimacaoFade from '../components/AnimacaoFade.jsx' // IMPORTADO
import '/src/styles/ModalDelete.css' 

const ICONE_SETOR = {
  Extração: 'construction',
  Processamento: 'settings',
  Transporte: 'local_shipping',
}

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [cidades, setCidades] = useState([])
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [setor, setSetor] = useState('')
  const [cidadeId, setCidadeId] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  // Estados focados no modal de exclusão
  const [itemParaExcluir, setItemParaExcluir] = useState(null)

  // Estados indispensáveis para gerenciar os 4 campos do formulário de Edição
  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [cargoEdicao, setCargoEdicao] = useState('')
  const [setorEdicao, setSetorEdicao] = useState('')
  const [cidadeIdEdicao, setCidadeIdEdicao] = useState('')

  useEffect(() => {
    Promise.all([listarFuncionarios(), listarCidades()]).then(([f, c]) => {
      setFuncionarios(f)
      setCidades(c)
      setCarregando(false)
    })
  }, [])

  async function handleCadastrar(e) {
    e.preventDefault()
    if (!nome.trim() || !cargo.trim() || !setor || !cidadeId) return
    setEnviando(true)
    const novo = await criarFuncionario({ nome, cargo, setor, cidadeId })
    setFuncionarios((prev) => [...prev, novo])
    setNome('')
    setCargo('')
    setSetor('')
    setCidadeId('')
    setEnviando(false)
  }

  // Apenas fecha o modal simulando no front
  function confirmarExclusaoSimulada() {
    setItemParaExcluir(null)
  }

  return (
    <div className="page">
      
      { }
      <AnimacaoFade delay="0s">
        <div className="page-title-row">
          <div className="title-bar" />
          <h1 className="page-title">Gestão de Funcionários</h1>
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.12s">
        <form className="card" onSubmit={handleCadastrar} style={{ marginTop: '20px' }}>
          <div className="card-header">
            <div className="icon-circle small">
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)' }}>badge</span>
            </div>
            <h2>NOVO FUNCIONÁRIO</h2>
          </div>

          <div className="form-grid">
            <div className="field">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Ex: Carlos Mendes"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Cargo</label>
              <input
                type="text"
                placeholder="Ex: Operador"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Setor</label>
              <select value={setor} onChange={(e) => setSetor(e.target.value)}>
                <option value="" disabled hidden>Selecione o setor...</option>
                <option value="Extração">Extração</option>
                <option value="Processamento">Processamento</option>
                <option value="Transporte">Transporte</option>
              </select>
            </div>
            <div className="field">
              <label>Cidade / Polo</label>
              <select value={cidadeId} onChange={(e) => setCidadeId(e.target.value)}>
                <option value="" disabled hidden>Selecione a cidade...</option>
                {cidades.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="btn-cadastrar-row">
            <button className="btn-cadastrar" type="submit" disabled={enviando}>
              CADASTRAR
            </button>
          </div>
        </form>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.24s">
        <div className="list-section">
          <div className="list-section-title linha-oscilante">
            <h3>
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)', marginRight: '8px' }}>groups</span>
              FUNCIONÁRIOS CADASTRADOS
            </h3>
          </div>

          <div className="list">
            {carregando && <div className="empty-state">Carregando funcionários...</div>}
            {!carregando && funcionarios.length === 0 && (
              <div className="empty-state">Nenhum funcionario cadastrado ainda.</div>
            )}
            {funcionarios.map((f) => (
              <div className="list-item" key={f.id}>
                <div className="icon-circle">
                  <span className="material-icons" style={{ fontSize: '20px', color: 'var(--gold)' }}>person</span>
                </div>
                <div className="list-item-main">
                  <div className="name">{f.nome}</div>
                  <div className="sub">
                    <span className="accent">Cargo:</span> {f.cargo}
                  </div>
                </div>
                <div className="badge">
                  <span className="material-icons" style={{ fontSize: '16px', color: 'var(--gold)', marginRight: '6px' }}>
                    {ICONE_SETOR[f.setor] || 'engineering'}
                  </span>
                  Setor: {f.setor}
                </div>
                
                <OptionsMenu 
                  onExcluirClick={() => setItemParaExcluir(f)} 
                  onEditarClick={() => {
                    setNomeEdicao(f.nome)
                    setCargoEdicao(f.cargo)
                    setSetorEdicao(f.setor)
                    setCidadeIdEdicao(f.cidadeId || '')
                    setModalEditarAberto(true)
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="footer-total linha-oscilante" style={{ marginTop: '36px' }}>
          <div className="total-badge">
            <span className="material-icons" style={{ fontSize: '16px', color: 'var(--gold)', marginRight: '8px' }}>people_alt</span>
            Total de funcionários: <strong style={{ marginLeft: '4px' }}>{funcionarios.length}</strong>
          </div>
        </div>
      </AnimacaoFade>

      {/* Modal de Deletar */}
      <ModalDelete 
        aberto={!!itemParaExcluir} 
        titulo="Excluir funcionário" 
        mensagem="Tem certeza que deseja desligar ou excluir o funcionário abaixo? Esta ação não poderá ser desfeita." 
        itemLabel="Funcionário:" 
        itemNome={itemParaExcluir?.nome} 
        itemDetalhe={`${itemParaExcluir?.cargo || 'Colaborador'} — Setor: ${itemParaExcluir?.setor || 'Geral'}`} 
        itemIcone="badge" 
        onCancelar={() => setItemParaExcluir(null)} 
        onConfirmar={confirmarExclusaoSimulada} 
        carregando={false}
      />

      {/* Modal de Edição */}
      <ModalForm 
        aberto={modalEditarAberto} 
        titulo="Editar funcionário" 
        icone="badge"
        onCancelar={() => setModalEditarAberto(false)}
        onSalvar={() => setModalEditarAberto(false)}
      >
        <div className="field">
          <label>Nome</label>
          <input type="text" value={nomeEdicao} onChange={(e) => setNomeEdicao(e.target.value)} />
        </div>
        <div className="field">
          <label>Cargo</label>
          <input type="text" value={cargoEdicao} onChange={(e) => setCargoEdicao(e.target.value)} />
        </div>
        <div className="field">
          <label>Setor</label>
          <select value={setorEdicao} onChange={(e) => setSetorEdicao(e.target.value)}>
            <option value="Extração">Extração</option>
            <option value="Processamento">Processamento</option>
            <option value="Transporte">Transporte</option>
          </select>
        </div>
        <div className="field">
          <label>Cidade / Polo</label>
          <select value={cidadeIdEdicao} onChange={(e) => setCidadeIdEdicao(e.target.value)}>
            {cidades.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
      </ModalForm>
    </div>
  )
}