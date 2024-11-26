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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tes/admin")
public class AdminController {
    @Autowired
    private AdminService adminserv;

    @GetMapping("/{username}")
    public AdminEntity getUserByUsername(@PathVariable String username){
        return adminserv.getUserByUsername(username);
    }
     @GetMapping("/getAllUsers")
    public List<AdminEntity> getAllUsers() {
       return adminserv.getAllUsers();
    }
   
    @PostMapping("/postUser")
    public AdminEntity createUser(@RequestBody AdminEntity user) {
        return adminserv.createUser(user);
    }

    @PutMapping("/{admin_id}")
    public AdminEntity updateUser(@PathVariable int admin_id, @RequestBody AdminEntity user) {
        user.setAdmin_id(admin_id);
        return adminserv.updateUser(user);
    }

    @DeleteMapping("/{admin_id}")
    public void deleteAdmin(@PathVariable int admin_id) {
        adminserv.deleteAdmin(admin_id);
    }
}
 