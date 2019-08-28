import { Injectable } from "@angular/core";
import { BackendService, Ticket } from "../backend.service";
import {
    BehaviorSubject,
    combineLatest,
    EMPTY,
    Observable,
    of,
    ReplaySubject,
    Subject
} from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";

export interface TicketSearch {
    userId: number;
    query: string;
    completed: boolean | "all";
}

@Injectable({
    providedIn: "root"
})
export class TicketFacadeService {
    private _getTickets$: ReplaySubject<undefined> = new ReplaySubject();
    private _currentTicketId$: BehaviorSubject<number> = new BehaviorSubject(
        null
    );
    private _ticketFilter$: BehaviorSubject<TicketSearch> = new BehaviorSubject(
        {
            userId: null,
            query: null,
            completed: "all"
        }
    );
    private _currentError$: BehaviorSubject<Error> = new BehaviorSubject(null);

    tickets$: Observable<Ticket[]> = this._getTickets$.pipe(
        switchMap(() => {
            return combineLatest([
                this._ticketFilter$,
                this._backend.tickets()
            ]);
        }),
        map(([ticketFilter, tickets]) => {
            if (ticketFilter.userId) {
                tickets = tickets.filter(
                    ticket => ticket.assigneeId === ticketFilter.userId
                );
            }
            if (ticketFilter.query) {
                tickets = tickets.filter(ticket =>
                    ticket.description
                        .toLowerCase()
                        .includes(ticketFilter.query.toLowerCase())
                );
            }

            if (ticketFilter.completed !== "all") {
                return tickets.filter(
                    ticket => ticket.completed === ticketFilter.completed
                );
            }
            return tickets;
        }),
        shareReplay({ refCount: true, bufferSize: 1 })
    );
    currentTicket$: Observable<Ticket> = this._currentTicketId$.pipe(
        switchMap(ticketId => {
            if (ticketId === null) {
                return of(null);
            }

            return this._backend.ticket(ticketId);
        })
    );

    constructor(private _backend: BackendService) {}

    getTickets() {
        this._getTickets$.next();
    }
    getTicket(id: number) {
        this._currentTicketId$.next(id);
    }
    getCurrentFilter(): TicketSearch {
        return this._ticketFilter$.getValue();
    }
    searchTickets(filter: TicketSearch) {
        this._ticketFilter$.next(filter);
    }

    addTicket(description: string) {
        this._backend
            .newTicket({ description })
            .subscribe(ticket => this.getTickets());
    }
    deleteTicket(ticketId: number) {}

    completeTicket(ticketId: number) {
        this._backend.complete(ticketId).subscribe(() => this.getTickets());
    }
    reopenTicket(ticketId: number) {
        this._backend.reopenTicket(ticketId).subscribe(() => this.getTickets());
    }
    assignTicket(ticketId: number, userId: number) {
        this._backend
            .assign(ticketId, userId)
            .subscribe(() => this.getTickets());
    }
}
