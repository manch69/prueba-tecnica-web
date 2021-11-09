package com.example.demo3.controller;

import com.example.demo3.model.Producto;
import com.example.demo3.repository.ProductoRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    ProductoRepository productoRepository;

    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> getAllProductos(@RequestParam(required = false) String name, @RequestParam(required = false) Integer price) {
        try {
            List<Producto> productos = new ArrayList<>();

            if (price != null){
                productoRepository.findByPriceLessThan(price).forEach(productos::add);
            }else if (name == null) {
                productoRepository.findAll().forEach(productos::add);

            } else {
                productoRepository.findByNameContaining(name).forEach(productos::add);
            }
            
            
            if (productos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(productos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable("id") String id) {
        Optional<Producto> productoData = productoRepository.findById(id);

        if (productoData.isPresent()) {
            return new ResponseEntity<>(productoData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/productos")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        try {
            Producto _producto = productoRepository.save(new Producto(producto.getName(), producto.getDescription(), producto.getCategory(), producto.getPrice(), producto.getAvailability(), producto.getStock(), producto.getPhoto()));

            //Producto(producto.getName(), producto.getDescription(), false));
            return new ResponseEntity<>(_producto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable("id") String id, @RequestBody Producto producto) {
        Optional<Producto> productoData = productoRepository.findById(id);

        if (productoData.isPresent()) {
            Producto _producto = productoData.get();
            _producto.setName(producto.getName());
            _producto.setDescription(producto.getDescription());
            _producto.setCategory(producto.getCategory());
            _producto.setPrice(producto.getPrice());
            _producto.setStock(producto.getStock());
            _producto.setAvailability(producto.getAvailability());

            //TODOOOOOOOO
            return new ResponseEntity<>(productoRepository.save(_producto), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/producto/{id}")
    public ResponseEntity<HttpStatus> deleteProducto(@PathVariable("id") String id) {
        try {
            productoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/productos")
    public ResponseEntity<HttpStatus> deleteAllProductos() {
        try {
            productoRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/productos/availability")
    public ResponseEntity<List<Producto>> findByAvailability() {
        try {
            List<Producto> tutorials = productoRepository.findByAvailability(true);

            if (tutorials.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tutorials, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
