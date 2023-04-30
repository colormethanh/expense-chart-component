import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field'; // Thanks to: cchanxzy @https://github.com/cchanxzy/react-currency-input-field 


function convertFormData(formData) {
  const convertedForm = [] 
  formData.forEach((day, index) => {
    const data = {'day': day[0],'amount': day[1]}
    convertedForm.push(data)
  })
  return convertedForm
}

function FormTextInput(props) {

  const [value, setValue] = useState(props.amount)

  return (
    <div className="input-container">
      <label className={"input-label"}htmlFor={props.label}> {props.label}: </label> 
        
      <CurrencyInput
        className='input-input'
        id={props.label}
        maxLength={5}
        name={props.label}
        defaultValue={value}
        value={value}
        decimalScale={2}
        decimalsLimit={2}
        onValueChange={(value, name) => setValue(value)}
      />
      
    </div>
  )
}

function InfoSection(props) {
  console.log(props.barsInfo)
  const keys = Object.keys(props.barsInfo)

  return (
    <div className="info-section">
      {keys.map((key, index) => {
        return (<p> {key}: {props.barsInfo[key]}  </p>)
      })}
    </div>
  )
}

export default function Sidebar(props) {

  const [isOpen, setIsOpen] = useState(false)

  function handleSidebarToggle() {
    if (isOpen) {
      setIsOpen(false)
    } 
    else {
      setIsOpen(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    // read form data
    const form = e.target
    const formData = new FormData(form)

    const convertedForm = convertFormData([...formData.entries()])
    props.setBarsData(convertedForm)

    const barsInfo = props.analyzeData(convertedForm)
    props.setBarsInfo({
      min: barsInfo.min,
      max: barsInfo.max,
      sum: barsInfo.sum,
      maxValueIndex: barsInfo.maxValueIndex,
      maxValueDay: barsInfo.maxValueDay
    })
  }

  return(
    <>
      <div className="sidebar-toggler">
        <button onClick={handleSidebarToggle} className='toggle-btn'> Toggle sidebar </button>
      </div>
      <div className={isOpen ? "sidebar" : "sidebar sidebar-close"}>
        <form method='post' onSubmit={handleSubmit} id="form">
          <div className="form-inputs">
            {
              props.barsData.map((day, index)=>{
                return <FormTextInput 
                          label={day.day} 
                          amount={day.amount} 
                          key={index}
                          />
                })
            }
            
            <div className="btn-container">
              <button className='submit-btn' type='submit'> Submit </button>
            </div>
            
          </div>
        </form>
        <hr></hr>
        <InfoSection barsInfo={props.barsInfo}/>
      </div>
    </>
    
  )
}