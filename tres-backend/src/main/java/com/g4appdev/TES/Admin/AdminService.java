package com.g4appdev.TES.Admin;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
  
    @Autowired
    private AdminRepository userRepository;

    // Create a user
    public AdminEntity postAdminRecord(AdminEntity user) {
        return userRepository.save(user);
    }

    // Read all users
    public List<AdminEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user details
    public AdminEntity putUserDetails(int admin_id, AdminEntity newUserDetails) {
        AdminEntity user = userRepository.findById(admin_id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));


        user.setFullname(newUserDetails.getFullname());
        user.setUsername(newUserDetails.getUsername());
        user.setEmail(newUserDetails.getEmail());
        user.setPassword(newUserDetails.getPassword());
        user.setRole(newUserDetails.getRole());
        return userRepository.save(user);
    }

    // Delete user
    public String deleteUserDetails(int admin_id) {
        if (userRepository.existsById(admin_id)) {
            userRepository.deleteById(admin_id);
            return "User successfully deleted";
        } else {
            return "User with ID " + admin_id + " not found";
        }
    }

    // Login method
    public AdminEntity login(String email, String password) {
        AdminEntity user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user; // Return the user entity if login is successful
        }
        throw new IllegalArgumentException("Invalid email or password");
    }
}