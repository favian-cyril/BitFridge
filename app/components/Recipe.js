import React from 'react'


export default class Recipe extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li className='media ingredient'>
        <div className='media-left media-middle'>
          <img className='img-rounded' src="http://placehold.it/90x90" alt='90x90' width='90' height='90'/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.props.recipe.title}</h5>
          <p><small className="text-muted">Missing: {}</small></p>
        </div>
        <div className='media-right media-middle'>
          <button className='btn btn-default btn-add'>
            <i className="fa fa-2x fa-external-link btn-add-icon"></i>
          </button>
        </div>
      </li>
    )
  }
}