import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AccountService } from "../../services/account/account.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
	model: any = { username: "", password: "" };
	@Output() cancelRegister = new EventEmitter();

	constructor(private _account: AccountService) {}

	ngOnInit(): void {}

	register(): void {
		this._account.register(this.model).subscribe(
			(resp) => {
				this.cancel();
			},
			(error) => console.error()
		);
	}

	cancel(): void {
		let { username, password } = this.model;
		username = "";
		password = "";
		this.cancelRegister.emit(false);
	}
}
