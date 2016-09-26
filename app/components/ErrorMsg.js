import React from 'react'


export default function (props) {
  const imgfile = '/images/icons/' + props.img
  return (
    <div className='search-error dropdown-menu'>
      <img src={imgfile} className='center-block img-responsive'/>
      <h3 className='text-center'>{props.msg}</h3>
      <p className='text-center'>{props.desc}</p>
    </div>
  )
}