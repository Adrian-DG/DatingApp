import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/interfaces/IMember';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
	selector: 'app-menbers-list',
	templateUrl: './menbers-list.component.html',
	styleUrls: ['./menbers-list.component.css'],
})
export class MenbersListComponent implements OnInit {
	members$!: Observable<IMember[]>;

	constructor(private _memberService: MemberService) {}

	ngOnInit(): void {
		this.members$ = this._memberService.getMembers();
	}
}
