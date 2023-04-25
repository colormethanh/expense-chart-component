import { useEffect, useState } from 'react'
import './App.css'
import jsonData from './data.json'
import Footer from './Footer'
import{ ReactComponent as Logo } from './assets/images/logo.svg'


function Bar(props) {
  const [isHover, setIsHover] = useState(false);


  return (
    <div className="bar" onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      
      <div className="bar-box">
        <div className="bar-shell" style={{height: props.percentage + "%"}}>
          <div className={ "bar-" + props.type  + (isHover? " hovered-opacity": "")} ></div>
        </div>
        
        <div className={"bar-info" + (isHover ? " opacity-on" : " ")}>
          ${props.amnt}
        </div>
      </div>
      
      <div className="bar-label">
        {props.label}
      </div>
    </div>
    
  )
}


function Bars() {

  // collecting data on jsonData
  const [largestBarIndex, setLargestBarIndex] = useState(0)
  const [barMinMaxSum, setBarMinMaxSum] = useState({
    min: 0,
    max: 0,
    sum: 0 
  })

  useEffect(()=>{
    let sum = 0
    let largest = 0
    let smallest = 0
    let largestIndex = 0 

    jsonData.map((day, index) => {
      if (day.amount >= largest) {
        largest = day.amount
        largestIndex = index
      }

      if (index == 0 || day.amount <= smallest) {
        smallest = day.amount
      }
      
      sum += day.amount
    })
    setLargestBarIndex(largestIndex)
    setBarMinMaxSum({
      min: smallest,
      max: largest,
      sum: sum
    })


  }, [])


  // Calculate a normalized value from 0 - 100 to serve as bar height
  // Normalize formula: xnormalized = (x - xminimum) / range of x
  function calcPercentage(amnt) {
    const range = barMinMaxSum.max - 0
    const xnormalized = (amnt - 0) / range
    const normalizedPercentage = xnormalized * 100
    // console.log(amnt + " normalized: " + xnormalized + "--100-->" + (xnormalized * 100))
    
    return normalizedPercentage == Infinity ? 0 : normalizedPercentage
  }


  return (
    <>
      <div className="chart-bars-cont">
        {  
          jsonData.map((day, index) =>{
            
            if (index == largestBarIndex) {
              return (
                <Bar type={'blue'} label={day["day"]} amnt={day['amount']} percentage={calcPercentage(day['amount'])} key={index} />
              )
            } else {
              return (
                <Bar type={'red'} label={day["day"]} amnt={day['amount']} percentage={calcPercentage(day['amount'])} key={index} />
              )
            }
          })
        }
            
      </div>
    </>
  )
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
          
          <Bars />
          
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
