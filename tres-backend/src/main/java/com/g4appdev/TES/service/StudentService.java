package com.g4appdev.TES.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.StudentEntity;
import com.g4appdev.TES.repository.StudentRepository;

import java.util.List;
import java.util.Optional;
@Service
public class StudentService {

    @Autowired
    private StudentRepository srepo;

    // Create or Update a Student
    public StudentEntity saveStudent(StudentEntity student) {
        return srepo.save(student);
    }

    // Get a Student by ID
    public Optional<StudentEntity> getStudentById(long studentId) {
        return srepo.findById(studentId);
    }

    // Get all Students
    public List<StudentEntity> getAllStudents() {
        return srepo.findAll();
    }

    // Update an existing Student
    public StudentEntity updateStudent(long studentId, StudentEntity studentDetails) {
        StudentEntity existingStudent = srepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + studentId));

        existingStudent.setName(studentDetails.getName());
        existingStudent.setGradeLevel(studentDetails.getGradeLevel());
        existingStudent.setContactNumber(studentDetails.getContactNumber());
        existingStudent.setEmail(studentDetails.getEmail());

        return srepo.save(existingStudent);
    }

    // Delete a Student by ID
    public void deleteStudent(long studentId) {
        srepo.deleteById(studentId);
    }
}
