import { DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss'
})
export class FilterModalComponent implements OnInit{
  private _dialogRef: DialogRef = inject(DialogRef);
  
  @ViewChild("fromSlider") fromSlider!: ElementRef;
  @ViewChild("toSlider") toSlider!: ElementRef;

  ngOnInit(): void {
    this.fromSlider.nativeElement.value = 100;
    this.toSlider.nativeElement.value = 1500;
  }

  close(){
    this._dialogRef.close("Cerrado");
  }

  a(e:any){
    console.log(e);
  }

  controlFromSlider(value: string) {
    const to = this.getParsed(this.toSlider.nativeElement.value)
    const from = this.getParsed(value);
    if (from > to) {
      this.fromSlider.nativeElement.value = to - 100;
    } else {
      this.fromSlider.nativeElement.value = from;
    }
  }
  
  controlToSlider(value: string) {
    const from = this.getParsed(this.fromSlider.nativeElement.value)
    const to = this.getParsed(value);
    if (from <= to) {
      this.toSlider.nativeElement.value = to;
    } else {
      this.toSlider.nativeElement.value = from + 100;
    }
  }

  private getParsed(number: string) {
    return parseInt(number, 10);
  }
}
