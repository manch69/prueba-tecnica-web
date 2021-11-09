/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo3.model;

/**
 *
 * @author MIGUEL
 */
import java.util.Objects;
import org.springframework.data.annotation.Id;

public class Producto {

    @Id
    public String id;

    public String name;
    public String description;
    public String category;
    public Integer price;
    public Boolean availability;
    public Integer stock;
    public String photo;

    
    public Producto() {
    }

    public Producto(String name, String description, String category, Integer price, Boolean availability, Integer stock, String photo) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.availability = availability;
        this.stock = stock;
        this.photo = photo;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Producto other = (Producto) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.category, other.category)) {
            return false;
        }
        if (!Objects.equals(this.photo, other.photo)) {
            return false;
        }
        if (!Objects.equals(this.price, other.price)) {
            return false;
        }
        if (!Objects.equals(this.availability, other.availability)) {
            return false;
        }
        return Objects.equals(this.stock, other.stock);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    

    @Override
    public String toString() {
        return String.format(
                "Producto[id=%s, name='%s', price='%s']",
                id, name, price);
    }

}
