import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../employee.model';
import { EmployeeService } from '../../employee-service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, FormsModule, RouterLink],
  selector: 'app-employe-list',
  styleUrl: './employe-list.css',
  templateUrl: './employe-list.html',
})
export class EmployeList implements OnInit{

  employees : Employee[] = [];
  employeeService = inject(EmployeeService);
  isLoading = false;
  errorMessage ="";

  loadEmployee(){
    this.isLoading = true;
    this.errorMessage = "";
this.employeeService.getEmployees().subscribe({
  next : (data) => {
    this.employees = data;
  this.isLoading = false;
  },

error : (error) =>{

console.error('Error loading employees:', error);

this.errorMessage = "Employee failed to Load";
this.isLoading = false;
}
}
);
}

deleteEmployee(id : number): void{

  const confirmed = confirm(
    'Are you sure you want to delete ?'
  );
 if(!confirmed){
  return ;
 }

    this.employeeService.deleteEmployee(id).subscribe({
     next: () => {

      alert('Deleted Successfully');
        this.loadEmployee();
      
     },
     
      error : (error) =>{
        console.log("Error deleting employee: ", error);
      alert("Unable to delete employee.");
     }
    }
    );
    }



ngOnInit(): void {

    this.loadEmployee();
    
  }

  }

  

