// src/pages/Cidades.jsx
import { useEffect, useState } from 'react'
import { listarCidades, listarServicos, criarCidade } from '../services/api.js'
import { ESTADOS } from '../utils/estados.js' 
import OptionsMenu from '../components/OptionsMenu.jsx' 
import ModalDelete from '../modais/ModalDelete.jsx' 
import ModalForm from '../modais/ModalForm.jsx' 
import AnimacaoFade from '../components/AnimacaoFade.jsx' 
import '/src/styles/ModalDelete.css' 

export default function Cidades() {
  const [cidades, setCidades] = useState([])
  const [servicos, setServicos] = useState([]) 
  const [nome, setNome] = useState('')
  const [estado, setEstado] = useState('') 
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  const [itemParaExcluir, setItemParaExcluir] = useState(null)

  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [estadoEdicao, setEstadoEdicao] = useState('')

  useEffect(() => {
    Promise.all([listarCidades(), listarServicos()]).then(([c, s]) => {
      setCidades(c)
      setServicos(s)
      setCarregando(false)
    })
  }, [])

  async function handleCadastrar(e) {
    e.preventDefault()
    if (!nome.trim() || !estado) return
    setEnviando(true)
    const nova = await criarCidade({ nome, estado })
    setCidades((prev) => [...prev, nova])
    setNome('')
    setEstado('')
    setEnviando(false)
  }

  function contarServicos(cidadeId) {
    return servicos.filter((serv) => serv.cidadeId === cidadeId).length
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
          <h1 className="page-title">Gestão de Cidades</h1>
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.12s">
        <form className="card" onSubmit={handleCadastrar} style={{ marginTop: '20px' }}>
          <div className="card-header">
            <div className="icon-circle small">
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)' }}>location_on</span>
            </div>
            <h2>NOVA CIDADE</h2>
          </div>

          <div className="form-grid with-button">
            <div className="field">
              <label>Nome do Cidade</label>
              <input
                type="text"
                placeholder="Nome da Cidade (Ex: Parauapebas)"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Nome do Estado</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="" disabled hidden>Selecione o Estado...</option>
                {ESTADOS.map((item) => (
                  <option key={item.uf} value={item.uf}>
                    {item.nome}
                  </option>
                ))}
              </select>
            </div>

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
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)', marginRight: '8px' }}>apartment</span>
              CIDADES CADASTRADAS
            </h3>
          </div>

          {carregando && <div className="empty-state">Carregando cidades...</div>}
          {!carregando && cidades.length === 0 && (
            <div className="empty-state">Nenhuma cidade cadastrada ainda.</div>
          )}

          <div className="cidades-grid">
            {cidades.map((cidade) => (
              <div className="cidade-card" key={cidade.id}>
                <div className="cidade-card-top">
                  <div className="icon-circle">
                    <span className="material-icons" style={{ fontSize: '20px', color: 'var(--gold)' }}>location_city</span>
                  </div>
                  <div className="cidade-card-info">
                    <div className="name">{cidade.nome}</div>
                    <div className="sub">
                      <span className="material-icons" style={{ fontSize: '13px', color: 'var(--gold)', marginRight: '4px' }}>map</span>
                      {cidade.estado || 'CE'}
                    </div>
                  </div>

                  <OptionsMenu 
                    onExcluirClick={() => setItemParaExcluir(cidade)} 
                    onEditarClick={() => {
                      setNomeEdicao(cidade.nome)
                      setEstadoEdicao(cidade.estado || 'CE')
                      setModalEditarAberto(true)
                    }}
                  />
                </div>
                <div className="cidade-card-divider" />
                <div className="cidade-card-footer">
                  <span className="material-icons" style={{ fontSize: '14px', color: 'var(--gold)', marginRight: '6px' }}>assignment</span>
                  {contarServicos(cidade.id)} serviços ativos
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-total linha-oscilante" style={{ marginTop: '36px' }}>
          <div className="total-badge">
            <span className="material-icons" style={{ fontSize: '16px', color: 'var(--gold)', marginRight: '8px' }}>public</span>
            Total de cidades: <strong style={{ marginLeft: '4px' }}>{cidades.length}</strong>
          </div>
        </div>
      </AnimacaoFade>

      { }
      <ModalDelete 
        aberto={!!itemParaExcluir} 
        titulo="Excluir cidade" 
        mensagem="Tem certeza que deseja excluir a cidade abaixo? Esta ação não poderá ser desfeita." 
        itemLabel="Cidade:" 
        itemNome={itemParaExcluir?.nome} 
        itemDetalhe={`Estado: ${itemParaExcluir?.estado || 'CE'}`} 
        onCancelar={() => setItemParaExcluir(null)} 
        onConfirmar={confirmarExclusaoSimulada} 
        carregando={false}
        itemIcone="map"
      />

      { }
      <ModalForm 
        aberto={modalEditarAberto} 
        titulo="Editar cidade" 
        icone="location_on"
        onCancelar={() => setModalEditarAberto(false)}
        onSalvar={() => setModalEditarAberto(false)}
      >
        <div className="field">
          <label>Nome da Cidade</label>
          <input type="text" value={nomeEdicao} onChange={(e) => setNomeEdicao(e.target.value)} />
        </div>
        <div className="field">
          <label>Nome do Estado</label>
          <select value={estadoEdicao} onChange={(e) => setEstadoEdicao(e.target.value)}>
            {ESTADOS.map((item) => (
              <option key={item.uf} value={item.uf}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      </ModalForm>
    </div>
  )
}