import React from 'react'
import { Link } from 'react-router-dom'

export default function Sofas() {
  return (
    <div>
      <div className="sofas-page">
    <div className="s-textbox">
        <h3>Build Yours in Minutes</h3>
        <h1>MODULAR SOFAS</h1>
        <div className="viewbtn" style={{cursor:'pointer'}}><Link to="../Filters">VIEW COLLECTION</Link></div>
    </div>
</div>

    </div>
  )
}
