import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import Navigation from './navigation'


class Pedido extends Component{

  render(){
    return(
      <React.Fragment>
        <Navigation/> <br/> <br/> <br/>

          <div className="row">
          <div className="col-lg-4 p-5">
                <div className="card bg-light mb-3">
                    <h3 className="card-header">Detalle de pedido{this.props.orders}</h3>

                  <div className="card-body">
                    <div className="row p-2 d-flex justify-content-between">
                      <span className="badge badge-pill badge-info p-1.5"> $ </span>
                    </div>
                    <div className="row p-2 d-flex justify-content-between">
                      <span className="badge badge-pill badge-info p-1.5"> Unidades</span>
                    </div>
                    <div className="row p-2 d-flex justify-content-between">
                      <button type="button" className="btn btn-warning" >Pagar</button>
                    </div>
                  </div>
                </div>
          </div>
          </div>


      </React.Fragment>
    );
  }
}

export default Pedido;
