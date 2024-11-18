package com.g4appdev.TES.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    // Find orders by Order_Date
    List<OrderEntity> findByOrderDate(String orderDate);

    // Find orders by Order_Time
    List<OrderEntity> findByOrderTime(String orderTime);

    // Find orders by Total_Amount greater than a specified amount
    List<OrderEntity> findByTotalAmountGreaterThan(float amount);

    // Find orders by Order_Date and Order_Time
    List<OrderEntity> findByOrderDateAndOrderTime(String orderDate, String orderTime);
}
