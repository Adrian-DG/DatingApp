import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../components/member-edit/member-edit.component";

@Injectable({
	providedIn: "root",
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
	canDeactivate(component: MemberEditComponent): boolean {
		if (component.editForm.dirty) {
			return confirm(
				"Are you sure you want to continue ? any changes will be lost"
			);
		}

		return true;
	}
}
