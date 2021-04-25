import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
	NgxGalleryAnimation,
	NgxGalleryImage,
	NgxGalleryOptions,
} from "@kolkov/ngx-gallery";
import { IMember } from "src/app/interfaces/IMember";
import { IPhoto } from "src/app/interfaces/IPhoto";
import { MemberService } from "src/app/services/member/member.service";

@Component({
	selector: "app-menbers-details",
	templateUrl: "./menbers-details.component.html",
	styleUrls: ["./menbers-details.component.css"],
})
export class MenbersDetailsComponent implements OnInit {
	member?: IMember;
	galleryOptions?: NgxGalleryOptions[];
	galleryImages?: NgxGalleryImage[];

	constructor(
		private $route: ActivatedRoute,
		private _memberService: MemberService
	) {}

	ngOnInit(): void {
		this.loadMember();

		this.galleryOptions = [
			{
				width: "600px",
				height: "400px",
				thumbnailsColumns: 4,
				imageAnimation: NgxGalleryAnimation.Slide,
			},
		];
	}

	loadMember(): void {
		let username = this.$route.snapshot.paramMap.get("username");
		if (username) {
			this._memberService
				.getMemberByUsername(username)
				.subscribe((resp: IMember) => {
					this.member = resp;
					this.galleryImages = this.getImages();
				});
		}
	}

	getImages(): NgxGalleryImage[] {
		const photos = this.member?.photos;
		const imageUrls = [];
		if (photos) {
			for (const photo of photos) {
				imageUrls.push({
					small: photo?.url,
					medium: photo?.url,
					big: photo?.url,
				});
			}
		}

		return imageUrls;
	}
}
