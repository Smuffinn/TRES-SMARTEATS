package com.g4appdev.TES.Order;

import jakarta.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "order_entity")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private Integer orderId;

    @Column(name = "order_date", columnDefinition = "DATE DEFAULT (CURRENT_DATE)", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Column(name = "order_time", columnDefinition = "VARCHAR(8) DEFAULT (TIME_FORMAT(CURRENT_TIME, '%H:%i:%s'))", nullable = false)
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
        Date now = new Date();
        if (orderDate == null) {
            orderDate = now;
        }
        if (orderTime == null || orderTime.isEmpty()) {
            orderTime = new SimpleDateFormat("HH:mm:ss").format(now);
        }
    }
}
