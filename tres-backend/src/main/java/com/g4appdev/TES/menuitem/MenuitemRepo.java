package com.g4appdev.TES.menuitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuitemRepo extends JpaRepository<MenuitemEntity, Integer> {

    // Method to find MenuItems by Category
    public MenuitemEntity findByCategory(String category);

}
