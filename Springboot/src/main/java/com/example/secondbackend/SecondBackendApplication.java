package com.example.secondbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:second.properties")
public class SecondBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecondBackendApplication.class, args);
    }

}
