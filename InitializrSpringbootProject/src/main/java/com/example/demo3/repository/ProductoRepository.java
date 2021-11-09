/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo3.repository;

/**
 *
 * @author MIGUEL
 */
import com.example.demo3.model.Producto;
//import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductoRepository extends MongoRepository<Producto, String> {

    /**
     *
     * @param name
     * @return
     */
    public Producto findByName(String name);

    public List<Producto> findByCategory(String category);

    public List<Producto> findByNameStartingWith(String name);

    public List<Producto> findByNameContaining(String name);

    public List<Producto> findByAvailability(boolean b);

    public List<Producto> findByPriceLessThan(int prince);

    //public List<String> getUniqueCategory();
}
