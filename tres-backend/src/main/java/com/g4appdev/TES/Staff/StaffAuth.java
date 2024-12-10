package com.g4appdev.TES.Staff;

import com.g4appdev.TES.AuthHandler.AuthenticationRequest;
import com.g4appdev.TES.Staff.Staff;
import com.g4appdev.TES.AuthHandler.JwtUtil;
import com.g4appdev.TES.AuthHandler.CustomUserDetailsService;
import com.g4appdev.TES.Security.AuthenticationResponse;
import com.g4appdev.TES.Security.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/staffauth")  // Add this line if missing
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin as needed
public class StaffAuth {
    private static final Logger logger = LoggerFactory.getLogger(StaffAuth.class);

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
            logger.debug("Attempting authentication for user: {}", authenticationRequest.getEmail());
            
            // Authenticate using email and password
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(), 
                    authenticationRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Load user details using email
            final UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());
                
            if (userDetails == null) {
                logger.error("User details could not be loaded for email: {}", authenticationRequest.getEmail());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to load user details"));
            }

            final String jwt = jwtUtil.generateToken(userDetails);
            
            if (jwt == null || jwt.isEmpty()) {
                logger.error("JWT token generation failed for user: {}", authenticationRequest.getEmail());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to generate authentication token"));
            }

            Staff staff = staffService.getStaffByEmail(authenticationRequest.getEmail());
            AuthenticationResponse response = new AuthenticationResponse(jwt, staff);
            
            logger.debug("Authentication successful for user: {}", authenticationRequest.getEmail());
            return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed - Bad credentials for user: {}", authenticationRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid email or password"));
        } catch (Exception e) {
            logger.error("Authentication failed with exception", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Authentication failed: " + e.getMessage()));
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
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")  // Add this annotation
    public ResponseEntity<?> getAllStaff() {
        try {
            List<Staff> staffList = staffService.getAllStaff();
            return ResponseEntity.ok(new SuccessResponse("Staff list retrieved successfully", staffList));
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