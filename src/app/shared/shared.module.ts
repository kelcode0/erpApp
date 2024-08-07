import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class SharedModule {}
