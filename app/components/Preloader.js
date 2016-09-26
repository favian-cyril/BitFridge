import React from 'react'


export default function () {
  const imgfile = '/images/spin.gif'
  var classes = 'preloader dropdown-menu'
  return (
    <div className={classes}>
      <img src={imgfile} className='center-block img-responsive'/>
    </div>
  )
}