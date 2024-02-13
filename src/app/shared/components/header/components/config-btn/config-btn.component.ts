import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroUserSolid, heroBars3Solid} from '@ng-icons/heroicons/solid'

@Component({
  selector: 'app-config-btn',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ heroUserSolid, heroBars3Solid})],
  templateUrl: './config-btn.component.html',
  styleUrl: './config-btn.component.scss'
})
export class ConfigBtnComponent {
  isOpen:boolean = false;
}
