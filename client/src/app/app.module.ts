import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { MenbersListComponent } from "./components/menbers-list/menbers-list.component";
import { MenbersDetailsComponent } from "./components/menbers-details/menbers-details.component";
import { ListComponent } from "./components/list/list.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { SharedModule } from "./modules/shared.module";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		RegisterComponent,
		MenbersListComponent,
		MenbersDetailsComponent,
		ListComponent,
		MessagesComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
