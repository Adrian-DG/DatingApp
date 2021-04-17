import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

import { IUser } from "../../interfaces/iuser";
import { Ilogin } from "../../interfaces/ilogin";
import { Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { join } from "@angular/compiler-cli/src/ngtsc/file_system";

@Injectable({
	providedIn: "root",
})
export class AccountService {
	private endPoint: string = `${environment.apiUrl}/account`;
	private currentUserSource = new ReplaySubject<IUser | null>(1);
	public currentUser$ = this.currentUserSource.asObservable();

	constructor(private $http: HttpClient) {}

	login(model: Ilogin) {
		return this.$http.post<IUser>(`${this.endPoint}/login`, model);
	}

	setCurrentUser(user: IUser) {
		this.currentUserSource.next(user);
	}

	register(model: any) {
		return this.$http.post<IUser>(`${this.endPoint}/register`, model).pipe(
			map((user) => {
				if (user) {
					localStorage.setItem("user", JSON.stringify(user));
					this.currentUserSource.next(user);
				}
			})
		);
	}

	logout(): void {
		this.currentUserSource.next(null);
		localStorage.removeItem("user");
	}
}
