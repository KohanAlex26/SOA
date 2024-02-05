package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//188.24.84.129
//@CrossOrigin(origins = "http://192.168.100.27:3000")
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //get all users
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // create user rest api
    @PostMapping("/users")
    public User createUser(@RequestBody User user)
    {
        return userRepository.save(user);
    }

    // build get user by id REST API
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        User user = userRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not exist with id" + id));
        return ResponseEntity.ok(user);
    }

    // build delete user REST API
    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id){
        User user = userRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not exist with id" + id));

        userRepository.delete(user);

        return ResponseEntity.ok(user);
    }
}
