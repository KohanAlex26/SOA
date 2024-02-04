package com.example.rabbit.consumer;

import com.example.rabbit.dto.Contact;
import com.example.rabbit.model.Employee;
import com.example.rabbit.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQJsonConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQJsonConsumer.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @RabbitListener(queues = {"${rabbitmq.queue.json.name}"})
    public void consumeJsonMessage(Contact contact){
        LOGGER.info("convert message!!!!!!!");
        employeeRepository.save(new Employee("a","a","a"));
        LOGGER.info(String.format("Received JSON message -> %s", contact.toString()));
    }
}
