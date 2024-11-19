package com.g4appdev.TES.Order;

import jakarta.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private Integer orderId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "orderDate")
    private Date orderDate;

    @Column(name = "orderTime")
    private String orderTime;

    @Column(name = "totalAmount")
    private float totalAmount;

    @Column(name = "customerName")
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
    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
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
        if (orderDate == null) {
            orderDate = new Date(); // Set current date if not provided
        }
        if (orderTime == null) {
            orderTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
        }
    }
}
