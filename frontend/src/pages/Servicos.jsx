import { useEffect, useState } from 'react'
import {
  listarServicos,
  listarEquipamentos,
  listarCidades,
  criarServico,
} from '../services/api.js'
import OptionsMenu from '../components/OptionsMenu.jsx'
import ModalDelete from '../modais/ModalDelete.jsx' 
import ModalForm from '../modais/ModalForm.jsx' 
import AnimacaoFade from '../components/AnimacaoFade.jsx' 
import '/src/styles/ModalDelete.css' 

const STATUS_OPCOES = ['Pendente', 'Em andamento', 'Concluído']

const STATUS_CLASSE = {
  Pendente: 'status-pendente',
  'Em andamento': 'status-em-andamento',
  Concluído: 'status-concluido',
}

const ICONE_SERVICO = {
  'Manutenção preventiva': 'build',
  'Troca de correia': 'settings_input_component',
  'Troca de óleo': 'opacity',
}

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [cidades, setCidades] = useState([])
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')
  const [equipamentoId, setEquipamentoId] = useState('')
  const [cidadeId, setCidadeId] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  const [itemParaExcluir, setItemParaExcluir] = useState(null)

  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [descricaoEdicao, setDescricaoEdicao] = useState('')
  const [statusEdicao, setStatusEdicao] = useState('')
  const [equipamentoIdEdicao, setEquipamentoIdEdicao] = useState('')
  const [cidadeIdEdicao, setCidadeIdEdicao] = useState('')

  useEffect(() => {
    Promise.all([listarServicos(), listarEquipamentos(), listarCidades()]).then(
      ([s, e, c]) => {
        setServicos(s)
        setEquipamentos(e)
        setCidades(c)
        setCarregando(false)
      },
    )
  }, [])

  async function handleCadastrar(e) {
    e.preventDefault()
    if (!descricao.trim() || !status || !equipamentoId || !cidadeId) return
    setEnviando(true)
    const novo = await criarServico({ descricao, status, equipamentoId, cityId: cidadeId })
    setServicos((prev) => [...prev, novo])
    setDescricao('')
    setStatus('')
    setEquipamentoId('')
    setCidadeId('')
    setEnviando(false)
  }

  function nomeEquipamento(id) {
    return equipamentos.find((eq) => eq.id === id)?.nome || '—'
  }

  function nomeCidade(id) {
    return cidades.find((c) => c.id === id)?.nome || '—'
  }

  function confirmarExclusaoSimulada() {
    setItemParaExcluir(null)
  }

  return (
    <div className="page">
      
      { }
      <AnimacaoFade delay="0s">
        <div className="page-title-row">
          <div className="title-bar" />
          <h1 className="page-title">Gestão de Serviços</h1>
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.12s">
        <form className="card" onSubmit={handleCadastrar} style={{ marginTop: '20px' }}>
          <div className="card-header">
            <div className="icon-circle small">
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)' }}>engineering</span>
            </div>
            <h2>NOVO SERVIÇO</h2>
          </div>

          <div className="form-grid">
            <div className="field">
              <label>Descrição</label>
              <input
                type="text"
                placeholder="Ex: Manutenção preventiva"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="" disabled hidden>Selecione o status...</option>
                {STATUS_OPCOES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Equipamento</label>
              <select value={equipamentoId} onChange={(e) => setEquipamentoId(e.target.value)}>
                <option value="" disabled hidden>Selecione o equipamento...</option>
                {equipamentos.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.nome}
                  </option>
                ))}
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
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)', marginRight: '8px' }}>assignment</span>
              SERVIÇOS CADASTRADOS
            </h3>
          </div>

          <div className="list">
            {carregando && <div className="empty-state">Carregando serviços...</div>}
            {!carregando && servicos.length === 0 && (
              <div className="empty-state">Nenhum serviço cadastrado ainda.</div>
            )}
            {servicos.map((s) => (
              <div className="list-item" key={s.id}>
                <div className="icon-circle">
                  <span className="material-icons" style={{ fontSize: '20px', color: 'var(--gold)' }}>
                    {ICONE_SERVICO[s.descricao] || 'build'}
                  </span>
                </div>
                <div className="list-item-main">
                  <div className="name">{s.descricao}</div>
                  <div className="sub" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-icons" style={{ fontSize: '14px', color: 'var(--gold)' }}>construction</span>
                    {nomeEquipamento(s.equipamentoId)} &nbsp;|&nbsp;
                    <span className="material-icons" style={{ fontSize: '14px', color: 'var(--gold)' }}>location_on</span>
                    {nomeCidade(s.cidadeId)}
                  </div>
                </div>
                <div className={`status-badge ${STATUS_CLASSE[s.status] || ''}`}>
                  <span className="material-icons" style={{ fontSize: '14px', marginRight: '4px' }}>schedule</span>
                  {s.status}
                </div>
                
                <OptionsMenu 
                  onExcluirClick={() => setItemParaExcluir(s)} 
                  onEditarClick={() => {
                    setDescricaoEdicao(s.descricao)
                    setStatusEdicao(s.status)
                    setEquipamentoIdEdicao(s.equipamentoId || '')
                    setCidadeIdEdicao(s.cidadeId || '')
                    setModalEditarAberto(true)
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="footer-total linha-oscilante" style={{ marginTop: '36px' }}>
          <div className="total-badge">
            <span className="material-icons" style={{ fontSize: '16px', color: 'var(--gold)', marginRight: '8px' }}>analytics</span>
            Total de serviços: <strong style={{ marginLeft: '4px' }}>{servicos.length}</strong>
          </div>
        </div>
      </AnimacaoFade>

      {/* MODAL DE DELETAR */}
      <ModalDelete 
        aberto={!!itemParaExcluir} 
        titulo="Excluir ordem de serviço" 
        mensagem="Tem certeza que deseja remover esta ordem de serviço do sistema? Esta ação não poderá ser desfeita." 
        itemLabel="Serviço:" 
        itemNome={itemParaExcluir?.descricao} 
        itemDetalhe={`Equipamento: ${nomeEquipamento(itemParaExcluir?.equipamentoId)} — Polo: ${nomeCidade(itemParaExcluir?.cidadeId)}`} 
        itemIcone="assignment" 
        onCancelar={() => setItemParaExcluir(null)} 
        onConfirmar={confirmarExclusaoSimulada} 
        carregando={false}
      />

      {/* MODAL DE EDIÇÃO */}
      <ModalForm 
        aberto={modalEditarAberto} 
        titulo="Editar serviço" 
        icone="engineering"
        onCancelar={() => setModalEditarAberto(false)}
        onSalvar={() => setModalEditarAberto(false)}
      >
        <div className="field">
          <label>Descrição</label>
          <input type="text" value={descricaoEdicao} onChange={(e) => setDescricaoEdicao(e.target.value)} />
        </div>
        <div className="field">
          <label>Status</label>
          <select value={statusEdicao} onChange={(e) => setStatusEdicao(e.target.value)}>
            {STATUS_OPCOES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Equipamento</label>
          <select value={equipamentoIdEdicao} onChange={(e) => setEquipamentoIdEdicao(e.target.value)}>
            {equipamentos.map((eq) => (
              <option key={eq.id} value={eq.id}>{eq.nome}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Cidade / Polo</label>
          <select value={cidadeIdEdicao} onChange={(e) => setCidadeIdEdicao(e.target.value)}>
            {cidades.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
      </ModalForm>
    </div>
  )
}