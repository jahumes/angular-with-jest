import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BackendService } from "./backend.service";
import { RouterTestingModule } from "@angular/router/testing";
describe("AppComponent", () => {
    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         declarations: [AppComponent],
    //         imports: [RouterTestingModule],
    //         providers: [
    //             {
    //                 provide: BackendService,
    //                 useValue: {
    //                     tickets: jasmine.createSpy()
    //                 }
    //             }
    //         ],
    //         schemas: [NO_ERRORS_SCHEMA]
    //     }).compileComponents();
    // }));
    // it("should create the app", async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app).toBeTruthy();
    // }));
    // it(`should have as title 'app'`, async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual("app");
    // }));
    // it("should render title in a h1 tag", async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector("h1").textContent).toContain(
    //         "Welcome to app!"
    //     );
    // }));
});
