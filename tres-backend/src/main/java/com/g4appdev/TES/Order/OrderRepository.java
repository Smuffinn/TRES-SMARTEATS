package com.g4appdev.TES.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    
    @Query("SELECT oe FROM OrderEntity oe WHERE oe.orderId = :orderId")
    OrderEntity findOrderById(@Param("orderId") Long orderId);
}
