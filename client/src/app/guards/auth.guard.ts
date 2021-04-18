import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AccountService } from "../services/account/account.service";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(
		private _account: AccountService,
		private _toastr: ToastrService
	) {}

	canActivate() {
		if (localStorage.getItem("user")) {
			return true;
		}

		this.showToast();
		return false;
	}

	showToast(): void {
		this._toastr.error("You should not pass");
	}
}
