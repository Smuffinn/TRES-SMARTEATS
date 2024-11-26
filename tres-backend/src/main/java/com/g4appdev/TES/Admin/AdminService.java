package com.g4appdev.TES.Admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminrepo;

    public List<AdminEntity>getAllUsers(){
        return adminrepo.findAll();
    }
    public AdminEntity getUserByUsername(String username) {
        return adminrepo.findByUsername(username);
    }

    public AdminEntity createUser(AdminEntity user){
        return adminrepo.save(user);
    }

    public AdminEntity updateUser(AdminEntity user){
        return adminrepo.save(user);
    }

    public void deleteAdmin(int admin_id){
        adminrepo.deleteById(admin_id);
    }


}
