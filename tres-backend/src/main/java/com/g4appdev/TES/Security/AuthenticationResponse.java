package com.g4appdev.TES.Security;

import com.g4appdev.TES.Staff.Staff; // Ensure that the Staff class is in the correct package

public class AuthenticationResponse {
    private String token;
    private Staff staff;

    public AuthenticationResponse(String token, Staff staff) {
        this.token = token;
        this.staff = staff;
    }

    // Add getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }
}