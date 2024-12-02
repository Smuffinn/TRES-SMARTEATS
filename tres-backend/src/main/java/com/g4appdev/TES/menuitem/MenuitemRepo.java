package com.g4appdev.TES.menuitem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface MenuitemRepo extends JpaRepository<MenuitemEntity, Integer> {

    // Method to find MenuItems by Category
    public List<MenuitemEntity> findByCategory(String category);  // Use List<MenuitemEntity> for multiple items
    // Repository method to fetch all available menu items
@Query("SELECT m FROM MenuitemEntity m WHERE m.quantity > 0 AND m.status != 'Not Available'")
List<MenuitemEntity> findAllAvailableItems();
List<MenuitemEntity> findByStatus(String status);


// Repository method to fetch available items by category
@Query("SELECT m FROM MenuitemEntity m WHERE m.category = :category AND m.quantity > 0 AND m.status != 'Not Available'")
List<MenuitemEntity> findAvailableItemsByCategory(@Param("category") String category);

}
    