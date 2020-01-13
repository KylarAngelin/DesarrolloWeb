
import React from "react";
import {render} from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";

import Login from './login'
import Products from './products'

const App = () => (
  <HashRouter> /{/* envolvemos nuestra aplicación en el Router  */}
    <Switch> {/* también la envolvemos en el componente Switch */}
      <Route path="/" component={Login} exact /> {/* y creamos nuestras rutas */}
      <Route path="/login" component={Login} exact />
      <Route path="/products" component={Products} exact />
    </Switch>
  </HashRouter>
)

render(<App />, document.getElementById("root"))
