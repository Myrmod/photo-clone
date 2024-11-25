import { Component, Inject, OnInit } from "@angular/core";

import { Employee } from "../../Model/employee";
import { EmployeeService } from "../../Service/employee.service";

@Component({
  selector: "app-employee-list",
  imports: [],
  templateUrl: "./employee-list.component.html",
  styleUrl: "./employee-list.component.scss"
})
export class EmployeeListComponent implements OnInit {
  employees: Array<Employee> = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.filter(d => {
        if (!d.emailID || !d.firstName || !d.lastName) {
          console.warn(`Received faulty employee data: `, d);
        }

        return d.emailID;
      });
    });
  }
}
