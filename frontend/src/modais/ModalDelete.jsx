import { useEffect } from 'react'

export default function ModalDelete({
  aberto,
  titulo = 'Excluir item',
  mensagem = 'Tem certeza que deseja excluir o item abaixo? Esta ação não poderá ser desfeita.',
  itemLabel = 'Item:',
  itemNome,
  itemDetalhe,
  itemIcone = 'info', 
  onCancelar,
  onConfirmar,
  carregando = false,
}) {
  
  useEffect(() => {
    if (!aberto) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancelar?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [aberto, onCancelar])

  if (!aberto) return null

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="icon-circle danger">
              <span className="material-icons" style={{ fontSize: '20px', color: '#ff4d4f' }}>
                delete
              </span>
            </div>
            <h2>{titulo}</h2>
          </div>
          <button className="modal-close" onClick={onCancelar} aria-label="Fechar">
            <span className="material-icons" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        <p className="modal-message">{mensagem}</p>

        <div className="modal-warning-box">
          <span className="material-icons modal-warning-icon">warning</span>
          <div className="modal-warning-text">
            <span className="modal-warning-label">{itemLabel}</span>
            <strong className="modal-warning-name">{itemNome}</strong>
            {itemDetalhe && (
              <div className="modal-warning-sub">
                {/* Renderiza a prop itemIcone de forma dinâmica */}
                <span className="material-icons" style={{ fontSize: '14px', color: 'var(--gold)' }}>
                  {itemIcone}
                </span>
                {itemDetalhe}
              </div>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onCancelar} disabled={carregando}>
            CANCELAR
          </button>
          <button className="btn-excluir" onClick={onConfirmar} disabled={carregando}>
            {carregando ? 'EXCLUINDO...' : 'EXCLUIR'}
          </button>
        </div>
      </div>
    </div>
  )
}