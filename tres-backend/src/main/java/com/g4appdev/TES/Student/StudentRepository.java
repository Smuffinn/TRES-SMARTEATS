package com.g4appdev.TES.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    // Find a student by Name
    StudentEntity findByName(String name);

    // Find students by Grade_Level
    List<StudentEntity> findByGradeLevel(String gradeLevel); // Assuming Grade_Level is a String

    // Find students by Email
    StudentEntity findByEmail(String email);
}
