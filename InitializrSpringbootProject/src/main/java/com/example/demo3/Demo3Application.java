package com.example.demo3;

import com.example.demo3.model.Producto;
import com.example.demo3.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Demo3Application implements CommandLineRunner {

    @Autowired
    private ProductoRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(Demo3Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        repository.deleteAll();

        // save a couple of customers
        for (int i = 0; i < 10; i++) {
            repository.save(new Producto("Balon Baloncesto " + i, "Balon para baloncesto", "Balon", 12000+i*1000, true, 15, ""));
            //public Producto(String name, String description, String category, Integer price, Boolean availability, Integer stock, String photo) 
            repository.save(new Producto("Balon Futbol " + i, "Balon para Futbol", "Balon", 12000+i*1500, true, 20, ""));

        }

        // fetch all customers
        System.out.println("Productos found with findAll():");
        System.out.println("-------------------------------");
        repository.findAll().forEach(producto -> {
            System.out.println(producto);
        });
        System.out.println();

        // fetch an individual customer
        System.out.println("Productos found with findByName('Alice'):");
        System.out.println("--------------------------------");
        System.out.println(repository.findByName("Balon Baloncesto"));

        System.out.println("Customers found with findByLastName('Smith'):");
        System.out.println("--------------------------------");
        repository.findByCategory("Balon").forEach(producto -> {
            System.out.println(producto);
        });

    }
    /* */
}
