import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketPageComponent } from "./ticket-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Subject } from "rxjs";
import { UserFacadeService } from "../../services/user-facade.service";
import { TicketFacadeService } from "../../services/ticket-facade.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("TicketPageComponent", () => {
    let component: TicketPageComponent;
    let fixture: ComponentFixture<TicketPageComponent>;
    let userFacade: any;
    let ticketFacade: any;

    beforeEach(async(() => {
        ticketFacade = {
            getTicket: jest.fn(),
            currentTicket$: new Subject()
        };
        userFacade = {
            getUsers: jest.fn(),
            users$: new Subject()
        };
        TestBed.configureTestingModule({
            declarations: [TicketPageComponent],
            imports: [ReactiveFormsModule, RouterTestingModule],
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
        fixture = TestBed.createComponent(TicketPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
