import './App.css'
import Balance from './Balance'
import Chart from './Chart'

import Footer from './Footer'


function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Balance />
        <Chart />
      </div>
      <Footer />
    </div>
  )
}

export default App
