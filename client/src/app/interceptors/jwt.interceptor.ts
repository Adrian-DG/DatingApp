import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountService } from "../services/account/account.service";
import { IUser } from "../interfaces/iuser";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private _account: AccountService) {}

	getCurrentUser(): Observable<IUser | null> {
		return this._account.currentUser$;
	}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		this._account.currentUser$.subscribe((user: IUser | null) => {
			if (user) {
				request = request.clone({
					setHeaders: { Authorization: `Bearer ${user.token}` },
				});
			}
		});

		return next.handle(request);
	}
}
