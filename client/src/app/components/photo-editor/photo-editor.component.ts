import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/IPhoto';
import { environment } from '../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/services/account/account.service';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
	selector: 'app-photo-editor',
	templateUrl: './photo-editor.component.html',
	styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
	@Input() photos!: IPhoto[];
	uploader!: FileUploader;
	hasBaseDropZoneOver = false;
	private baseUrl: string = environment.apiUrl + '/users/add-photo';
	private user!: IUser;

	constructor(private _account: AccountService) {
		this._account.currentUser$.pipe(take(1)).subscribe((user) => {
			if (user) this.user = user;
		});
	}

	ngOnInit(): void {
		this.initializeUploader();
	}

	fileOverBase(event: any): void {
		this.hasBaseDropZoneOver = event;
	}

	initializeUploader(): void {
		this.uploader = new FileUploader({
			url: this.baseUrl,
			authToken: `Bearer ${this.user.token}`,
			isHTML5: true,
			allowedFileType: ['image'],
			removeAfterUpload: true,
			autoUpload: false,
			maxFileSize: 10 * 1024 * 1024,
		});

		this.uploader.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};

		this.uploader.onSuccessItem = (item, response, status, header) => {
			if (response) this.photos.push(JSON.parse(response));
		};
	}
}
