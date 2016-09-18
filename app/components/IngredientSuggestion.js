import React from 'react'

export default function (props) {
  return (
    <li className='media ingredient'>
      <div className='media-left media-middle'>
        <img className='img-rounded' src={props.src} alt='50x48' width='50' height='50'/>
      </div>
      <div className='media-body'>
        <h4 className='media-heading'>{props.title}</h4>
      </div>
    </li>
  )
}