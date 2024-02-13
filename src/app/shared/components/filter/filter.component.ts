import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FilterBtnComponent } from '../filter-btn/filter-btn.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionBedOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIconComponent, FilterBtnComponent],
  providers: [provideIcons({ ionBedOutline})],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterComponent {

}
