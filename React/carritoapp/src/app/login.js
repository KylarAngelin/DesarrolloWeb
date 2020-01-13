import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Redirect } from 'react-router-dom'

class Login extends Component{

  constructor(){
    super();
      this.state = {
        email:'',
        password:'',
        redirect: false
      };
      this.checkLogin = this.checkLogin.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  checkSession(){
      return sessionStorage.getItem('token');
  }

  checkLogin(e){
    console.log(this.state);
    fetch('/api/signin',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),

    })
      .then(res=>{
        if (res.status === 200) {
            sessionStorage.setItem('token', res.token);
            location.reload();
        } else {
            const error = (res.status);
            throw error;
          }
      })
      .catch(error => { console.log(error)
        if(error == "401"){
          alert("Wrong Password")
        }else{
          alert("Usuario Inexistente")
        }
      });
    e.preventDefault();
  }



  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  render(){
    if (this.checkSession()){
          return <Redirect to='/products'/>
      }
    return(
      <div>
        {/*Login*/}
        <div className="row p-4">
         <div className="col-md-4 mx-auto">
             <div className="card">
                <div className="card-header">
                    SignIn
                </div>
                  <div className="card-body">
                     <form  >
                         <div className="form-group">
                          <input type="text" name="email" onChange={this.handleChange} id="email"  className="form-control" placeholder="Usuario" required aria-required="true" />
                         </div>
                         <div className="form-group">
                          <input type="password" name="password" onChange={this.handleChange} id="password"  className="form-control" placeholder="Contraseña" required aria-required="true" />
                         </div>
                          <button onClick={ this.checkLogin } className="btn btn-primary btn-block" type="submit" >
                            SignIn
                          </button>
                     </form>
                  </div>
             </div>
         </div>
        </div>
        {/*Login*/}
      </div>
    )
  }
}

export default Login;
