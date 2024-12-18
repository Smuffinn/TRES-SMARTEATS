package com.g4appdev.TES.Staff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Staff findByEmail(String email);
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
}
