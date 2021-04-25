import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { IMember } from "../../interfaces/IMember";
import { Observable } from "rxjs";

/*
const httpOptions = {
	headers: new HttpHeaders({
		Authorization:
			"Bearer " + JSON.parse(localStorage.getItem("user") || "")?.token,
	}),
};
*/

@Injectable({
	providedIn: "root",
})
export class MemberService {
	private baseUrl = environment.apiUrl + "/users";

	constructor(private $http: HttpClient) {}

	getMembers(): Observable<IMember[]> {
		return this.$http.get<IMember[]>(this.baseUrl);
	}

	getMemberByUsername(username: string): Observable<IMember> {
		return this.$http.get<IMember>(`${this.baseUrl}/${username}`);
	}
}
