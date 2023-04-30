import { useEffect, useState } from 'react'

function Bar(props) {
  const [isHover, setIsHover] = useState(false);

  const valueFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const formattedAmnt = valueFormatter.format(props.amnt)

  return (
    <div className="bar" onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      
      <div className="bar-box">
        
        <div className="bar-shell" style={{height: props.percentage + "%"}}>
          <div className={ "bar-" + props.type  + (isHover? " hovered-opacity": "")} ></div>
        </div>
        
        <div className="bar-info-outer">
          <div className={"bar-info" + (isHover ? " opacity-on" : " ")}>
            {formattedAmnt}
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


  useEffect(()=>{
    
  }, [])

  // Calculate a normalized value from 0 - 100 to serve as bar height
  // Normalize formula: xnormalized = (x - xminimum) / range of x
  function calcPercentage(amnt) {
    const range = props.barsInfo.max - 0
    const xnormalized = (amnt - 0) / range
    const normalizedPercentage = xnormalized * 100
    
    return normalizedPercentage == Infinity ? 0 : normalizedPercentage
  }

  return (
    <>
      <div className="chart-bars-cont">
        {  
          props.barsData.map((day, index) =>{
            
            if (index == props.barsInfo.maxValueIndex) {
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