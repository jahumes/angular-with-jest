import { Injectable } from "@angular/core";
import { BackendService, User } from "../backend.service";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { shareReplay, switchMap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class UserFacadeService {
    private _getUsers$: ReplaySubject<undefined> = new ReplaySubject();
    private _currentUserId$: BehaviorSubject<number> = new BehaviorSubject(
        null
    );

    users$: Observable<User[]> = this._getUsers$.pipe(
        switchMap(() => this._backend.users()),
        shareReplay({ refCount: true, bufferSize: 1 })
    );
    currentUser$: Observable<User> = this._currentUserId$.pipe(
        switchMap(id => this._backend.user(id))
    );

    constructor(private _backend: BackendService) {}

    getUsers() {
        this._getUsers$.next();
    }

    setCurrentUser(id: number) {
        this._currentUserId$.next(id);
    }
}
