import { Routes } from '@angular/router';
import { EmployeList } from './pages/employe-list/employe-list';
import { AddEmployee } from './pages/add-employee/add-employee';
import { EditEmployee } from './pages/edit-employee/edit-employee';

export const routes: Routes = [
    {
        path : 'employees',
        component : EmployeList
    },
    {
        path : 'employees/add',
        component : AddEmployee
    },
    {
        path : 'employees/edit/:id',
        component : EditEmployee
    },
    {
        path : '',
        redirectTo : 'employees',
        pathMatch : 'full'
    }
];
