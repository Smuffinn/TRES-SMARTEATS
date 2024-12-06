package com.g4appdev.TES.Admin;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// import com.g4appdev.TES.JWT.JwtTokenUtil;

@RestController
@RequestMapping("/tes/admin")
public class AdminController {

    @Autowired
    private AdminService userService;
    
    @Autowired
    // private JwtTokenUtil jwtTokenUtil;  // Inject JwtTokenUtil
    
    @GetMapping("/print")
    public String print() {
        return "Hello, Smart Eats!";
    }

    // Create of CRUD
    @PostMapping("/postAdminRecord")
    public AdminEntity postAdminRecord(@RequestBody AdminEntity user) {
        return userService.postAdminRecord(user);
    }

    // Read of CRUD
    @GetMapping("/getAllUsers")
    public List<AdminEntity> getAllUsers() {
        List<AdminEntity> users = userService.getAllUsers();
        System.out.println("Total Users: " + users.size());  // Debugging line
        return users;
    }

    // Update CRUD
    @PutMapping("/putUserDetails")
    public AdminEntity putUserDetails(@RequestParam int admin_id, @RequestBody AdminEntity newUserDetails) {
        return userService.putUserDetails(admin_id, newUserDetails);
    }

    // Delete CRUD
    @DeleteMapping("/deleteUserDetails/{admin_id}")
    public String deleteUserDetails(@PathVariable int admin_id) {
        return userService.deleteUserDetails(admin_id);
    }

    // Login Admin
    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    //     String email = credentials.get("email");
    //     String password = credentials.get("password");
    //     AdminEntity admin = userService.login(email, password);

    //     if (admin == null) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    //     }

    //     // Generate JWT Token after successful login
    //     // String token = jwtTokenUtil.generateToken(admin);  // Using injected JwtTokenUtil
    //     // return ResponseEntity.ok(new AuthResponse(token));
    // }
}
