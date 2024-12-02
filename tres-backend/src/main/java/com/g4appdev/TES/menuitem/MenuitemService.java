package com.g4appdev.TES.menuitem;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class MenuitemService {

    @Autowired
    private MenuitemRepo mirepo;

    public MenuitemService() {
        super();
    }
    public MenuitemEntity insertMenuEmpty(MenuitemEntity menu) {
        if (menu.getQuantity() <= 0) {
            menu.setStatus("Not Available");
        }
        return mirepo.save(menu);
    }
    public MenuitemEntity insertMenu(MenuitemEntity menuitem) {
        return mirepo.save(menuitem);
    }
    public List<MenuitemEntity> getUnavailableMenuItems() {
        return mirepo.findByStatus("Not Available");
    }


  //update  
    public MenuitemEntity putMenuitemDetails(int menu_id, MenuitemEntity newMenuitemDetails) {
        MenuitemEntity existingMenuItem = mirepo.findById(menu_id)
            .orElseThrow(() -> new NoSuchElementException("Menu item " + menu_id + " not found."));
        
        // Update the status based on quantity
        if (newMenuitemDetails.getQuantity() <= 0) {
            newMenuitemDetails.setStatus("Not Available");
        }
    
        existingMenuItem.setQuantity(newMenuitemDetails.getQuantity());
        existingMenuItem.setStatus(newMenuitemDetails.getStatus());
        existingMenuItem.setItem_name(newMenuitemDetails.getItem_name());
        existingMenuItem.setPrice(newMenuitemDetails.getPrice());
        existingMenuItem.setPrice(newMenuitemDetails.getQuantity());
        existingMenuItem.setCategory(newMenuitemDetails.getCategory());
        existingMenuItem.setImage_url(newMenuitemDetails.getImage_url());
    
        return mirepo.save(existingMenuItem);
    }
    public List<MenuitemEntity> getAllMenu() {
        return mirepo.findAll().stream()
                     .filter(item -> item.getQuantity() > 0 && !"Not Available".equalsIgnoreCase(item.getStatus()))
                     .toList();
    }
    
    public List<MenuitemEntity> getMenuItemsByCategory(String category) {
        if ("ALL".equalsIgnoreCase(category)) {
            return getAllMenu();
        }
        return mirepo.findByCategory(category).stream()
                     .filter(item -> item.getQuantity() > 0 && !"Not Available".equalsIgnoreCase(item.getStatus()))
                     .toList();
    }
    

    // // READ - Get all menu items
    // public List<MenuitemEntity> getAllMenu() {
    //     List<MenuitemEntity> menuItems = mirepo.findAll();
    //     // Filter out items with 0 quantity
    //     menuItems.removeIf(item -> item.getQuantity() == 0);
    //     return menuItems;
    // }
    // READ - Get all menu items
// public List<MenuitemEntity> getAllMenu() {
//     List<MenuitemEntity> menuItems = mirepo.findAll();
//     // Filter out items with 0 quantity or status "Not Available"
//     menuItems.removeIf(item -> item.getQuantity() <= 0 || "Not Available".equalsIgnoreCase(item.getStatus()));
//     return menuItems;
// }

    // // READ - Filter menu items by category
    // public List<MenuitemEntity> getMenuItemsByCategory(String category) {
    //     // If "ALL" category is selected, return all menu items
    //     if ("ALL".equalsIgnoreCase(category)) {
    //         return getAllMenu();
    //     }
    //     // Otherwise, filter by the category and remove items with 0 quantity
    //     List<MenuitemEntity> menuItems = mirepo.findByCategory(category);
    //     menuItems.removeIf(item -> item.getQuantity() == 0); // Exclude items with 0 quantity
    //     return menuItems;
    // }
    
// READ - Filter menu items by category
// public List<MenuitemEntity> getMenuItemsByCategory(String category) {
//     if ("ALL".equalsIgnoreCase(category)) {
//         return getAllMenu();
//     }
//     List<MenuitemEntity> menuItems = mirepo.findByCategory(category);
//     menuItems.removeIf(item -> item.getQuantity() <= 0 || "Not Available".equalsIgnoreCase(item.getStatus()));
//     return menuItems;
// }

    // UPDATE
    // public MenuitemEntity putMenuitemDetails(int menu_id, MenuitemEntity newMenuitemDetails) {
    //     // Check if the menu item exists
    //     MenuitemEntity existingMenuItem = mirepo.findById(menu_id)
    //         .orElseThrow(() -> new NoSuchElementException("Menu item " + menu_id + " not found."));

    //     // Update details
    //     existingMenuItem.setItem_name(newMenuitemDetails.getItem_name());
    //     existingMenuItem.setPrice(newMenuitemDetails.getPrice());
    //     existingMenuItem.setCategory(newMenuitemDetails.getCategory());
    //     existingMenuItem.setStatus(newMenuitemDetails.getStatus());
    //     existingMenuItem.setImage_url(newMenuitemDetails.getImage_url());
    //     existingMenuItem.setQuantity(newMenuitemDetails.getQuantity()); 

    //     return mirepo.save(existingMenuItem);
    // }

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
