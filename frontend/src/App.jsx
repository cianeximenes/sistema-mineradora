import { useState } from 'react'
import Menu from './components/Menu.jsx'
import Inicio from './pages/Inicio.jsx'
import Equipamentos from './pages/Equipamentos.jsx'
import Cidades from './pages/Cidades.jsx'
import Funcionarios from './pages/Funcionarios.jsx'
import Servicos from './pages/Servicos.jsx'

export default function App() {
  const [pagina, setPagina] = useState('inicio')

  function renderPagina() {
    switch (pagina) {
      case 'inicio':
        return <Inicio />
      case 'equipamentos':
        return <Equipamentos />
      case 'cidades':
        return <Cidades />
      case 'funcionarios':
        return <Funcionarios />
      case 'servicos':
        return <Servicos />
      default:
        return <Inicio />
    }
  }

  return (
    <div className="app">
      <Menu pagina={pagina} setPagina={setPagina} />
      {renderPagina()}
    </div>
  )
}
