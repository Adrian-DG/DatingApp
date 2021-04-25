import { Component, OnInit } from "@angular/core";
import { IMember } from "src/app/interfaces/IMember";
import { MemberService } from "src/app/services/member/member.service";

@Component({
	selector: "app-menbers-list",
	templateUrl: "./menbers-list.component.html",
	styleUrls: ["./menbers-list.component.css"],
})
export class MenbersListComponent implements OnInit {
	members: IMember[] | undefined;

	constructor(private _memberService: MemberService) {}

	ngOnInit(): void {
		this.getMembersList();
	}

	getMembersList(): void {
		this._memberService
			.getMembers()
			.subscribe((resp: IMember[]) => (this.members = resp));
	}
}
