package com.g4appdev.TES.Admin;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admin_id;

    private String username;
    private String password;
    private String role;
    private String email;

    // No-argument constructor (this is required by Spring and JPA)
    public AdminEntity() {
        // Spring will use this to instantiate the entity
    }

    // Constructor with all fields
    public AdminEntity(int admin_id, String username, String password, String role, String email) {
        this.admin_id = admin_id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
    }

    // Getters and setters
    public int getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(int admin_id) {
        this.admin_id = admin_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
