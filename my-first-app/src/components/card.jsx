import React from 'react'
import {BookMarked} from 'lucide-react'
const card = (props) => {
  console.log(props.company,props.date,props.posting,
    props.tagt,props.tagt2,props.money,props.logo)
  return (
    <div className="card">
<div className="top">
  <img src={props.logo} alt="" className='img' />
  <button>Save <BookMarked /></button>
  </div>
  <div className="center">
    <h3>{props.company}<span> {props.date}</span></h3>
    <h2><b>{props.posting}</b></h2>
    <div className="lets">
    <h4>{props.tagt}</h4> 
    <h4>{props.tagt2}</h4>
    </div>
</div>
<div className="bottom">
<div>   <h3>{props.money}$/hr</h3>
  <p>Mumbai, India </p>
  </div>
  <div>
  <button className='btn'>Apply</button>
  </div>
</div>
</div>
  )
}

export default card