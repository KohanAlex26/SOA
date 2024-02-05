package com.example.springbootbackend.controller;

import com.example.springbootbackend.kafka.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class TestController {

    private final Producer producer;

    @Autowired
    public TestController(Producer producer) {
        this.producer = producer;
    }

    @PostMapping("/kafka")
    public ResponseEntity<String> messageToTopic(@RequestParam("message") String message){
        this.producer.sendMessage(message);
        return ResponseEntity.ok("Message sent to Kafka ...");

    }
}
