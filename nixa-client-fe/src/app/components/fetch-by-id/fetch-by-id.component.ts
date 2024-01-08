import {Component} from '@angular/core';
import {ApiGatewayService} from "../../services/api-gateway.service";
import {map, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-fetch-by-id',
    templateUrl: './fetch-by-id.component.html',
    styleUrls: ['./fetch-by-id.component.css']
})
export class FetchByIdComponent {
    objs$!: Observable<any>;
    id: string = '';
    isIdRequired: boolean = false;
    errorMessage: string = '';

    constructor(private api: ApiGatewayService, private router: Router) {
    }

    fetchById() {
        if (this.id != '') {
            this.isIdRequired = false;
            this.objs$ = this.api.fetchById(this.id)
                .pipe(
                    tap(
                        {
                            next: () => this.errorMessage = '',
                            error: err => this.errorMessage = err.error.message
                        }
                    ),
                    map(o => {
                        const objList = [];
                        objList.push(o);
                        return objList;
                    })
                );
        } else {
            this.errorMessage = "Enter an id and search";
        }
    }

    onDelete(id: string) {
        this.api.deleteObjById(id).subscribe({
            complete: () => {
                this.router.navigate(['/fetch-all']);
            },
            error: err => console.log(err)
        });
    }
}
