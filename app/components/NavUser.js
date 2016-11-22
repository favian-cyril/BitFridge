import React from 'react'
import { ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap'

const NavUser = (props, context) => {
  const offset = (context.display === 'index') ? 'offset-xs-9' : 'row'
  const popoverLogin = (
    <Popover id="popover-login" style={{ marginTop : 4 }}>
      <div className="btn-group">
        <a className="btn btn-facebook" href="/login/facebook">
          <span className="fa fa-facebook"></span>
        </a>
        <a className="btn btn-google" href="/login/google">
          <span className="fa fa-google"></span>
        </a>
      </div>
    </Popover>
  )
  const popoverLogout = (
    <Popover id="popover-logout" style={{ marginTop : 4 }}>
      <div className="list-group">
        <a className="list-group-item list-group-item-action" href="#">History</a>
        <a className="list-group-item list-group-item-action" href="#">My Recipes</a>
        <a className="list-group-item list-group-item-action active" href="/logout">Log Out</a>
      </div>
    </Popover>
  )
  const loggedIn = props.user.facebook || props.user.google
  const accountType = props.user.facebook ? 'facebook' : 'google'
  return (
    <div className={`${offset}`}>
      {
        loggedIn ? (
          <ButtonToolbar>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverLogout}>
              <a className="btn btn-secondary btn-login">
                Hello, {props.user[accountType].name}!
                <img className="img-circle" src={props.user[accountType].picture}></img>
              </a>
            </OverlayTrigger>
          </ButtonToolbar>
        ) : (
          <ButtonToolbar>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popoverLogin}>
              <a className="btn btn-secondary btn-login">
                Log In
              </a>
            </OverlayTrigger>
          </ButtonToolbar>
        )
      }
    </div>
  )
}

NavUser.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }).isRequired
}

NavUser.contextTypes = {
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default NavUser