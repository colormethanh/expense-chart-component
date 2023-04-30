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
    <>
      <label>
        {props.label}: 
        <CurrencyInput
          id={props.label}
          maxLength={5}
          name={props.label}
          defaultValue={value}
          value={value}
          decimalScale={2}
          decimalsLimit={2}
          onValueChange={(value, name) => setValue(value)}
        />
      </label>
    </>
  )
}

export default function Sidebar(props) {

  function handleSubmit(e) {
    e.preventDefault()
    
    // read form data
    const form = e.target
    const formData = new FormData(form)

    const convertedForm = convertFormData([...formData.entries()])
    props.setData(convertedForm)

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
    <div className="sidebar">
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
          <br></br>
          <button type='submit'> Submit </button>
        </div>
        
      </form>
    </div>
  )
}