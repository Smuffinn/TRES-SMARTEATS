package com.g4appdev.TES.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.OrderEntity;
import com.g4appdev.TES.repository.OrderRepository;

import java.util.List;
import java.util.Optional;
@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Create or Update an Order
    public OrderEntity saveOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    // Read an Order by ID
    public Optional<OrderEntity> getOrderById(long orderId) {
        return orderRepository.findById(orderId);
    }

    // Read all Orders
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    // Update an existing Order
    public OrderEntity updateOrder(long orderId, OrderEntity orderDetails) {
        OrderEntity existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + orderId));

        // Update fields
        existingOrder.setOrderDate(orderDetails.getOrderDate());
        existingOrder.setOrderTime(orderDetails.getOrderTime());
        existingOrder.setTotalAmount(orderDetails.getTotalAmount());

        return orderRepository.save(existingOrder);
    }

    // Delete an Order by ID
    public void deleteOrder(long orderId) {
        orderRepository.deleteById(orderId);
    }
}
