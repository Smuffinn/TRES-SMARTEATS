package com.g4appdev.TES.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g4appdev.TES.entity.Payment;
import com.g4appdev.TES.service.PaymentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/getPayment")
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @PostMapping("/insertPayment")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.savePayment(payment);
        return new ResponseEntity<>(savedPayment, HttpStatus.CREATED);
    }

    @PutMapping("/postPayment")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymenti) {
        Optional<Payment> updatedPayment = paymentService.updatePayment(id, paymenti);
        return updatedPayment.map(payment -> new ResponseEntity<>(payment, HttpStatus.OK))
                             .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/deletePayment")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        String responseMessage = paymentService.deletePayment(id);
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }
}