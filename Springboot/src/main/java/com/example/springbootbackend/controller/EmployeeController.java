package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Employee;
import com.example.springbootbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//188.24.84.129
//@CrossOrigin(origins = "http://192.168.100.27:3000")
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // create employee rest api
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee)
    {
        return employeeRepository.save(employee);
    }

    // build get employee by id REST API
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee=employeeRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Employee not exist with id" + id));
        return ResponseEntity.ok(employee);
    }

    //build update employee REST API
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employeeDetails){
        Employee updateEmployee=employeeRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Employee not exist with id" + id));

        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmailId(employeeDetails.getEmailId());

        employeeRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

    // build delete employee REST API
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable long id){
        Employee employee=employeeRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Employee not exist with id" + id));

        employeeRepository.delete(employee);

        return ResponseEntity.ok(employee);
    }

    @GetMapping("hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello");
    }
}
