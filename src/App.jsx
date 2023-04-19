import { useState } from 'react'
import './App.css'
import Footer from './Footer'
import{ ReactComponent as Logo } from './assets/images/logo.svg'


function Bar() {

}

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        
        <div className="balance-cont">
          <div className="balance-txt">
            <span className="title-sm">My balance</span>
            <span className="title-lg">$921.48</span>
          </div>
          <div className="logo">
            <Logo />
          </div>
        </div>

        <div className="chart-cont">
          <div className="title-lg">
            Spending - Last 7 days
          </div>
          
          <div className="chart-bars-cont">
            
            <Bar />
            {/* mon
            tue
            wed
            thu
            fri
            sat
            sun */}
          </div>
          
          <hr></hr>

          <div className="summary">
            <div className="summary-total">
              <span className='title-sm' style={{color:"hsl(28, 10%, 53%)"}}>Total this month</span>
              <span className='title-lg'>$478.33</span>
            </div>

            <div className="summary-percentage title-sm">
              <span style={{fontWeight: 700, color:"hsl(25, 47%, 15%)"}}>+2.4%</span>
              <span style={{color:"hsl(28, 10%, 53%)"}}>from last month</span>
            </div>
            
          </div>
          
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default App
