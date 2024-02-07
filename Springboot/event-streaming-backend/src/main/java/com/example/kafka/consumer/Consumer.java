package com.example.kafka.consumer;

import com.example.kafka.exception.ResourceNotFoundException;
import com.example.kafka.model.Order;
import com.example.kafka.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class Consumer {
    @Autowired
    private OrderRepository orderRepository;

    @KafkaListener(topics = "test_topic",groupId = "group_id")
    public ResponseEntity<Order> consumeMessage(String message){
        Order updatedOrder = orderRepository.findById(Long.parseLong(message)).orElseThrow(()->new ResourceNotFoundException("Product not exist with id: " + Long.parseLong(message)));
        updatedOrder.setCompleted(true);
        orderRepository.save(updatedOrder);

        System.out.println(message);
        return ResponseEntity.ok(updatedOrder);
    }
}
