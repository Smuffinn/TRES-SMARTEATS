package com.g4appdev.TES.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getOrder")
    public ResponseEntity<?> getAllOrders() {
        try {
            List<OrderEntity> orders = orderService.getAllOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve orders", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/postOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderEntity order) {
        try {
            if (order.getOrderId() == null) {
                return new ResponseEntity<>("Order ID must be provided", HttpStatus.BAD_REQUEST);
            }
            order.setOrderDate(new Date()); // Set the current date and time
            OrderEntity savedOrder = orderService.saveOrder(order);
            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/putOrder/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody OrderEntity order) {
        try {
            Optional<OrderEntity> updatedOrder = orderService.updateOrder(id, order);
            return updatedOrder.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                               .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteOrder/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            String responseMessage = orderService.deleteOrder(id);
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getOrder/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            Optional<OrderEntity> order = orderService.getOrderById(id);
            return order.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
