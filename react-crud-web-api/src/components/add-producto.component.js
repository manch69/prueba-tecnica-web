import React, { Component } from "react";
import ProductoDataService from "../services/producto.service";

export default class AddProducto extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.saveProducto = this.saveProducto.bind(this);
    this.newProducto = this.newProducto.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      availability: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onChangeStock(e) {
    this.setState({
      stock: e.target.value
    });
  }

  saveProducto() {
    var data = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      price: this.state.price,
      stock: this.state.stock,
    };

    ProductoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          category: response.data.category,
          price: response.data.price,
          stock: response.data.stock,
          availability: response.data.availability,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProducto() {
    this.setState({
      id: null,
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      availability: false,


      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProducto}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                required
                value={this.state.stock}
                onChange={this.onChangeStock}
                name="stock"
              />
            </div>
            <button onClick={this.saveProducto} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
