import { useEffect, useState } from 'react'

function Bar(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="bar" onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      
      <div className="bar-box">
        
        <div className="bar-shell" style={{height: props.percentage + "%"}}>
          <div className={ "bar-" + props.type  + (isHover? " hovered-opacity": "")} ></div>
        </div>
        
        <div className="bar-info-outer">
          <div className={"bar-info" + (isHover ? " opacity-on" : " ")}>
            ${props.amnt}
          </div>
        </div>
        
      </div>
      
      <div className="bar-label">
        {props.label}
      </div>
    </div>
    
  )
}


export default function Bars(props) {

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

    props.data.map((day, index) => {
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
          props.data.map((day, index) =>{
            
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