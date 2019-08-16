import React from 'react'
import Sidebar from '../components/Sidebar'
import '../css/Main.css'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
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
                      <label for="email" className="col-sm-2 control-label">Email</label>
                      <div className="col-md-8">
                        <input type="email" className="form-control" id="email" placeholder="admin@mail.com" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="name" className="col-sm-2 control-label">Name</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" id="name" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-md-8">
                        <button type="submit" className="btn btn-primary">Update</button>
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
