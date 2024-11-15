package com.g4appdev.TES.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g4appdev.TES.entity.OrderEntity;
import com.g4appdev.TES.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Create or Update an Order
    @PostMapping
    public ResponseEntity<OrderEntity> createOrUpdateOrder(@RequestBody OrderEntity order) {
        OrderEntity savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Get an Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable("id") long orderId) {
        Optional<OrderEntity> order = orderService.getOrderById(orderId);
        return order.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all Orders
    @GetMapping
    public ResponseEntity<List<OrderEntity>> getAllOrders() {
        List<OrderEntity> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // Update an existing Order
    @PutMapping("/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable("id") long orderId, @RequestBody OrderEntity orderDetails) {
        OrderEntity updatedOrder = orderService.updateOrder(orderId, orderDetails);
        return ResponseEntity.ok(updatedOrder);
    }

    // Delete an Order by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
