import React from 'react'


export default function (props) {
  const imgfile = '/images/icons/' + props.img
  return (
    <div className='search-error'>
      <img src={imgfile} className='center-block'/>
      <h4>{props.msg}</h4>
      <p>{props.desc}</p>
    </div>
  )
}