import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../employee-service';
import { Employee } from '../../employee.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-edit-employee',
  styleUrl: './edit-employee.css',
  templateUrl: './edit-employee.html',
})
export class EditEmployee implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  employeeService = inject(EmployeeService);

  //employee : Employee[] =[];

  isSubmitting = false;
  errorMessage = '';
  isLoading = false;

   employeeId!: number;
  employeeName = '';
  employeeEmail = '';
  employeeSalary : number | null = null;

    ngOnInit(): void {

      this.employeeId = Number(this.route.snapshot.paramMap.get('id') );
      this.loadEmployee();
  }

  loadEmployee() : void{
     
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next : (employee : Employee ) => {

         this.employeeName = employee.name;
        this.employeeEmail = employee.email;
        this.employeeSalary = employee.salary;

        this.isLoading = false;
      },
      error : (error) => {
        console.error('Error loading employee:', error);
        this.errorMessage = 'Unable to load employee.';
        this.isLoading = false;
      }
    });
  }

  updateEmployee(form : NgForm): void{
    if(form.invalid){
     return ;
    }
       const employee: Employee = {
  id: this.employeeId,
  name: this.employeeName,
  email: this.employeeEmail,
  salary: Number(this.employeeSalary)
};

    this.isLoading = true;
    this.errorMessage = '';
    this.employeeService.updateEmployee(employee).subscribe({
next : () => {
  alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      },
      error : (error) => {
           console.error('Error updating employee:', error);
        this.errorMessage = 'Unable to update employee.';
        this.isSubmitting = false;

      }


    });

  }
  





}
