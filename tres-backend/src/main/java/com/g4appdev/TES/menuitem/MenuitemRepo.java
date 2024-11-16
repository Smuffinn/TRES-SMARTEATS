package com.g4appdev.TES.menuitem;

//import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.TES.inventory.InventoryEntity;

@Repository
public interface MenuitemRepo extends JpaRepository<MenuitemEntity,Integer> {
	public MenuitemEntity findByCategory(String category);

	public InventoryEntity save(InventoryEntity inventory);

}
