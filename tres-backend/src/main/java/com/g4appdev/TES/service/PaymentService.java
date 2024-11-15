package com.g4appdev.TES.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.Payment;
import com.g4appdev.TES.repository.PaymentRepo;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Optional<Payment> updatePayment(Long id, Payment payment) {
        if (paymentRepository.existsById(id)) {
            payment.setPaymentId(id); // Ensure the id is set before updating
            return Optional.of(paymentRepository.save(payment));
        }
        return Optional.empty();
    }

    public String deletePayment(Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return "Payment record successfully deleted";
        }
        return "Payment record not found";
    }
}
