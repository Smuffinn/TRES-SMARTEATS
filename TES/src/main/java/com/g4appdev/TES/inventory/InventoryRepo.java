package com.g4appdev.TES.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepo extends JpaRepository<InventoryEntity, Integer>{
	public InventoryEntity findBySupplier(String supplier);
}
