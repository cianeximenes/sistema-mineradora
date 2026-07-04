import { useEffect, useState } from 'react'
import {
  listarCidades,
  listarEquipamentos,
  listarFuncionarios,
  listarServicos,
  listarMovimentacoes,
} from '../services/api.js'
import OptionsMenu from '../components/OptionsMenu.jsx'
import ModalDelete from '../modais/ModalDelete.jsx' 
import ModalForm from '../modais/ModalForm.jsx' 
import AnimacaoFade from '../components/AnimacaoFade.jsx' 
import '/src/styles/ModalDelete.css'

const DELETE_MAP = {
  cidade:      { label: 'Cidade' },
  equipamento: { label: 'Equipamento' },
  funcionario: { label: 'Funcionário' },
  servico:     { label: 'Serviço' },
}

export default function Inicio() {
  const [cidades, setCidades]           = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [servicos, setServicos]         = useState([])
  const [movimentacoes, setMovimentacoes] = useState([])
  const [carregando, setCarregando]     = useState(true)

  const [modalItem, setModalItem] = useState(null)  

  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [itemParaEditar, setItemParaEditar] = useState(null) 
  
  const [campoNome, setCampoNome] = useState('')
  const [campoSub, setCampoSub] = useState('')

  useEffect(() => {
    Promise.all([
      listarCidades(),
      listarEquipamentos(),
      listarFuncionarios(),
      listarServicos(),
      listarMovimentacoes(),
    ]).then(([c, e, f, s, m]) => {
      setCidades(c)
      setEquipamentos(e)
      setFuncionarios(f)
      setServicos(s)
      setMovimentacoes(m)
      setCarregando(false)
    })
  }, [])

  const concluidos = servicos.filter((s) => s.status === 'Concluído').length

  function confirmarExclusaoSimulada() {
    setModalItem(null)
  }

  return (
    <div className="page">

      { }
      <ModalDelete 
        aberto={!!modalItem} 
        titulo={`Excluir ${DELETE_MAP[modalItem?.tipo]?.label ?? 'Item'}`} 
        mensagem="Tem certeza que deseja remover este registro do sistema? Esta ação não poderá ser desfeita." 
        itemLabel={`${DELETE_MAP[modalItem?.tipo]?.label ?? 'Item'}:`} 
        itemNome={modalItem?.nome} 
        itemDetalhe={modalItem?.setor} 
        itemIcone={modalItem?.icon ?? 'analytics'} 
        onCancelar={() => setModalItem(null)} 
        onConfirmar={confirmarExclusaoSimulada} 
        carregando={false}
      />

      { }
      <AnimacaoFade delay="0s">
        <div className="dashboard-header">
          <h1>Painel de Controle da Mineradora</h1>
          <p>Monitore cidades, equipamentos, funcionários e serviços em um único lugar.</p>
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.12s">
        <div className="stats-grid">
          <StatCard icon="apartment"      label="Cidades"      value={cidades.length} />
          <StatCard icon="local_shipping" label="Equipamentos" value={equipamentos.length} />
          <StatCard icon="badge"          label="Funcionários" value={funcionarios.length} />
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.22s">
        <div className="stats-grid secondary-row">
          <StatCard icon="build"         label="Serviços"   value={servicos.length} />
          <StatCard icon="check_circle"  label="Concluídos" value={concluidos} />
        </div>
      </AnimacaoFade>

      { }
      <AnimacaoFade delay="0.32s">
        <div className="movimentacoes-title">
          <span className="movimentacoes-content">
            <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)' }}>assignment</span>
            ÚLTIMAS MOVIMENTAÇÕES
          </span>
        </div>

        <div className="list">
          {carregando && <div className="empty-state">Carregando movimentações...</div>}
          {!carregando && movimentacoes.length === 0 && (
            <div className="empty-state">Nenhuma movimentação recente.</div>
          )}
          {movimentacoes.map((mov) => {
            const ehServico = mov.icon === 'build' || mov.icon === 'engineering' || mov.icon === 'assignment' || mov.icon === 'opacity' || mov.icon === 'settings_input_component'
            
            const tipoItem = mov.icon === 'apartment' ? 'cidade' : 
                             mov.icon === 'local_shipping' ? 'equipamento' : 
                             mov.icon === 'badge' ? 'funcionario' : 'servico'

            return (
              <div className="list-item" key={mov.id}>
                <div className="icon-circle small">
                  <span className="material-icons" style={{ fontSize: '18px', color: 'var(--gold)' }}>
                    {mov.icon}
                  </span>
                </div>
                <div className="list-item-main">
                  <div className="name">{mov.titulo}</div>
                  <div className="sub">{mov.subtitulo}</div>
                </div>
                <div className="badge" style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)' }}>
                  {mov.tempo}
                </div>

                <OptionsMenu
                  onExcluirClick={() => setModalItem({
                    id:   mov.id,
                    nome: mov.titulo,      
                    tipo: tipoItem,
                    setor: mov.subtitulo,  
                    icon: mov.icon
                  })}
                  onEditarClick={() => {
                    setItemParaEditar({ ...mov, tipoTextual: tipoItem })

                    if (tipoItem === 'cidade') {
                      const real = cidades.find(c => mov.titulo.includes(c.nome))
                      setCampoNome(real ? real.nome : mov.titulo.replace('Nova cidade:', '').replace('Cidade:', '').trim())
                      setCampoSub(real ? real.estado : 'CE') 
                    } 
                    else if (tipoItem === 'funcionario') {
                      const real = funcionarios.find(f => mov.titulo.includes(f.nome))
                      setCampoNome(real ? real.nome : mov.titulo.replace('Novo funcionário:', '').replace('Funcionário:', '').trim())
                      setCampoSub(real ? real.cargo : 'Operador')
                    } 
                    else if (tipoItem === 'equipamento') {
                      const real = equipamentos.find(e => mov.titulo.includes(e.nome))
                      setCampoNome(real ? real.nome : mov.titulo.replace('Novo equipamento:', '').replace('Equipamento:', '').trim())
                      setCampoSub(real ? real.setor : 'Extração')
                    } 
                    else {
                      const real = servicos.find(s => mov.titulo.includes(s.descricao))
                      const tituloLimpo = mov.titulo.replace('Novo serviço:', '').replace('Serviço:', '').replace('Nova ordem:', '').trim()
                      setCampoNome(real ? real.descricao : tituloLimpo)
                      setCampoSub(real ? real.status : 'Pendente')
                    }

                    setModalEditarAberto(true)
                  }}
                />
              </div>
            )
          })}
        </div>
      </AnimacaoFade>

      { }
      <ModalForm
        aberto={modalEditarAberto}
        titulo={`Editar ${DELETE_MAP[itemParaEditar?.tipoTextual]?.label ?? 'Serviço'}`}
        icone={itemParaEditar?.icon ?? 'build'}
        onCancelar={() => setModalEditarAberto(false)}
        onSalvar={() => setModalEditarAberto(false)}
      >
        <div className="field">
          <label>
            {itemParaEditar?.tipoTextual === 'servico' ? 'Descrição do Serviço' : `Nome do(a) ${DELETE_MAP[itemParaEditar?.tipoTextual]?.label}`}
          </label>
          <input type="text" value={campoNome} onChange={(e) => setCampoNome(e.target.value)} />
        </div>

        <div className="field">
          <label>
            {itemParaEditar?.tipoTextual === 'cidade' ? 'Estado' : 
             itemParaEditar?.tipoTextual === 'equipamento' ? 'Setor Responsável' :
             itemParaEditar?.tipoTextual === 'funcionario' ? 'Cargo' : 'Status Atual'}
          </label>
          <input type="text" value={campoSub} onChange={(e) => setCampoSub(e.target.value)} />
        </div>
      </ModalForm>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="icon-circle">
        <span className="material-icons" style={{ fontSize: '22px', color: 'var(--gold)' }}>{icon}</span>
      </div>
      <div className="label">{label}</div>
      <div className="divider" />
      <div className="value">{value}</div>
    </div>
  )
}