import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { FilterModalComponent } from '../header/components/filter-modal/filter-modal.component';

@Component({
  selector: 'app-filter-btn',
  standalone: true,
  imports: [NgIconComponent, DialogModule],
  providers: [provideIcons({ heroAdjustmentsHorizontal})],
  templateUrl: './filter-btn.component.html',
  styleUrl: './filter-btn.component.scss'
})
export class FilterBtnComponent {

  private _dialog: Dialog = inject(Dialog);

  openDialog(): void {
    const dialogRef = this._dialog.open(FilterModalComponent, {
      width: '50rem'
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
