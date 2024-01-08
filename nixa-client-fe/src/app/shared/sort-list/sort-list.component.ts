import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface Sort {
  key: string;
  sortDirection: SortDirection;
}

@Component({
  selector: 'app-sort-list',
  templateUrl: './sort-list.component.html',
  styleUrls: ['./sort-list.component.css']
})
export class SortListComponent implements OnInit {
  @Input() sortBy = '';
  @Output() sortByEvent: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor() {
  }

  ngOnInit(): void {
  }


  onAsc() {
    this.sortByEvent.emit({
      key: this.sortBy,
      sortDirection: SortDirection.ASC
    });
  }

  onDesc() {
    this.sortByEvent.emit({
      key: this.sortBy,
      sortDirection: SortDirection.DESC
    });
  }
}
