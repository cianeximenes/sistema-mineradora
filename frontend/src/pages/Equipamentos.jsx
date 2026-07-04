// src/pages/Equipamentos.jsx
import { useEffect, useState } from 'react'
import { listarEquipamentos, criarEquipamento } from '../services/api.js'
import OptionsMenu from '../components/OptionsMenu.jsx'
import ModalDelete from '../modais/ModalDelete.jsx' 
import ModalForm from '../modais/ModalForm.jsx'
import AnimacaoFade from '../components/AnimacaoFade.jsx' 
import '/src/styles/ModalDelete.css'

const SETORES = ['Extração', 'Processamento', 'Transporte']

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([])
  const [nome, setNome] = useState('')
  const [setor, setSetor] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  const [itemParaExcluir, setItemParaExcluir] = useState(null)

  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [setorEdicao, setSetorEdicao] = useState('')

  useEffect(() => {
    listarEquipamentos().then((data) => {
      setEquipamentos(data)
      setCarregando(false)
    })
  }, [])

  async function handleCadastrar(e) {
    e.preventDefault()
    if (!nome.trim() || !setor) return
    setEnviando(true)
    const novo = await criarEquipamento({ nome, setor })
    setEquipamentos((prev) => [...prev, novo])
    setNome('')
    setSetor('')
    setEnviando(false)
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
          <h1 className="page-title">Gestão de Equipamentos</h1>
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.12s">
        <form className="card" onSubmit={handleCadastrar} style={{ marginTop: '20px' }}>
          <div className="card-header">
            <div className="icon-circle small">
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)' }}>construction</span>
            </div>
            <h2>NOVO EQUIPAMENTO</h2>
          </div>

          <div className="form-grid with-button">
            <div className="field">
              <label>Nome do Equipamento</label>
              <input
                type="text"
                placeholder="Ex: Escavadeira HX300"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Setor</label>
              <select value={setor} onChange={(e) => setSetor(e.target.value)}>
                <option value="" disabled hidden>Selecione um setor...</option>
                {SETORES.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
          <div className="list-section-title linha-oscilante" style={{ marginBottom: '24px' }}>
            <h3>
              <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)', marginRight: '8px' }}>layers</span>
              EQUIPAMENTOS CADASTRADOS
            </h3>
          </div>

          <div className="list">
            {carregando && <div className="empty-state">Carregando equipamentos...</div>}
            {!carregando && equipamentos.length === 0 && (
              <div className="empty-state">Nenhum equipamento cadastrado ainda.</div>
            )}
            {equipamentos.map((eq) => (
              <div className="list-item" key={eq.id}>
                <div className="icon-circle">
                  <span className="material-icons" style={{ fontSize: '20px', color: 'var(--gold)' }}>local_shipping</span>
                </div>
                <div className="list-item-main">
                  <div className="name">{eq.nome}</div>
                  <div className="sub">
                    <span className="material-icons" style={{ fontSize: '14px', color: 'var(--gold)' }}>settings</span>
                    Setor: {eq.setor}
                  </div>
                </div>
                
                <OptionsMenu 
                  onExcluirClick={() => setItemParaExcluir(eq)} 
                  onEditarClick={() => {
                    setNomeEdicao(eq.nome)      
                    setSetorEdicao(eq.setor)    
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
            Total de equipamentos: <strong style={{ marginLeft: '4px' }}>{equipamentos.length}</strong>
          </div>
        </div>
      </AnimacaoFade>

      { }
      <ModalDelete 
        aberto={!!itemParaExcluir} 
        titulo="Excluir equipamento" 
        mensagem="Tem certeza que deseja excluir o equipamento abaixo? Esta ação não poderá ser desfeita." 
        itemLabel="Equipamento:" 
        itemNome={itemParaExcluir?.nome} 
        itemDetalhe={`Setor: ${itemParaExcluir?.setor}`} 
        onCancelar={() => setItemParaExcluir(null)} 
        onConfirmar={confirmarExclusaoSimulada} 
        carregando={false}
        itemIcone="construction"
      />

      { }
      <ModalForm 
        aberto={modalEditarAberto} 
        titulo="Editar equipamento" 
        icone="construction"
        onCancelar={() => setModalEditarAberto(false)}
        onSalvar={() => setModalEditarAberto(false)}
      >
        <div className="field">
          <label>Nome do Equipamento</label>
          <input type="text" value={nomeEdicao} onChange={(e) => setNomeEdicao(e.target.value)} />
        </div>
        <div className="field">
          <label>Setor</label>
          <select value={setorEdicao} onChange={(e) => setSetorEdicao(e.target.value)}>
            <option value="Extração">Extração</option>
            <option value="Processamento">Processamento</option>
            <option value="Transporte">Transporte</option>
          </select>
        </div>
      </ModalForm>
    </div>
  )
}