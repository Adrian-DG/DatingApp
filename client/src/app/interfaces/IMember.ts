import { IPhoto } from "./IPhoto";

export interface IMember {
	id: number;
	username: string;
	photoUrl: string;
	age: number;
	knowAs: string;
	created: Date;
	lastActive: Date;
	gender: string;
	introduction: string;
	lookingFor: string;
	interest: string;
	city: string;
	photos: IPhoto[];
}
