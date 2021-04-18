import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

import { IUser } from "../../interfaces/iuser";
import { Ilogin } from "../../interfaces/ilogin";
import { Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";

import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
	providedIn: "root",
})
export class AccountService {
	private endPoint: string = `${environment.apiUrl}/account`;
	private currentUserSource = new ReplaySubject<IUser | null>(1);
	public currentUser$ = this.currentUserSource.asObservable();

	constructor(
		private $http: HttpClient,
		private $router: Router,
		private $toastr: ToastrService
	) {}

	getCurrentUser() {
		let userLogged: string | null = localStorage.getItem("user");

		if (!userLogged) {
			return;
		}

		const userObject = JSON.parse(userLogged);
		this.setCurrentUser(userObject);
	}

	login(model: Ilogin) {
		this.$http.post<IUser>(`${this.endPoint}/login`, model).subscribe(
			(resp: IUser) => {
				localStorage.setItem("user", JSON.stringify(resp));
				this.setCurrentUser(resp);
				this.$router.navigate(["members"]);
				this.$toastr.success("You are login successfully");
			},
			(error) => this.$toastr.error(error.error)
		);
	}

	setCurrentUser(user: IUser) {
		this.currentUserSource.next(user);
	}

	register(model: any) {
		return this.$http
			.post<IUser>(`${this.endPoint}/register`, model)
			.subscribe(
				(user: IUser) => {
					if (user) {
						localStorage.setItem("user", JSON.stringify(user));
						this.setCurrentUser(user);
						this.$router.navigate(["members"]);
					}
				},
				(error) => this.$toastr.error(error.error)
			);
	}

	logout(): void {
		this.currentUserSource.next(null);
		localStorage.clear();
		this.$router.navigate(["/"]);
	}
}
