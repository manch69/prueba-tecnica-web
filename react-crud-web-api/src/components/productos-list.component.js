import React, { Component } from "react";
import ProductoDataService from "../services/producto.service";
import { Link } from "react-router-dom";

export default class ProductosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeSearchPrice = this.onChangeSearchPrice.bind(this);
    this.retrieveProductos = this.retrieveProductos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProducto = this.setActiveProducto.bind(this);
    this.removeAllProductos = this.removeAllProductos.bind(this);
    this.searchName = this.searchName.bind(this);
    this.searchPrice = this.searchPrice.bind(this);


    this.state = {
      productos: [],
      currentProducto: null,
      currentIndex: -1,
      searchName: "",
      searchPrice: 0
    };
  }

  componentDidMount() {
    this.retrieveProductos();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  onChangeSearchPrice(e) {
    const searchPrice = e.target.value;

    this.setState({
      searchPrice: searchPrice
    });
  }

  retrieveProductos() {
    ProductoDataService.getAll()
      .then(response => {
        this.setState({
          productos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProductos();
    this.setState({
      currentProducto: null,
      currentIndex: -1
    });
  }

  setActiveProducto(producto, index) {
    this.setState({
      currentProducto: producto,
      currentIndex: index
    });
  }

  removeAllProductos() {
    ProductoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentProducto: null,
      currentIndex: -1
    });

    ProductoDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          productos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchPrice() {
    this.setState({
      currentProducto: null,
      currentIndex: -1
    });

    ProductoDataService.findByPrice(this.state.searchPrice)
      .then(response => {
        this.setState({
          productos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchPrice, searchName, productos, currentProducto, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Search by Price"
              value={searchPrice}
              onChange={this.onChangeSearchPrice}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPrice}
              >
                Search
              </button>
            </div>
          </div>
          </div>
        
        <div className="col-md-6">
          <h4>Products List</h4>

          <ul className="list-group">
            {productos &&
              productos.map((producto, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProducto(producto, index)}
                  key={index}
                >
                  {producto.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProductos}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProducto ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProducto.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProducto.description}
              </div>
              
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentProducto.category}
              </div>
              
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentProducto.price}
              </div>
              
              <div>
                <label>
                  <strong>Stock:</strong>
                </label>{" "}
                {currentProducto.stock}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProducto.availability ? "Availability" : "Not availability"}
              </div>

              <Link
                to={"/productos/" + currentProducto.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Producto...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
