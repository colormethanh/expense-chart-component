import './App.css'
import { useState } from 'react';
import jsonData from './data.json'
import Sidebar from './Sidebar'
import Balance from './Balance'
import Chart from './Chart'

import Footer from './Footer'
import { useEffect } from 'react'


function App() {
  
  const [barsInfo, setBarsInfo] = useState({
    min: 0,
    max: 0,
    sum: 0,
    largestBarIndex: 0, 
  })

  // const [barsData, setBarsData] = useState({
  //   "day0":0,
  //   "day1":0,
  //   "day2":0,
  //   "day3":0,
  //   "day4":0,
  //   "day5":0,
  //   "day6":0
  // })

  const [barsData, setBarsData] = useState(jsonData)

  useEffect(() =>{
    let sum = 0
    let largest = 0
    let smallest = 0
    let largestIndex = 0

    jsonData.map((day, index) =>{

      const dayNum = "day" + index
      if (day.amount >= largest) {
        largest = day.amount
        largestIndex = index
      }

      if (index == 0 || day.amount <= smallest) {
        smallest = day.amount
      }
      
      sum += day.amount

    })

    setBarsInfo({
      min: smallest,
      max: largest,
      sum: sum,
      largestBarIndex: largestIndex,
    })

  }, [])
  
  return (
    <div className="App">
      <Sidebar data={barsData} setData={setBarsData}/>
      <div className="wrapper">
        <Balance />
        <Chart data={barsData}/>
      </div>
      <Footer />
    </div>
  )
}

export default App
