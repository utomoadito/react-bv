import React from 'react'
import Sidebar from '../components/Sidebar'
import { api } from '../api/api'
import '../css/Main.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataUser: {},
      model: {}
    }
  }

  componentDidMount() {
    let dataUser = localStorage.getItem('data-user')
    dataUser = JSON.parse(dataUser)
    this.setState({
      dataUser: dataUser,
      model: {
        email: dataUser.email,
        name: dataUser.name
      }
    })
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
  submit() {
    let model = this.state.model
    api().post('user/' + this.state.dataUser.id, model).then(response => {
      console.log(response)
      if (response.status === "Success") {
        localStorage.setItem('data-user', JSON.stringify(model))
      }
    })
  }

  render() {
    return (
      <div>
        <Sidebar dataUser={this.state.dataUser} />
        <div className="main">
          <div className="container-fluid" style={{paddingTop: '10px'}}>
            <div className="row">
              <div className="col-md-12">
                <ol className="breadcrumb">
                  <li><a href="/#"><i className="glyphicon glyphicon-home"></i></a></li>
                </ol>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6 col-xs-7">
                    <h3 style={{fontSize:'20px'}}><b>PROFILE DETAIL</b></h3>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                      <div className="col-md-8">
                        <input
                         type="email"
                         className="form-control"
                         id="email"
                         placeholder="admin@mail.com"
                         onChange={this.inputModel.bind(this, 'model.email')}
                         value={this.state.model.email || ''}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="John Doe"
                          onChange={this.inputModel.bind(this, 'model.name')}
                          value={this.state.model.name || ''}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-md-8">
                        <button onClick={this.submit.bind(this)} type="button" className="btn btn-primary">Update</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
