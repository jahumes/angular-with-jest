import { TestBed } from "@angular/core/testing";

import { UserFacadeService } from "./user-facade.service";
import { BackendService } from "../backend.service";

describe("UserFacadeService", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: BackendService,
                    useValue: {}
                }
            ]
        })
    );

    it("should be created", () => {
        const service: UserFacadeService = TestBed.get(UserFacadeService);
        expect(service).toBeTruthy();
    });
});
