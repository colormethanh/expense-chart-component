
import Bars from './Bars'


export default function Chart(props) {

  return (
    <div className="chart-cont">
      <div className="title-lg" id="title">
        Spending - Last 7 days
      </div>
      
      <Bars barsData={props.barsData} barsInfo={props.barsInfo}/>
      
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
  )
}