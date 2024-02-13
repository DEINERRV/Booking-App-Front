import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass, heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { ionBedOutline } from '@ng-icons/ionicons';
import { ConfigBtnComponent } from './components/config-btn/config-btn.component';
import { FilterBtnComponent } from '../filter-btn/filter-btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent,ConfigBtnComponent, FilterBtnComponent],
  providers: [provideIcons({ heroMagnifyingGlass, heroAdjustmentsHorizontal, ionBedOutline})],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
}
