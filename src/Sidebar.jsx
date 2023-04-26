import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field'; // Thanks to: cchanxzy @https://github.com/cchanxzy/react-currency-input-field 

function FormTextInput(props) {

  const [value, setValue] = useState(props.amount)

  return (
    <>
      <label>
        {props.label}: 
        <CurrencyInput
          id={props.label}
          prefix='$'
          maxLength={5}
          name={props.label}
          defaultValue={value}
          decimalsLimit={2}
          onValueChange={(value, name) => console.log(value, name)}
        />
      </label>
    </>
  )
}

export default function Sidebar(props) {


  return(
    <div className="sidebar">
      <form>
        <div className="form-inputs">
          {
            props.data.map((day, index)=>{
              return <FormTextInput label={day.day} amount={day.amount} />
            })
          }
        </div>
        
      </form>
    </div>
  )
}