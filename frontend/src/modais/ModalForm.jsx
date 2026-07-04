import { useEffect } from 'react'

export default function ModalForm({
  aberto,
  titulo = 'Editar item',
  icone = 'edit',
  onCancelar,
  onSalvar,
  children, 
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
        
        {/* Cabeçalho do Modal com Ícone Dinâmico */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="icon-circle" style={{ width: '40px', height: '40px' }}>
              <span className="material-icons" style={{ fontSize: '20px', color: 'var(--gold)' }}>
                {icone}
              </span>
            </div>
            <h2>{titulo.toUpperCase()}</h2>
          </div>
          <button className="modal-close" onClick={onCancelar} aria-label="Fechar">
            <span className="material-icons" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        {/* Onde os inputs injetados pelo 'children' vão aparecer */}
        <div className="modal-form-body" style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {children}
        </div>

        { }
        <div className="modal-actions" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            CANCELAR
          </button>
          <button type="button" className="btn-cadastrar" onClick={onSalvar}>
            SALVAR ALTERAÇÕES
          </button>
        </div>

      </div>
    </div>
  )
}