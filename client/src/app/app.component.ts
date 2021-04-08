import { Component, OnInit } from "@angular/core";
import { IUser } from "./interfaces/iuser";
import { UserService } from "./services/user.service";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	title = "client";
	users: IUser[] | undefined;

	constructor(private _userService: UserService) {}

	ngOnInit(): void {
		this._userService.getUsers().subscribe((data: IUser[]) => {
			console.table(data);
			this.users = data;
		});
	}
}
