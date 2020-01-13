import React, { Component, useState } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
//import { HashRouter, Switch, Route } from "react-router-dom";
import Popup from 'reactjs-popup';

// subcomponents
import Pedido from './pedido'



class Products extends Component{
  constructor(props){
    super();
    this.state = {
      total:0,
      items:'0',
      pedido:[],
      products:[],
      productsVisible:[],
    };

    this.searchProducts = this.searchProducts.bind(this)
    this.updateCdisponible = this.updateCdisponible.bind(this)
    this.counterCarrito = this.counterCarrito.bind(this)
    this.total = this.total.bind(this)
    this.pagar = this.pagar.bind(this)
  }


  componentDidMount(){
    this.fetchProducts();
  };

  pagar(){
    fetch('/api/pay-order',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.pedido),

    })
      .then(res=>{
        if (res.status === 200) {
          alert("Su pago fue procesado exitosamente")
          location.reload();

        } else {
            const error = new Error(res.error);
            throw error;
          }
      })
      .catch(err => console.log(err));
  }

  counterCarrito(){
   let cItems =  this.state.pedido.length + 1;
    this.setState({items:cItems})
    console.log(this.state)
  };

  fetchProducts() {
    fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      this.setState({products:data});
      let dataP = this.state.products
      this.setState({productsVisible: dataP});
      console.log(this.state)
    })
    .catch(err => console.log(err))
  };

  searchProducts(e){
    console.log(e.target.value)
    let filtro =  e.target.value.toLowerCase();
    let itemMatch = []
    itemMatch = this.state.products.filter(p => p.nombre.toLowerCase().indexOf(filtro.toLowerCase()) !== -1);
    this.setState({productsVisible: itemMatch})
    console.log(this.state)
  };

  updateCdisponible(e){
    console.log(e.target.value, e.target.name)
  };

  addOrder(name, precio, cdisp, value){
    let subT = precio * value
    console.log(name, precio, cdisp, value)
    if (value <=0 ){
      alert('Seleccione una cantidad válida');

    } else if (cdisp < value ){
      alert('Máxima existencia es: '+ cdisp);
    }else {
      let cdispf = cdisp-value
      let newPedido =
        {
          nombre: name,
          precio: precio,
          cdisponible: cdispf,
          cantidad: value,
          subTotal: subT

        }
      this.setState({
        pedido: [...this.state.pedido, newPedido]
      });
      // pero React no actualiza `this.state.pedido` hasta que el componente se vuelve a renderizar.
      // this.setState((state) =>{
      //   return {pedido: newPedido}
      // })
      // Si lees `this.state.pedido` ahora, aún sería vacio
      // Pero cuando React vuelva a renderizar el componente, estara updated.
      this.counterCarrito();
    }
    console.log(this.state.pedido)
  };

  total (){
    let total = 0
    let items = this.state.pedido;
    for(let subTo of items){
      total += subTo.precio * subTo.cantidad;
    }
    console.log(total)
    return total;

  };

  logout(){
        sessionStorage.removeItem('token');
        location.reload();
    };

  render(){
    if(!sessionStorage.getItem('token')){
          return <Redirect to="/" />
        }
    return(
      <React.Fragment>

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
                    <Link to="/" className="nav-link">SignIn</Link>
                  </li>
                  <li className="nav-item">
                    <a onClick={this.logout} style={{cursor:'pointer'}} className="nav-link">Logout</a>
                  </li>
                  <li>
                    <a onClick={this.total} className="nav-link" style={{cursor:'pointer'}}>
                      <span>{this.state.items+" "}</span>
                      <Popup
                        trigger={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>}
                        modal
                        closeOnDocumentClick
                        >
                        <span>
                          <div className="row">
                            <div className="col-lg-12 p-4">
                              <div className="card bg-light mb-3">
                                <h3 className="card-header">Detalle de pedido</h3>
                                  <div className="row card-subtitle text-muted p-4 justify-content-between">
                                    <span>Cantidad</span>
                                    <span>Descripcion</span>
                                    <span>Subtotal</span>
                                  </div>

                                    <div className="card-body">
                                    {
                                      this.state.pedido.map((items, i) => {
                                        let keyValue = i+1
                                        return(
                                          <div key={keyValue} className="row card-subtitle text-muted p-1 justify-content-between">
                                            <span>{items.cantidad}</span>
                                            <span>{items.nombre}</span>
                                            <span>$  {items.subTotal}</span>
                                          </div>
                                        )
                                      })
                                    }
                                    </div>

                                  <div className="row p-4 d-flex justify-content-between">
                                      <p className="card-subtitle">Total Compra </p>
                                      <p className="card-subtitle"> $  { this.total() } </p>
                                  </div>
                                  <div className="row p-4 d-flex align-content-right">
                                      <button onClick={this.pagar} type="button" className="btn btn-warning" >Pagar</button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </Popup>
                    </a>
                  </li>
                  <li>

                  </li>
                </ul>
              </div>
          </div>
        </nav>
        {/*NAVIGATION*/}

        <div className="col p-2">
          <div className="row p-2">
            <div className="card-body">
              <h5>¿Qué estás buscando?</h5>
              <div className="input-group">
                <input onChange={this.searchProducts} name="search" id="search" type="text" className="form-control" placeholder="Buscar producto"/>
              </div>
            </div>
          </div>

          <div className="row">
            {
              this.state.productsVisible.map(product => {
                return(

                  <div className="col-lg-4" key={product._id}>
                        <div className="card bg-light mb-3">
                            <h3 className="card-header">{product.nombre}</h3>

                          <div className="card-body">

                          <Popup
                          trigger={<p className="nav-link" style={{cursor:'pointer'}}>Mas Información</p>}
                          modal
                          closeOnDocumentClick
                          >
                            <span>
                              <div className="row">
                                <div className="col-lg-12 p-4">
                                  <div className="card bg-light mb-3">
                                    <h3 className="card-header">Detalle de producto</h3>
                                      <div className="row p-4 d-flex justify-content-between">
                                        <img style={{"height": "100px", "width": "25%", "display": "block"}} src={"/img/"+product.nombre+".jpg"}  alt={product.nombre}/>
                                        <p className="card-subtitle">{product.nombre}</p>
                                        <p className="card-subtitle"> $ {product.precio}  </p>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                          </Popup>

                            <img style={{"height": "200px", "width": "100%", "display": "block"}} src={"/img/"+product.nombre+".jpg"}  alt={product.nombre}/>
                          </div>
                          <div className="card-body">
                            <div className="row p-2 d-flex justify-content-between">
                              <span className="badge badge-pill badge-primary p-1.5">Precio</span>
                              <span className="badge badge-pill badge-info p-1.5">{product.precio} $ </span>
                            </div>
                            <div className="row p-2 d-flex justify-content-between">
                              <span className="badge badge-pill badge-primary p-1.5">Cantidad disponible</span>
                              <span className="badge badge-pill badge-info p-1.5">{product.cdisponible} U.</span>
                            </div>
                            <div className="row p-2 d-flex justify-content-between">
                              <input onChange={this.updateCdisponible} id={product._id} name={product.nombre} className="form-control form-control-sm" style= {{"width":"50%"}}  type="number"  min="1" max="1000" step="1"/>
                              <button onClick={ () => { let value = document.getElementById(product._id).value; this.addOrder(product.nombre, product.precio, product.cdisponible, value) } } type="button" className="btn btn-warning" >Añadir</button>
                            </div>
                          </div>
                        </div>
                  </div>

                )
              })
            }
          </div>

        </div>
      </React.Fragment>

    )
  }
}

export default Products;
