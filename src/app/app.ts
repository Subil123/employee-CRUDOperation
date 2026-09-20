import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Employee } from './employee.model';
import { EmployeeService } from './employee-service';

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
 // employeeName = 'Jerin Jackup';
 
  // nameSave(){
  //   console.log("Name Saved");
  // }

//   employeeName = 'Subil';

//  employeeSalary = 8000;
//  isEmployeeAvailable = true;

  // saveEmployeeDetails(name : string , salary : number ){

  //   console.log("Employee name : " , name);
  //   console.log("Employee Salary : " , salary);


  // }

//   employees = [{
//   id : 1,
//   name : "Jeffry",
//   salary : 21981
//   },
//   {
//   id : 2,
//   name : "Tom wraffer",
//   salary : 21900
//   },
//   {
//   id : 3,
//   name : "Beigin Mafio",
//   salary : 19000
//   }
// ]

// employees : Employee[] = [
//   {
//   id : 1,
//   name : "Jeffry",
//   email : "jeffery@gmail.com",
//   salary : 21981
//   },
//   {
//   id : 2,
//   name : "Jesso",
//   email : "jesso@gmail.com",
//   salary : 397770
//   },
//   {
//   id : 3,
//   name : "Mestin",
//   email : "mestin@gmail.com",
//   salary : 15000
//   }

// ]

// employeeService  = inject(EmployeeService);

// employees = this.employeeService.employees;

employeeService = inject(EmployeeService);

employees : Employee[] = [];

// loadEmployees(){
//   this.employeeService.getEmployees().subscribe(
//     data =>{
//       this.employees = data;
//     }
//   );
// }

employeeName ="";
employeeEmail = "";
employeeSalary : number | null = null;

isEditMode = false;
selectedEmployeeId: number | null = null;

// isLoading
// This tells Angular:
// "Is an API request currently running?"

isLoading = false;
//This stores an error message that we want to show to the user.
errorMessage = '';

resetForm(){
  this.employeeName = "";
  this.employeeEmail = "";
  this.employeeSalary = null;
  this.isEditMode = false;
  this.selectedEmployeeId = null;
}

loadEmployees() {
 // console.log("Before API call:", this.employees);
 this.isLoading = true;
 this.errorMessage = '';

  this.employeeService.getEmployees().subscribe({
   next : (data) => {
      //console.log("Employees received:", data);
      this.employees = data;
      //console.log("After assigning:", this.employees);
      this.isLoading = false;

    },
    error :(error) => {
    console.log("Error loading employee", error);
    this.errorMessage = "'Unable to load employees. Please try again."
    this.isLoading = false;

  }
  }
  );
  
}


ngOnInit() {
  this.loadEmployees();
   
}





// saveEmployee() {
//   console.log("Name:", this.employeeName);
//   console.log("Email:", this.employeeEmail);
//   console.log("Salary:", this.employeeSalary);
// }
 editEmployee(employee: Employee) {

    this.isEditMode = true;

    this.selectedEmployeeId = employee.id;

    this.employeeName = employee.name;

    this.employeeEmail = employee.email;

    this.employeeSalary = employee.salary;

  }
saveEmployee(form : NgForm) {

  if(form.invalid){
    return;
  }


  if (this.isEditMode) {

  const employee = {
   id: this.selectedEmployeeId!,
    name: this.employeeName,
    email: this.employeeEmail,
    salary: Number(this.employeeSalary)
  };


  this.employeeService.updateEmployee(employee).subscribe({
    next : (response) => {
      console.log("Employee Updated : ", response);
      alert("Employee Updated Successfully!");
      this.loadEmployees();
      this.resetForm();
    },
    error : (error) => {
      console.error("Error Updating Employee: ", error);
      alert("Unable to update employee.")
    }
  });
}else {
  //console.log("Employee object:", employee);

  const employee = {
    name: this.employeeName,
    email: this.employeeEmail,
    salary: Number(this.employeeSalary)
  };


  this.employeeService.addEmployee(employee).subscribe({
    next: (response) => {
      console.log("Employee added:", response);
      alert("Employee Added Successfully!");
      this.loadEmployees();
      // this.employeeName = "";
      // this.employeeEmail = "";
      // salary : this.employeeSalary ;
      this.resetForm();
    },
    error: (error) => {
      console.error("Error Adding Employee:", error);
      alert("Unable to add employee.")
    }
  });
}
}


deleteEmployee(id : number){
  const confirmed = confirm (
    "Are you sure you want to delete thgis employee "
);
if(!confirmed){
  return;
}
this.employeeService.deleteEmployee(id).subscribe({
  next : () => {
    console.log("Employee  deleted successfully");
    alert("Employee  deleted successfully!");
    this.loadEmployees();

  },
  error : (error) => {
    console.error("Error deleting employee:", error);
    alert("Unable to delete employee.");
  }
})
}


}


