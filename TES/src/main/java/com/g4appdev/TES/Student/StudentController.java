package com.g4appdev.TES.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Create or Update a Student
    @PostMapping("/insertStudent")
    public ResponseEntity<StudentEntity> createOrUpdateStudent(@RequestBody StudentEntity student) {
        StudentEntity savedStudent = studentService.saveStudent(student);
        return ResponseEntity.ok(savedStudent);
    }
 // Get a Student by ID
    @GetMapping("/student/{id}")
    public ResponseEntity<StudentEntity> getStudentById(@PathVariable("id") long studentId) {
        Optional<StudentEntity> student = studentService.getStudentById(studentId);
        return student.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all Students
    @GetMapping("/getStudent")
    public ResponseEntity<List<StudentEntity>> getAllStudents() {
        List<StudentEntity> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

 // Update an existing Student
    @PutMapping("/updateStudent/{id}")
    public ResponseEntity<StudentEntity> updateStudent(@PathVariable("id") long studentId, @RequestBody StudentEntity studentDetails) {
        StudentEntity updatedStudent = studentService.updateStudent(studentId, studentDetails);
        return ResponseEntity.ok(updatedStudent);
    }

    // Delete a Student by ID
    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") long studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }
}
