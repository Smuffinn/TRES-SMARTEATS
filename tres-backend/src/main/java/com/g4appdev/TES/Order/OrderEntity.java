package com.g4appdev.TES.Order;

import jakarta.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class OrderEntity {

    @Id
    private Long orderId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    private String orderTime;
    private float totalAmount;
    private String customerName;

    // Default constructor
    public OrderEntity() {
        super();
    }

    // Parameterized constructor
    public OrderEntity(Date orderDate, String orderTime, float totalAmount, String customerName) {
        this.orderDate = orderDate;
        this.orderTime = orderTime;
        this.totalAmount = totalAmount;
        this.customerName = customerName;
    }

    // Getters and setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    @PrePersist
    protected void onCreate() {
        if (orderTime == null) {
            orderTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
        }
    }
}
