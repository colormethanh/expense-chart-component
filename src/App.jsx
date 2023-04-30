import './App.css'
import { useState } from 'react';
import jsonData from './data.json'
import Sidebar from './Sidebar'
import Balance from './Balance'
import Chart from './Chart'

import Footer from './Footer'
import { useEffect } from 'react'



function analyzeData(data) {

  let dataInfo = {
    sum: 0,
    max: 0,
    maxValueIndex: 0,
    maxValueDay: 0
  }
  
  data.map((day, index) =>{

    const dayAmount = parseFloat(day.amount)
  
    if (dayAmount >= dataInfo.max) {
      dataInfo.max = dayAmount
      dataInfo.maxValueDay = day.day
      dataInfo.maxValueIndex = index
    }

    if (index == 0 || dayAmount <= dataInfo.min) {
      dataInfo.min = dayAmount
    }

    dataInfo.sum += dayAmount
  })

  return dataInfo
}


function App() {
  
  const [barsInfo, setBarsInfo] = useState({
    min: 0,
    max: 0,
    sum: 0,
    maxValueIndex: 0,
    maxValueDay:'', 
  })
  const [barsData, setBarsData] = useState(jsonData)

  useEffect(() =>{
    const barsInfo = analyzeData(barsData)
    setBarsInfo({
      min: barsInfo.min,
      max: barsInfo.max,
      sum: barsInfo.sum,
      maxValueIndex: barsInfo.maxValueIndex,
      maxValueDay: barsInfo.maxValueDay
    })

  }, [])
  
  return (
    <div className="App">
      <Sidebar barsData={barsData} setBarsData={setBarsData} analyzeData={analyzeData} setBarsInfo={setBarsInfo}/>
      <div className="wrapper">
        <Balance />
        <Chart barsData={barsData} barsInfo={barsInfo}/>
      </div>
      <Footer />
    </div>
  )
}

export default App
