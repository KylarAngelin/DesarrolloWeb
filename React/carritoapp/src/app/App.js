// import React, { Component } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
//
// import Navigation from './navigation'
// import Login from './login'
// import Products from './products'
// import Pedido from './pedido'
//
// class App extends Component{
//
//   render(){
//     return(
//        <BrowserRouter>
//          <React.Fragment>
//            <Route path="/" component={Login}/>
//            <Route path="/login" component={Login}/>
//            <Route path="/products" component={Products}/>
//          </React.Fragment>
//        </BrowserRouter>
//     )
//   }
// }
// export default App;

// import React from "react";
// import {render} from "react-dom";
// import { HashRouter, Switch, Route } from "react-router-dom";
//
// import Login from './login'
// import Products from './products'
//
// const App = () => (
//   <HashRouter> /{/* envolvemos nuestra aplicación en el Router  */}
//     <Switch> {/* también la envolvemos en el componente Switch */}
//       <Route path="/" component={Login} exact /> {/* y creamos nuestras rutas */}
//       <Route path="/login" component={Login} exact />
//       <Route path="/products" component={Products} exact />
//     </Switch>
//   </HashRouter>
// )
//
// render(<App />, document.getElementById("root"))
