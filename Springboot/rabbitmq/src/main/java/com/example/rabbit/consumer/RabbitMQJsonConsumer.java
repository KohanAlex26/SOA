package com.example.rabbit.consumer;

import com.example.rabbit.model.Order;
import com.example.rabbit.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQJsonConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQJsonConsumer.class);

    @Autowired
    private OrderRepository orderRepository;

    @RabbitListener(queues = {"${rabbitmq.queue.json.name}"})
    public void consumeJsonMessage(Order order){
        orderRepository.save(order);
        LOGGER.info(String.format("Received JSON message -> %s", order));
    }
}
