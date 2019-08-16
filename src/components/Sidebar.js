import React from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default sidebar">
          <div style={{padding:'10px'}}>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
              </button>
              <div className="hidden-lg hidden-md hidden-sm">
                <div style={{float:'right'}}>
                  <img src="/default-user.png" alt="" style={{width:'50px'}} />
                </div>
              </div>
            </div>
            <div className="hidden-xs">
              <div style={{padding:'10px',textAlign:'left',marginBottom:'20px'}}>
                <div style={{float:'left'}}>
                  <img src="/default-user.png" alt="" style={{width:'50px'}} />
                </div>
                <div style={{marginLeft:'60px'}}>
                  <span style={{fontSize:'18px',color:'white'}}>Adhit</span><br />
                  <span style={{color:'#9cb0c1'}}>Admin</span>
                </div>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav nav-pills nav-stacked" style={{borderTop:'1px solid #363c84'}}>
                <li role="presentation">
                  <Link to={'/'}>
                    <i className="glyphicon glyphicon-home"></i>
                    <span style={{verticalAlign:'text-bottom'}}>DASHBOARD</span>
                  </Link>
                </li>
                <li role="presentation">
                  <Link to={'/login'}>
                    <i className="glyphicon glyphicon-user"></i>
                    <span style={{verticalAlign:'text-bottom'}}>LOGOUT</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Sidebar
