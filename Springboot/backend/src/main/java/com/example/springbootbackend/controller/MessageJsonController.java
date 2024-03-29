package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Order;
import com.example.springbootbackend.publisher.RabbitMQJsonProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class MessageJsonController {

    private RabbitMQJsonProducer jsonProducer;

    public MessageJsonController(RabbitMQJsonProducer jsonProducer){
        this.jsonProducer = jsonProducer;
    }

    @PostMapping("/publish")
    public ResponseEntity<String> sendJsonMessage(@RequestBody Order order){
        jsonProducer.sendJsonMessage(order);
        return ResponseEntity.ok("Json message sent to RabbitMQ ...");
    }
}
