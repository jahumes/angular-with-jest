import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketListItemComponent } from "./ticket-list-item.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TicketFacadeService } from "../../services/ticket-facade.service";
import { ReactiveFormsModule } from "@angular/forms";

describe("TicketListItemComponent", () => {
    let component: TicketListItemComponent;
    let fixture: ComponentFixture<TicketListItemComponent>;
    let ticketFacade: any;

    beforeEach(async(() => {
        ticketFacade = {
            completeTicket: jest.fn()
        };
        TestBed.configureTestingModule({
            declarations: [TicketListItemComponent],
            imports: [RouterTestingModule, ReactiveFormsModule],
            providers: [
                {
                    provide: TicketFacadeService,
                    useValue: ticketFacade
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketListItemComponent);
        component = fixture.componentInstance;
        component.ticket = {
            id: 1,
            description: "description",
            assigneeId: null,
            completed: false
        };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have a Complete button if the ticket is open and Reopen if the ticket is complete", () => {
        expect(fixture).toMatchSnapshot();

        component.ticket.completed = true;

        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
    });
});
