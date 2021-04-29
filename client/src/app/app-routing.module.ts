import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ListComponent } from "./components/list/list.component";
import { MemberEditComponent } from "./components/member-edit/member-edit.component";
import { MenbersDetailsComponent } from "./components/menbers-details/menbers-details.component";
import { MenbersListComponent } from "./components/menbers-list/menbers-list.component";
import { MessagesComponent } from "./components/messages/messages.component";

import { AuthGuard } from "./guards/auth.guard";
import { PreventUnsavedChangesGuard } from "./guards/prevent-unsaved-changes.guard";

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", component: HomeComponent },
	{
		path: "",
		runGuardsAndResolvers: "always",
		canActivate: [AuthGuard],
		children: [
			{
				path: "members",
				component: MenbersListComponent,
			},
			{
				path: "members/:username",
				component: MenbersDetailsComponent,
			},
			{
				path: "member/edit",
				component: MemberEditComponent,
				canDeactivate: [PreventUnsavedChangesGuard],
			},
			{ path: "list", component: ListComponent },
			{
				path: "messages",
				component: MessagesComponent,
			},
		],
	},

	{ path: "**", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
