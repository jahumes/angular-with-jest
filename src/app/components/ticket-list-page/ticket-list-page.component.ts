import { Component, OnDestroy, OnInit } from "@angular/core";
import { TicketFacadeService } from "../../services/ticket-facade.service";
import { UserFacadeService } from "../../services/user-facade.service";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import { debounceTime, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "app-ticket-list-page",
    templateUrl: "./ticket-list-page.component.html",
    styleUrls: ["./ticket-list-page.component.css"]
})
export class TicketListPageComponent implements OnInit, OnDestroy {
    private _onDestroy$ = new Subject();

    tickets$ = this._ticketFacade.tickets$;
    users$ = this._userFacade.users$;

    newTicketForm = new FormGroup({
        description: new FormControl("", [
            Validators.minLength(2),
            Validators.required
        ])
    });

    searchFilterForm = new FormGroup({
        userId: new FormControl(null),
        query: new FormControl(""),
        completed: new FormControl("all")
    });

    constructor(
        private _ticketFacade: TicketFacadeService,
        private _userFacade: UserFacadeService,
        private _fb: FormBuilder
    ) {}

    ngOnInit() {
        this._ticketFacade.getTickets();
        this._userFacade.getUsers();
        this.searchFilterForm.setValue(this._ticketFacade.getCurrentFilter());

        this.searchFilterForm.valueChanges
            .pipe(
                takeUntil(this._onDestroy$),
                map(({ userId, query, completed }) => ({
                    userId: userId === "null" ? null : +userId,
                    query,
                    completed
                })),
                debounceTime(250)
            )
            .subscribe(filter => {
                this._ticketFacade.searchTickets(filter);
            });
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    createTicket($event) {
        $event.preventDefault();
        this._ticketFacade.addTicket(this.newTicketForm.value.description);
        this.newTicketForm.setValue({ description: "" });
    }

    resetForm($event: MouseEvent) {
        this.searchFilterForm.setValue({
            userId: null,
            query: "",
            completed: "all"
        });
    }
}
