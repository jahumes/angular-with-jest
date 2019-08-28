import { TicketFacadeService } from "./ticket-facade.service";
import { Subject } from "rxjs";
import { BackendService, Ticket } from "../backend.service";
import { TestBed } from "@angular/core/testing";

describe("TicketFacadeService", () => {
    let service: TicketFacadeService;
    let backendService: any;
    beforeEach(() => {
        // backendService = jasmine.createSpyObj("BackendService", [
        //     "tickets",
        //     "ticket",
        //     "newTicket",
        //     "complete",
        //     "reopenTicket",
        //     "assign"
        // ]);
        backendService = {
            tickets: jest.fn(),
            ticket: jest.fn(),
            newTicket: jest.fn(),
            complete: jest.fn(),
            reopenTicket: jest.fn(),
            assign: jest.fn()
        };
        // service = new TicketFacadeService(backendService);
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: BackendService,
                    useValue: backendService
                }
            ]
        });
        service = TestBed.get(TicketFacadeService);
    });

    describe("getting tickets", () => {
        let ticketsSubject: Subject<Ticket[]>;
        beforeEach(() => {
            ticketsSubject = new Subject();
            backendService.tickets.mockReturnValue(ticketsSubject);
        });
        it("should get tickets based on search filter and the tickets returned from the backend", () => {
            const spy = jest.fn();
            const tickets: Ticket[] = [
                {
                    id: 1,
                    description: "Test Description",
                    assigneeId: null,
                    completed: false
                },
                {
                    id: 2,
                    description: "Test Description 2",
                    assigneeId: null,
                    completed: false
                }
            ];
            service.tickets$.subscribe(spy);
            service.getTickets();

            ticketsSubject.next(tickets);

            expect(spy).toHaveBeenCalledWith(tickets);
        });
        describe("filtering", () => {
            let tickets: Ticket[];
            beforeEach(() => {
                tickets = [
                    {
                        id: 0,
                        description: "Test Description",
                        assigneeId: null,
                        completed: false
                    },
                    {
                        id: 1,
                        description: "Test Description 2",
                        assigneeId: null,
                        completed: false
                    },
                    {
                        id: 2,
                        description: "Test Description 3",
                        assigneeId: 1,
                        completed: false
                    },
                    {
                        id: 3,
                        description: "Test Description 4",
                        assigneeId: 1,
                        completed: true
                    },
                    {
                        id: 4,
                        description: "Test Description 5",
                        assigneeId: 2,
                        completed: false
                    },
                    {
                        id: 5,
                        description: "Custom Search",
                        assigneeId: 2,
                        completed: false
                    }
                ];
            });
            it("should return all tickets by default", () => {
                let spy = jest.fn();

                service.tickets$.subscribe(spy);
                service.getTickets();

                ticketsSubject.next(tickets);

                expect(spy).toHaveBeenCalledWith(tickets);
            });
            it("should return all tickets if the completed flag in the search is set to the string all", () => {
                let spy = jest.fn();

                service.tickets$.subscribe(spy);
                service.searchTickets({
                    query: null,
                    userId: null,
                    completed: "all"
                });
                service.getTickets();

                ticketsSubject.next(tickets);

                expect(spy).toHaveBeenCalledWith(tickets);
            });
            it("should filter tickets based on the user id, query for the description, and whether it is completed", () => {
                let spy = jest.fn();

                service.tickets$.subscribe(spy);
                service.getTickets();

                ticketsSubject.next(tickets);

                expect(spy).toHaveBeenCalledWith(tickets);
                spy.mockClear();

                service.searchTickets({
                    query: null,
                    userId: 1,
                    completed: true
                });
                expect(spy.mock.calls[0][0]).toMatchSnapshot();
                spy.mockClear();

                service.searchTickets({
                    query: "Custom",
                    userId: null,
                    completed: false
                });
                expect(spy.mock.calls[0][0]).toMatchSnapshot();
                spy.mockClear();

                service.searchTickets({
                    query: "",
                    userId: 2,
                    completed: false
                });
                expect(spy.mock.calls[0][0]).toMatchSnapshot();
                spy.mockClear();
            });
        });
    });
    describe("get ticket", () => {
        it("should return null if the passed ticket is null", () => {});
    });
});
