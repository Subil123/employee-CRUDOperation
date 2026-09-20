import { inject, Injectable, Service } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

// employees : Employee[] = [{
//     id : 1,
//     name : "Jeffry",
//     email : "jeffry@gmail.com",
//     salary : 20000
// },
// {
//     id : 2,
//     name : "Justin",
//     email : "justin@gmail.com",
//     salary : 30000
// },
// {
//     id : 3,
//     name : "Timper Josh",
//     email : "timperjosh@gmail.com",
//     salary : 35000
// },
// {
//     id : 4,
//     name : "Kenko Pespto",
//     email : "kenkopesptojosh@gmail.com",
//     salary : 45000
// }


// ]


private http = inject(HttpClient);

private apiUrl  = 'http://localhost:8080/employees';
getEmployees(){
    return this.http.get<Employee[]>(this.apiUrl);
}

addEmployee(employee: Omit<Employee , 'id'>) {
  return this.http.post<Employee>(this.apiUrl, employee);
}

deleteEmployee(id : number){
  return this.http.delete<void>(`${this.apiUrl}/${id}`)
}

updateEmployee(employee : Employee){
  return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
}

getEmployeeById(id : number){
return this.http.get<Employee>(`${this.apiUrl}/${id}`);
}
}
