import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import { HomepageComponent } from '../../pages/homepage/homepage.component';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterLink, NgFor],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

}
