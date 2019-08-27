import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketListPageComponent } from "./ticket-list-page.component";
import { UserFacadeService } from "../../services/user-facade.service";
import { TicketFacadeService } from "../../services/ticket-facade.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Subject } from "rxjs";

describe("TicketListPageComponent", () => {
    let component: TicketListPageComponent;
    let fixture: ComponentFixture<TicketListPageComponent>;
    let userFacade: any;
    let ticketFacade: any;

    beforeEach(async(() => {
        ticketFacade = jasmine.createSpyObj("TicketFacadeService", [
            "completeTicket",
            "getTickets",
            "addTicket"
        ]);
        ticketFacade.tickets$ = new Subject();
        userFacade = jasmine.createSpyObj("UserFacadeService", ["getUsers"]);
        userFacade.users$ = new Subject();
        TestBed.configureTestingModule({
            declarations: [TicketListPageComponent],
            imports: [RouterTestingModule, ReactiveFormsModule],
            providers: [
                {
                    provide: UserFacadeService,
                    useValue: userFacade
                },
                {
                    provide: TicketFacadeService,
                    useValue: ticketFacade
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
