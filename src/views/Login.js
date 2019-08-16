import React from 'react'

// Styles
const main = {
  background: '#252f49',
  minHeight: '670px',
  color: 'white'
}

class Login extends React.Component {
  render() {
    return (
      <div style={main}>
        <div className="container">
          <center>
            <div style={{padding:'20%'}}>
              <h1>Login</h1>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        style={{width:'50%'}}
                        type="text"
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        style={{width:'50%'}}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button style={{width:'50%'}} type="submit" className="btn btn-block btn-success">Login</button>
                  </div>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    )
  }
}

export default Login
