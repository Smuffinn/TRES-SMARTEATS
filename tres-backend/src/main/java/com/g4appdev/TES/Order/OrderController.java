package com.g4appdev.TES.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from http://localhost:3000
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/getOrder")
    public ResponseEntity<?> getAllOrders() {
        try {
            List<OrderEntity> orders = orderService.getAllOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve orders", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/postOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderEntity order) {
        System.out.println("Received order details: " + order); // Log the received order details
        System.out.println("Order ID: " + order.getOrderId()); // Log the order ID
        System.out.println("Order date: " + order.getOrderDate()); // Log the order date
        System.out.println("Customer name: " + order.getCustomerName()); // Log the customer name
        System.out.println("Order time: " + order.getOrderTime()); // Log the order time
        System.out.println("Total amount: " + order.getTotalAmount()); // Log the total amount
        try {
            OrderEntity savedOrder = orderService.saveOrder(order);
            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/putOrder/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Integer id, @RequestBody OrderEntity order) {
        try {
            Optional<OrderEntity> updatedOrder = orderService.updateOrder(id, order);
            return updatedOrder.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                               .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteOrder/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer id) {
        try {
            String responseMessage = orderService.deleteOrder(id);
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getOrder/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer id) {
        try {
            Optional<OrderEntity> order = orderService.getOrderById(id);
            return order.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
