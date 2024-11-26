package com.g4appdev.TES.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends  JpaRepository<AdminEntity, Integer>{
    public AdminEntity findByUsername(String username);
}
