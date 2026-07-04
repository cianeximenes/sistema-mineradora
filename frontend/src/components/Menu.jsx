const ITENS = [
  { id: 'inicio', label: 'Início', icon: 'home' }, // Nome do ícone no Google
  { id: 'equipamentos', label: 'Equipamentos', icon: 'construction' }, // Ícone que parece uma picareta/martelo
  { id: 'cidades', label: 'Cidades', icon: 'location_city' },
  { id: 'funcionarios', label: 'Funcionários', icon: 'badge' },
  { id: 'servicos', label: 'Serviços', icon: 'settings' },
]

export default function Menu({ pagina, setPagina }) {
  return (
    <header className="header">
      <div className="logo">
        <img className="icon" src="/icons/logo.png" alt="Mineradora" />
        MINERADORA
      </div>
      <nav className="nav">
        {ITENS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${pagina === item.id ? 'active' : ''}`}
            onClick={() => setPagina(item.id)}
          >
            {/* Tag do Google Icons */}
            <span className="material-icons">{item.icon}</span>
            {item.label.toUpperCase()}
          </button>
        ))}
      </nav>
    </header>
  )
}