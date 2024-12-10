package com.g4appdev.TES.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    private static final Logger logger = LoggerFactory.getLogger(StaffService.class);

    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;

    public StaffService(StaffRepository staffRepository, PasswordEncoder passwordEncoder) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Staff registerStaff(Staff staff) {
        try {
            if (!StringUtils.hasText(staff.getEmail()) || !StringUtils.hasText(staff.getPassword())) {
                throw new IllegalArgumentException("Email and password are required");
            }

            // Check if email already exists
            if (staffRepository.existsByEmail(staff.getEmail())) {
                throw new IllegalStateException("Email already registered");
            }

            // Validate contact number
            if (!staff.getContactNumber().matches("^[0-9]{11}$")) {
                throw new IllegalArgumentException("Invalid contact number format");
            }

            // Encode password
            staff.setPassword(passwordEncoder.encode(staff.getPassword()));
            
            // Set default role if empty
            if (!StringUtils.hasText(staff.getRole().toString())) {
                staff.setRole("STAFF");
            }

            // Validate role
            if (!staff.getRole().toString().equals("ADMIN") && 
                !staff.getRole().toString().equals("STAFF")) {
                throw new IllegalArgumentException("Invalid role. Must be either ADMIN or STAFF");
            }

            Staff savedStaff = staffRepository.save(staff);
            logger.info("Staff registered successfully: {}", savedStaff.getEmail());
            return savedStaff;
        } catch (Exception e) {
            logger.error("Registration failed: {}", e.getMessage());
            throw e;
        }
    }

    public Staff getStaffByEmail(String email) {
        Optional<Staff> staff = Optional.ofNullable(staffRepository.findByEmail(email));
        if (staff.isPresent()) {
            return staff.get();
        } else {
            logger.error("Staff not found with email: {}", email);
            throw new RuntimeException("Staff not found with email: " + email);
        }
    }

    public List<Staff> getAllStaff() {
        List<Staff> staffList = staffRepository.findAll();
        logger.info("Retrieved all staff members");
        return staffList;
    }

    public void deleteStaff(int staffId) {
        if (staffRepository.existsById(staffId)) {
            staffRepository.deleteById(staffId);
            logger.info("Staff deleted with ID: {}", staffId);
        } else {
            logger.error("Staff not found with ID: {}", staffId);
            throw new RuntimeException("Staff not found with ID: " + staffId);
        }
    }

    public Staff updateStaff(Staff staff) {
        if (staffRepository.existsById(staff.getStaffId())) {
            Staff updatedStaff = staffRepository.save(staff);
            logger.info("Staff updated successfully: {}", updatedStaff.getEmail());
            return updatedStaff;
        } else {
            logger.error("Staff not found with ID: {}", staff.getStaffId());
            throw new RuntimeException("Staff not found with ID: " + staff.getStaffId());
        }
    }
}