import React, { useEffect, useState } from 'react'

export default function Slider() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the currentDateTime every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  // console.log(currentDateTime)
  
  const [name, setName]=useState('Hennry Richard')
  const nameHandler1=()=>{
    setName('Hennary')
  }
  const nameHandler2=()=>{
    setName('Richard')
  }
  const nameHandler3=()=>{
    setName('Michal')
  }
  return (
    <div>
      <div className="slider">
        <div className="sliderbox">
        <h2>Brilliant work and great coordinate. Hast off!
          Absolute pleasure working with you. Highly recommended
          
        </h2>
        <ul className='ul'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul><br /><br />
        <h2>{name}</h2>
        <ul className='btnul'>
          <li className='btnli' onClick={nameHandler1}></li>
          <li className='btnli' onClick={nameHandler2}></li>
          <li className='btnli' onClick={nameHandler3}></li>
        </ul>
        </div>
      </div>
      <div className="date">
      <h2><span style={{color:'white',fontFamily:'arial'}}>Date</span><span style={{color:'white',fontFamily:'arial'}}>{currentDateTime.toLocaleString()}</span></h2><br />
        <h2>UP TO 60% OFF ON TEA TABLE! Hurry UP!</h2>
      </div>
    </div>
  )
}
