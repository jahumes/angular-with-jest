import { Component, Input, OnInit } from "@angular/core";
import { TicketFacadeService } from "../../services/ticket-facade.service";
import { Ticket, User } from "../../backend.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-ticket-list-item",
    templateUrl: "./ticket-list-item.component.html",
    styleUrls: ["./ticket-list-item.component.css"]
})
export class TicketListItemComponent implements OnInit {
    @Input() ticket: Ticket;
    @Input() users: User[];

    assigneeForm = new FormGroup({
        assigneeId: new FormControl(null)
    });

    constructor(private _ticketFacade: TicketFacadeService) {}

    ngOnInit() {
        this.assigneeForm.setValue({
            assigneeId: this.ticket.assigneeId
        });

        this.assigneeForm
            .get("assigneeId")
            .valueChanges.subscribe(assigneeId =>
                this._ticketFacade.assignTicket(this.ticket.id, +assigneeId)
            );
    }

    completeTicket($event: any) {
        $event.preventDefault();
        this._ticketFacade.completeTicket(this.ticket.id);
    }

    reopenTicket($event: any) {
        $event.preventDefault();
        this._ticketFacade.reopenTicket(this.ticket.id);
    }
}
