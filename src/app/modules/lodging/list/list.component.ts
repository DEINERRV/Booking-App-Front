import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CardComponent } from '../components/card/card.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { BottomNavComponent } from '../../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, CardComponent, FilterComponent, BottomNavComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

}
