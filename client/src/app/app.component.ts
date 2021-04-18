import { Component, OnInit } from "@angular/core";
import { AccountService } from "./services/account/account.service";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	constructor(private _account: AccountService) {}
	ngOnInit(): void {
		this._account.getCurrentUser();
	}
}
