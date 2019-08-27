import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { RouterModule, Routes } from "@angular/router";
import { TicketListPageComponent } from "./components/ticket-list-page/ticket-list-page.component";
import { TicketPageComponent } from "./components/ticket-page/ticket-page.component";
import { TicketListItemComponent } from "./components/ticket-list-item/ticket-list-item.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "tickets"
    },
    {
        path: "tickets",
        component: TicketListPageComponent
    },
    {
        path: "ticket/:id",
        component: TicketPageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        TicketListPageComponent,
        TicketPageComponent,
        TicketListItemComponent
    ],
    imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {}
