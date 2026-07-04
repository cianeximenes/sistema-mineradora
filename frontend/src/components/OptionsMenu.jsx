import { useState, useEffect, useRef } from 'react'

export default function OptionsMenu({ onEditarClick, onExcluirClick }) { 
  const [aberto, setAberto] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function clicarFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAberto(false)
      }
    }
    document.addEventListener('mousedown', clicarFora)
    return () => document.removeEventListener('mousedown', clicarFora)
  }, [])

  return (
    <div style={{ position: 'relative' }} ref={menuRef}>
      <button 
        type="button" 
        className="menu-dots"
        onClick={(e) => {
          e.stopPropagation()
          setAberto(!aberto)
        }}
      >
        <span className="material-icons" style={{ fontSize: '20px', verticalAlign: 'middle' }}>more_vert</span>
      </button>

      {aberto && (
        <div className="menu-dots-popover">
          {/* Opção editar*/}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setAberto(false)
              if (onEditarClick) onEditarClick() 
            }}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>edit</span>
            Editar
          </button>

          {/* Opção EXCLUIR */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setAberto(false)
              if (onExcluirClick) onExcluirClick()
            }}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>delete</span>
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}