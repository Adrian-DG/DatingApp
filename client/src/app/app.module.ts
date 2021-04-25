import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { MemberCardComponent } from "./components/member-card/member-card/member-card.component";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

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
		MemberCardComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		SharedModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
