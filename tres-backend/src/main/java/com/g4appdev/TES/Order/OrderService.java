package com.g4appdev.TES.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderEntity saveOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    public Optional<OrderEntity> updateOrder(Integer id, OrderEntity order) {
        return orderRepository.findById(id).map(existingOrder -> {
            existingOrder.setOrderDate(order.getOrderDate());
            existingOrder.setOrderTime(order.getOrderTime());
            existingOrder.setTotalAmount(order.getTotalAmount());
            existingOrder.setCustomerName(order.getCustomerName());
            return orderRepository.save(existingOrder);
        });
    }

    public String deleteOrder(Integer id) {
        orderRepository.deleteById(id);
        return "Order deleted successfully";
    }

    public Optional<OrderEntity> getOrderById(Integer id) {
        return Optional.ofNullable(orderRepository.findOrderById(id));
    }
}
