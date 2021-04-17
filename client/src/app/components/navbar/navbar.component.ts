import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Ilogin } from "src/app/interfaces/ilogin";
import { IUser } from "src/app/interfaces/iuser";
import { AccountService } from "../../services/account/account.service";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	loginModel: Ilogin = { username: "", password: "" };
	currentUser$: Observable<IUser> | any;

	constructor(private _account: AccountService) {}

	ngOnInit(): void {
		this.currentUser$ = this._account.currentUser$;
	}

	Login(): void {
		// console.log(this.loginModel);
		this._account.login(this.loginModel).subscribe((response: IUser) => {
			localStorage.setItem("user", JSON.stringify(response));
			this._account.setCurrentUser(response);
		});
	}

	Logout(): void {
		this._account.logout();
	}
}
