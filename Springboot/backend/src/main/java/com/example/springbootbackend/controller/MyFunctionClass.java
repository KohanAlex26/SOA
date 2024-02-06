package com.example.springbootbackend.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.function.Function;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class MyFunctionClass {

//    @Bean
    @GetMapping("/function/{price}")
    public ResponseEntity<Long> function(@PathVariable long price) {
        return ResponseEntity.ok(price+10);
    }
}
