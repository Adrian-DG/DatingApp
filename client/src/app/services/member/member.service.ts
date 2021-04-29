import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IMember } from '../../interfaces/IMember';
import { Observable, of, pipe } from 'rxjs';
import { IUpdateMember } from 'src/app/interfaces/iupdate-member';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AccountService } from '../account/account.service';

/*
const httpOptions = {
	headers: new HttpHeaders({
		Authorization:
			"Bearer " + JSON.parse(localStorage.getItem("user") || "")?.token,
	}),
};
*/

@Injectable({
	providedIn: 'root',
})
export class MemberService {
	private baseUrl = environment.apiUrl + '/users';
	members: IMember[] = [];

	constructor(
		private $http: HttpClient,
		private _toastr: ToastrService,
		private _account: AccountService
	) {}

	// get currentUser username
	private getUsername() {
		let username;
		this._account.currentUser$.subscribe((user) => {
			username = user?.username;
		});
		return username;
	}

	private fetchMembers(): Observable<IMember[]> {
		return this.$http.get<IMember[]>(this.baseUrl).pipe(
			map((members) => {
				this.members = members.filter(
					(x) => x.username !== this.getUsername()
				);
				return this.members;
			})
		);
	}

	getMembers(): Observable<IMember[]> {
		return this.members.length > 0 ? of(this.members) : this.fetchMembers();
	}

	getMemberByUsername(username: string): Observable<IMember> {
		const member = this.members.find((x) => x.username === username);
		return member !== undefined
			? of(member)
			: this.$http.get<IMember>(`${this.baseUrl}/${username}`);
	}

	updateMember(memberDetails: IUpdateMember): void {
		this.$http
			.put<IUpdateMember>(this.baseUrl, memberDetails)
			.subscribe(() => this.updateMembersArray());
	}

	private updateMembersArray(): void {
		const username = localStorage.getItem('username');
		const member = this.members.find((x) => x.username === username);
		let index: number;
		if (member) index = this.members.indexOf(member);

		this.$http
			.get<IMember>(`${this.baseUrl}/${username}`)
			.subscribe((data) => (this.members[index] = data));
	}
}
