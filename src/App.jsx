
import './App.css'
import Pokedex from './components/pokedex/pokedex'
import CustomRoutes from './routes/CostumRoutes'

function App() {

  return (
    <>
    <div className='outer-pokedex' >
      <h1 id="pokedex-heading" >
            POKEDEX
            </h1>
      <CustomRoutes/>
    </div>
    
    </>
  )
}

export default App