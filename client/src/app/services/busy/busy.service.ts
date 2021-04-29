import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
	providedIn: 'root',
})
export class BusyService {
	private busyRequestConter: number = 0;
	constructor(private _spinner: NgxSpinnerService) {}

	busy(): void {
		this.busyRequestConter++;
		this._spinner.show(undefined, {
			type: 'line-scale-party',
			bdColor: 'rgba(255,255,255,0)',
			color: '#333333',
		});
	}

	idle(): void {
		this.busyRequestConter--;
		if (this.busyRequestConter <= 0) {
			this.busyRequestConter = 0;
			this._spinner.hide();
		}
	}
}
