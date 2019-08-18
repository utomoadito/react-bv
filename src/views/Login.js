import React from 'react'
import { api } from '../api/api'
import { withRouter } from 'react-router'

// Styles
const main = {
  background: '#252f49',
  minHeight: '670px',
  color: 'white'
}

class Login extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.state = {
      model: {}
    }
  }

  // Methods Event
  inputModel(model, event) {
    // check if "model" has ".", that's mean "model" had children inside
    if (model.includes('.')) {
      let childObject = model.split('.')
      this.setState({
        [childObject[0]]: Object.assign({}, this.state[childObject[0]], {
          [childObject[1]]: event.target.value
        })
      })
    } else {
      this.setState({
        [model]: event.target.value
      })
    }
  }
  handleLogin() {
    api().login('auth/login', this.state.model).then(response => {
      console.log(response)
      const token = response.access_token
      localStorage.setItem('user-token', token) // store the token in localstorage
      localStorage.setItem('data-user', JSON.stringify(response.data_user)) // store data user in localstorage
      this.props.history.push('/')
    })
  }
  
  render() {
    return (
      <div style={main}>
        <div className="container">
          <center>
            <div style={{padding:'20%'}}>
              <h1>Login</h1>
              <div className="col-md-12">
                <div className="row">
                  <form>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          style={{width:'50%'}}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={this.inputModel.bind(this, 'model.email')}
                          value={this.state.model.email || ''}
                          required
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
                          onChange={this.inputModel.bind(this, 'model.password')}
                          value={this.state.model.password || ''}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button onClick={this.handleLogin.bind(this)} style={{width:'50%'}} type="button" className="btn btn-block btn-success">Login</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
