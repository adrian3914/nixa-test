import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiGatewayService} from "../../services/api-gateway.service";

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
    id = '';
    firstName: string = '';
    lastName: string = '';
    contactDate: string = '';
    errorMessage: string = '';
    phoneNumber: string = '';

    constructor(private route: ActivatedRoute, private api: ApiGatewayService, private router: Router) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.initFormValues();
    }

    updateClient() {
        if (this.firstName == '' || this.lastName == '' || this.contactDate == '' || this.phoneNumber == '') {
            this.errorMessage = "All fields are required"
        } else {
          // validate telNo Format
          if (!this.validateTelNo(this.phoneNumber)){
            this.errorMessage = "Please enter a valid telNo format: [123-456-7890 | (123) 456-7890 | 123 456 7890 | 123.456.7890 | +91 (123) 456-7890 ]"
            return;
          }
            this.errorMessage = '';
            this.api.update({
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
                contactDate: this.contactDate
            }).subscribe({
                next: () => {
                    this.router.navigate(['/fetch-all']);
                },
                error: err => {
                    console.log(err)
                }
            });
        }
    }

    private initFormValues() {
        this.api.fetchById(this.id).subscribe(
            {
                next: res => {
                    this.firstName = res?.firstName;
                    this.lastName = res?.lastName;
                    this.phoneNumber = res?.phoneNumber;
                    this.contactDate = res?.contactDate;
                },
                error: err => {
                    console.log(err)
                }
            }
        )
    }

  private validateTelNo(phoneNumber: string): boolean {
    let isValid: boolean = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(phoneNumber);
    console.log(isValid)
    return isValid;
  }
}

