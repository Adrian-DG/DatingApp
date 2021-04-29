import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";
import { IMember } from "src/app/interfaces/IMember";
import { IUpdateMember } from "src/app/interfaces/iupdate-member";
import { IUser } from "src/app/interfaces/iuser";
import { AccountService } from "src/app/services/account/account.service";
import { MemberService } from "src/app/services/member/member.service";

@Component({
	selector: "app-member-edit",
	templateUrl: "./member-edit.component.html",
	styleUrls: ["./member-edit.component.css"],
})
export class MemberEditComponent implements OnInit {
	@ViewChild("editForm") editForm!: NgForm;
	public member!: IMember;
	private user?: IUser;

	// Notify to save changes before closing window or tab
	@HostListener("window:beforeunload", ["$event"]) unloadNotification(
		$event: any
	) {
		if (this.editForm.dirty) $event.returnValue = true;
	}

	constructor(
		private _account: AccountService,
		private _member: MemberService
	) {
		this._account.currentUser$.pipe(take(1)).subscribe((data) => {
			if (data) this.user = data;
		});
	}

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		const user = this.user;
		if (user)
			this._member
				.getMemberByUsername(user.username)
				.subscribe((data) => (this.member = data));
	}

	updateMember(): void {
		const toUpdate: IUpdateMember = this.editForm.value;
		this._member.updateMember(toUpdate);
	}
}
