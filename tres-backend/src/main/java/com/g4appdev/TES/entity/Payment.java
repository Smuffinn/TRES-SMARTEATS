package com.g4appdev.TES.entity;

import jakarta.persistence.*;

import java.util.Date;
//import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;
    
    private String paymentMethod;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDate;
    private int amount;

    
    public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	private String status;

   

    // Getters and Setters

    public Long getPaymentId() {
        return paymentId;
    }
	
	    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

   

    @Override
    public String toString() {
        return "Payment{" +
                "paymentId=" + paymentId +   
                ", paymentMethod='" + paymentMethod + '\'' +
                ", paymentDate=" + paymentDate +
                ", amount="+amount+'\''+
                ", status='" + status + '\'' +
                '}';
    }
}