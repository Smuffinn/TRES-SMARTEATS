package com.g4appdev.TES.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g4appdev.TES.entity.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
}
