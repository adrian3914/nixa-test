import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";
import {ApiGatewayService} from "../../services/api-gateway.service";

@Component({
  selector: 'app-fetch-all',
  templateUrl: './fetch-all.component.html',
  styleUrls: ['./fetch-all.component.css']
})
export class FetchAllComponent implements OnInit {
  allObjs$!: Observable<any>

  constructor(private api: ApiGatewayService) {
  }

  ngOnInit(): void {
    this.allObjs$ = this.api.fetchAll();
  }

  onDelete(id: string) {
    this.api.deleteObjById(id).subscribe({
      complete: () => {
        this.allObjs$ = this.api.fetchAll();
      },
      error: err => console.log(err)
    });
  }
}
