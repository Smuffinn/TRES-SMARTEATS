package com.g4appdev.TES.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g4appdev.TES.entity.MenuitemEntity;
import com.g4appdev.TES.service.MenuitemService;

@RestController
@RequestMapping("tes/menu")
public class MenuitemController {
    
    @Autowired
    private MenuitemService mserv;
    
    @GetMapping("/item")
    public String print() {
        return "Accessed Menuitem Controller";
    }

    // Create
    @PostMapping(value = "/insertMenu", consumes = "application/json")
    public MenuitemEntity insertMenu(@RequestBody MenuitemEntity menu) {
        return mserv.insertMenu(menu);
    }
    
    // Read
    @GetMapping("/getAllMenu")
    public List<MenuitemEntity> getAllMenu() {
        return mserv.getAllMenu();
    }
    
    // Update
    @PutMapping("/putMenuitemDetails/{menu_id}")
    public MenuitemEntity putMenuitemDetails(@PathVariable int menu_id, @RequestBody MenuitemEntity newMenuitemDetails) {
        return mserv.putMenuitemDetails(menu_id, newMenuitemDetails);
    }
    
    // Delete
    @DeleteMapping("/deleteMenuitem/{menu_id}")
    public String deleteMenuitem(@PathVariable int menu_id) {
        return mserv.deleteMenuitem(menu_id);
    }
    
    // Delete All
    @DeleteMapping("/deleteAllMenuItems")
    public String deleteAllMenuItems() {
        return mserv.deleteAllMenuItems(); // Call the service method
    }
}
