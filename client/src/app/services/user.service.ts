import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../interfaces/iuser";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private endPoint: string = environment.apiUrl + "/Users";

	constructor(private $http: HttpClient) {}

	getUsers(): Observable<IUser[]> {
		return this.$http.get<IUser[]>(this.endPoint);
	}

	getUserById(id: number): Observable<IUser> {
		return this.$http.get<IUser>(`${this.endPoint}/${id}`);
	}
}
