import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Sort} from "../sort-list/sort-list.component";
import {ApiGatewayService} from "../../services/api-gateway.service";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    @Input() objList$!: Observable<any>;
    @Output() onDeleteEvent = new EventEmitter<string>();

    constructor(private api: ApiGatewayService) {
    }

    ngOnInit(): void {
    }

    onDelete(id: string) {
        this.onDeleteEvent.emit(id);
    }

  onSort(sort: Sort) {
      this.objList$ =  this.api.fetchAllSorted(sort);
  }
}
