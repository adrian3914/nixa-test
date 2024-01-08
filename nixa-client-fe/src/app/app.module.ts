import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FetchAllComponent} from "./components/fetch-all/fetch-all.component";
import {TableComponent} from "./shared/table/table.component";
import {SortListComponent} from "./shared/sort-list/sort-list.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddNewComponent} from "./components/add-new/add-new.component";
import {FetchByIdComponent} from "./components/fetch-by-id/fetch-by-id.component";
import {UpdateComponent} from "./components/update/update.component";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FetchAllComponent,
    TableComponent,
    SortListComponent,
    AddNewComponent,
    FetchByIdComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
