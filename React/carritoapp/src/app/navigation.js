import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

class Navigation extends Component{

  render(){
    return(

      <div>
          {/*NAVIGATION*/}
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <a className="navbar-brand" href="#">Tienda Online</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link >
                      </li>
                      <li className="nav-item">
                        <Link to="/products" className="nav-link">Products</Link>
                      </li>

                    </ul>
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link">SignIn</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" >SignUp</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link">Logout</a>
                      </li>
                      <li>
                        <Link onClick={this.triggerShowOrder}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg><span>{this.props.counterCarrito}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
              </div>
            </nav>
            {/*NAVIGATION*/}
      </div>
    )
  }
}

export default Navigation;
