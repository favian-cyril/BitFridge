import React from 'react'


export default function (props) {
  var img = null
  if (props.img) {
    const imgfile = '/images/icons/' + props.img
    img = <img src={imgfile} className='center-block img-responsive'/>
  }
  return (
    <div className='search-error dropdown-menu'>
      {img}
      <h3 className='text-center'>{props.msg}</h3>
      <p className='text-center'>{props.desc}</p>
    </div>
  )
}