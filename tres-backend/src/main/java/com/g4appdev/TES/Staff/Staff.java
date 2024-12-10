package com.g4appdev.TES.Staff;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.Date;

@Entity
public class Staff {
    public enum StaffRole {
        ADMIN, STAFF
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id") // Update column name to staff_id
    private int staffId;

    @NotBlank
    private String name;

    @Column(unique = true)
    @Email
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private StaffRole role;

    @Pattern(regexp = "^[0-9]{11}$")
    private String contactNumber;

    @Column(name = "schedule")
    private Date schedule;

    public Staff() {
    }

    public Staff(int id, String name, String role, String contactNumber, Date schedule) {
        this.staffId = id;
        this.name = name;
        this.role = StaffRole.valueOf(role.toUpperCase());
        this.contactNumber = contactNumber;
        this.schedule = schedule;
    }

    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public StaffRole getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = StaffRole.valueOf(role.toUpperCase());
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Date getSchedule() {
        return schedule;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
