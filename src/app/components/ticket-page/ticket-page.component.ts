import { Component, OnDestroy, OnInit } from "@angular/core";
import { TicketFacadeService } from "../../services/ticket-facade.service";
import { UserFacadeService } from "../../services/user-facade.service";
import { ActivatedRoute } from "@angular/router";
import { map, takeUntil } from "rxjs/operators";
import { combineLatest, Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Ticket } from "../../backend.service";

@Component({
    selector: "app-ticket-page",
    templateUrl: "./ticket-page.component.html",
    styleUrls: ["./ticket-page.component.css"]
})
export class TicketPageComponent implements OnInit, OnDestroy {
    private _destroy$: Subject<undefined> = new Subject<undefined>();

    ticket$ = this._ticketFacade.currentTicket$;
    users$ = this._userFacade.users$;
    ticketForm$ = this.ticket$.pipe(
        map(ticket => {
            return new FormGroup({
                description: new FormControl(ticket.description, [
                    Validators.required,
                    Validators.minLength(2)
                ]),
                completed: new FormControl(ticket.completed),
                assigneeId: new FormControl(ticket.assigneeId)
            });
        })
    );

    viewModel$ = combineLatest([
        this.ticket$,
        this.users$,
        this.ticketForm$
    ]).pipe(
        map(([ticket, users, ticketForm]) => ({
            ticket,
            users,
            ticketForm
        }))
    );

    constructor(
        private _route: ActivatedRoute,
        private _ticketFacade: TicketFacadeService,
        private _userFacade: UserFacadeService
    ) {}

    ngOnInit() {
        this._route.paramMap
            .pipe(takeUntil(this._destroy$))
            .subscribe(paramMap => {
                this._ticketFacade.getTicket(+paramMap.get("id"));
            });
        this._userFacade.getUsers();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
    }

    saveTicket(ticket: Ticket) {}
}
