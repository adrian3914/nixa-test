import { Component, OnInit } from '@angular/core';
import {ApiGatewayService} from "../../services/api-gateway.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  errorMessage: string = '';
  firstName: string = '';
  lastName: string = '';
  contactDate: string = '';
  phoneNumber: string = '';


  constructor(private api: ApiGatewayService, private router: Router) { }

  ngOnInit(): void {
  }


  addNewClient() {
    if (this.firstName == '' || this.lastName == '' || this.contactDate == '' || this.phoneNumber == ''){
      this.errorMessage = "All fields are required"
    }else{
      // validate telNo Format
      if (!this.validateTelNo(this.phoneNumber)){
        this.errorMessage = "Please enter a valid telNo format: [123-456-7890 | (123) 456-7890 | 123 456 7890 | 123.456.7890 | +91 (123) 456-7890 ]"
        return;
      }

      this.errorMessage = '';
      this.api.addNew(
        {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          contactDate: this.contactDate
        }
      ).subscribe({
        next:() => {
          this.router.navigate(['/fetch-all']);
      },
        error:(err) => console.log(err)
      });
    }
  }

  private validateTelNo(phoneNumber: string): boolean {
    let isValid: boolean = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(phoneNumber);
    console.log(isValid)
    return isValid;
  }
}
