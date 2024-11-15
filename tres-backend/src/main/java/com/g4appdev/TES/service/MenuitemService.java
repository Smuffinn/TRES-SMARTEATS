package com.g4appdev.TES.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.MenuitemEntity;
import com.g4appdev.TES.repository.MenuitemRepo;

@Service
public class MenuitemService {
    
    @Autowired
    private MenuitemRepo mirepo;
    
    public MenuitemService() {
        super();
    }

    // CREATE
    public MenuitemEntity insertMenu(MenuitemEntity menu) {
        return mirepo.save(menu);
    }

    // READ
    public List<MenuitemEntity> getAllMenu() {
        return mirepo.findAll();
    }

    // UPDATE
    public MenuitemEntity putMenuitemDetails(int menu_id, MenuitemEntity newMenuitemDetails) {
        // Check if the menu item exists
        MenuitemEntity existingMenuItem = mirepo.findById(menu_id)
            .orElseThrow(() -> new NoSuchElementException("Menu item " + menu_id + " not found."));

        // Update details
        existingMenuItem.setItem_name(newMenuitemDetails.getItem_name());
        existingMenuItem.setPrice(newMenuitemDetails.getPrice());
        existingMenuItem.setCategory(newMenuitemDetails.getCategory());
        existingMenuItem.setStatus(newMenuitemDetails.getStatus());
        existingMenuItem.setImage_url(newMenuitemDetails.getImage_url());

        return mirepo.save(existingMenuItem);
    }

    // DELETE
    public String deleteMenuitem(int menu_id) {
        if (mirepo.existsById(menu_id)) {
            mirepo.deleteById(menu_id);
            return "Successfully deleted!";
        } else {
            return menu_id + " Not Found!";
        }
    }

    // DELETE ALL
    public String deleteAllMenuItems() {
        mirepo.deleteAll(); // Delete all menu items from the database
        return "All menu items deleted successfully!";
    }
}
