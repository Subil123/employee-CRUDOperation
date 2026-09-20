import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../employee-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [RouterOutlet, RouterLink, FormsModule],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {

  employeeService = inject(EmployeeService);
  router = inject(Router);
  isSubmitting = false;
  errorMessage = '';
  employeeName = '';
  employeeEmail = '';
  employeeSalary : number | null = null;

  saveEmployee(form : NgForm): void{

     this.isSubmitting = true;
     this.errorMessage = '';

    const employee = {
      name : this.employeeName,
      email: this.employeeEmail,
      salary: Number(this.employeeSalary)
    }

    this.employeeService.addEmployee(employee).subscribe({

      next : () => {
        alert('Employee Added Successfully');
        this.router.navigate(['/employyes']);
      this.isSubmitting = false;
      },
      error : (error) => {
        console.log('Employe not added');
        this.errorMessage = "Unable to add employee";
        this.isSubmitting = false;
      }

    });{

    }

  }

}
