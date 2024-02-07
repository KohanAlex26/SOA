package com.example.kafka.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="productName")
    private String productName;

    @Nullable
    @Column(name="completed")
    private boolean completed;

    public Order() {
    }

    public Order(long id, String productName) {
        this.id = id;
        this.productName = productName;
        this.completed = false;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public boolean completed() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
