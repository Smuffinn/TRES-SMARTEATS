package com.g4appdev.TES.Staff;

import com.g4appdev.TES.AuthHandler.AuthenticationRequest;
import com.g4appdev.TES.AuthHandler.JwtUtil;
import com.g4appdev.TES.AuthHandler.CustomUserDetailsService;
import com.g4appdev.TES.Security.AuthenticationResponse;
import com.g4appdev.TES.Security.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/staffauth")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin as needed
public class StaffAuth {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private StaffService staffService;


    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(), 
                    authenticationRequest.getPassword()
                )
            );

            final UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Invalid email or password"));
        }
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerStaff(@Valid @RequestBody Staff staff) {
        try {
            Staff registeredStaff = staffService.registerStaff(staff);
            return ResponseEntity.ok(new SuccessResponse("Staff registered successfully", registeredStaff));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping(value = "/ping", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Pong");
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllStaff() {
        try {
            List<Staff> staffList = staffService.getAllStaff();
            return ResponseEntity.ok(staffList);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ErrorResponse("Failed to retrieve staff list: " + e.getMessage()));
        }
    }
}

class SuccessResponse {
    private String message;
    private Object data;

    public SuccessResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}