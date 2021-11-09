import React, { Component } from "react";
import ProductoDataService from "../services/producto.service";

export default class Producto extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.getProducto = this.getProducto.bind(this);
    this.updateAvailability = this.updateAvailability.bind(this);
    this.updateProducto = this.updateProducto.bind(this);
    this.deleteProducto = this.deleteProducto.bind(this);

    this.state = {
      currentProducto: {
        id: null,
        name: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        availability: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProducto(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProducto: {
          ...prevState.currentProducto,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        description: description
      }
    }));
  }
  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        category: category
      }
    }));
  }
  onChangePrice(e) {
    const price = e.target.value;

    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        price: price
      }
    }));
  }
  onChangeStock(e) {
    const stock = e.target.value;

    this.setState(prevState => ({
      currentProducto: {
        ...prevState.currentProducto,
        stock: stock
      }
    }));
  }

  getProducto(id) {
    ProductoDataService.get(id)
      .then(response => {
        this.setState({
          currentProducto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAvailability(status) {
    var data = {
      id: this.state.currentProducto.id,
      name: this.state.currentProducto.name,
      description: this.state.currentProducto.description,
      category: this.state.currentProducto.category,
      price: this.state.currentProducto.price,
      stock: this.state.currentProducto.stock,
      availability: status
    };

    ProductoDataService.update(this.state.currentProducto.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProducto: {
            ...prevState.currentProducto,
            availability: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProducto() {
    ProductoDataService.update(
      this.state.currentProducto.id,
      this.state.currentProducto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The producto was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProducto() {
    ProductoDataService.delete(this.state.currentProducto.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/productos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProducto } = this.state;

    return (
      <div>
        {currentProducto ? (
          <div className="edit-form">
            <h4>Producto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProducto.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProducto.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentProducto.category}
                  onChange={this.onChangeCategory}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentProducto.price}
                  onChange={this.onChangePrice}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  value={currentProducto.stock}
                  onChange={this.onChangeStock}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentProducto.availability ? "Availability" : "Not Availability"}
              </div>
            </form>

            {currentProducto.availability ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAvailability(false)}
              >
                Not Availability
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAvailability(true)}
              >
                Availability
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProducto}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProducto}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Producto...</p>
          </div>
        )}
      </div>
    );
  }
}
