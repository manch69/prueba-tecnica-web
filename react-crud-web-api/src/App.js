import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProducto from "./components/add-producto.component";
import Producto from "./components/producto.component";
import ProductosList from "./components/productos-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/productos"} className="navbar-brand">
            Manch
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/productos"} className="nav-link">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/productos"]} component={ProductosList} />
            <Route exact path="/add" component={AddProducto} />
            <Route path="/productos/:id" component={Producto} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
