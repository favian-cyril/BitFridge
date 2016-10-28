import React from 'react'


export default function () {
  const imgfile = '/images/spin.gif'
  var classes = 'preloader'
  return (
    <div className={classes}>
      <img src={imgfile} className='centered img-responsive'/>
    </div>
  )
}