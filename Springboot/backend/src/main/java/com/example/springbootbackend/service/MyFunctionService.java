package com.example.springbootbackend.service;

import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.function.Function;

//@CrossOrigin
//@RestController
//@RequestMapping("/api/v1")
@Service
public class MyFunctionService {

//    @Bean
//    @GetMapping("/function/{price}")
//    public ResponseEntity<Long> function(@PathVariable long price) {
//        return ResponseEntity.ok(price+10);
//    }

    public ResponseEntity<Long> function(long price){
        return ResponseEntity.ok(price+10);
    }
}
