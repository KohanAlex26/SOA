package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Product;
import com.example.springbootbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//188.24.84.129
//@CrossOrigin(origins = "http://192.168.100.27:3000")
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    //get all products
    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // create product rest api
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product)
    {
        return productRepository.save(product);
    }

    // build get product by id REST API
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id){
        Product product=productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Product not exist with id" + id));
        return ResponseEntity.ok(product);
    }

    //build update product REST API
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product productDetails){
        Product updateProduct=productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Product not exist with id" + id));

        updateProduct.setPrice(productDetails.getPrice());
        updateProduct.setName(productDetails.getName());

        productRepository.save(updateProduct);

        return ResponseEntity.ok(updateProduct);
    }

    // build delete product REST API
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable long id){
        Product product=productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Product not exist with id" + id));

        productRepository.delete(product);

        return ResponseEntity.ok(product);
    }

    @GetMapping("hello2")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello2");
    }
}
