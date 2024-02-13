import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  
  months: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December" ];
  daysOfWeeks: string[] = ["Mo","Tu","We","Th","Fr","Sa","Su"];

  yaer!: number;
  month!: number;
  day!: number;

  firstMonthWeeks!: Day[][];
  secondMonthWeeks!: Day[][];

  startDate!: DayRange | null;
  endDate!: DayRange | null;

  shouldDisableDates: boolean = false;
  firstBusyDay: Date | null = new Date(2024,2,23);

  isSecondClick: boolean = false;
  

  ngOnInit(): void {
    var date = new Date();

    this.yaer = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDay();

    this.firstMonthWeeks = this.getMonthWeeks(this.yaer, this.month);
    this.secondMonthWeeks = this.getMonthWeeks(this.yaer, this.month+1);
  }

  private getMonthWeeks( year: number, month: number): Day[][]{
    var date = new Date(year, month+1, 0);
    var arr: Day[][] = [];

    var firstDayOfMonth = new Date(year, month, 1).getDay();
    var lastDayOfMonth = date.getDate();
    var rows = this.getNumberOfWeeks(year, month);
    
    var day = 1;
    for(var i = 0; i<rows; i++){
      var j = 0;
      if(i == 0)
        j = firstDayOfMonth == 0? 6 : firstDayOfMonth-1;

      var arrAux = [];
      while(j<7 && day <= lastDayOfMonth){
        arrAux.push({
          date: new Date(year, month, day),
          isFree: true, 
          inRange: false
        });
        day++;
        j++;
      }
      arr.push(arrAux);
    }
    return arr;
  }

  private getNumberOfWeeks( year: number, month: number): number{
    var date = new Date(year, month+1, 0);
    var date2 = new Date(year, month, 1);
    return (date.getDate()+date2.getDate())/7;
  }

  nextMonth(){
    this.firstMonthWeeks = this.secondMonthWeeks;
    this.secondMonthWeeks = this.getMonthWeeks(this.yaer,this.month+2);
    var date = new Date(this.yaer, this.month+1);
    this.yaer = date.getFullYear();
    this.month = date.getMonth();
  }

  prevMonth(){
    this.secondMonthWeeks = this.firstMonthWeeks;
    this.firstMonthWeeks = this.getMonthWeeks(this.yaer, this.month-1);
    var date = new Date(this.yaer, this.month-1);
    this.yaer = date.getFullYear();
    this.month = date.getMonth();
  }

  updateRangeHover(day: Day){
    if(!this.isSecondClick)
      return
    this.endDate = {date: day.date, clicked: false};
  }

  assignClickedDate(day: Day){
    if(this.startDate && this.isSecondClick){
      if(day.date > this.startDate.date)
        this.endDate = {date: day.date, clicked: true};
    }
    else{
      this.startDate = {date: day.date, clicked: true};
      this.endDate = null;
    }

    this.shouldDisableDates = true;
    this.isSecondClick = !this.isSecondClick;
  }

  isDateInRange(date: Date): boolean{
    if(!this.startDate || !this.endDate)
      return false;
    if(date >= this.startDate.date && date <= this.endDate.date)
      return true;
    return false
  }

  isDateRangeDay(date: Date): boolean{
    if(this.startDate)
      if(date == this.startDate.date && this.startDate.clicked)
        return true;
    if(this.endDate)
      if(date == this.endDate.date && this.endDate.clicked)
        return true;
    return false
  }

  isStartRangeDate(date: Date){
    if(this.startDate)
      if(date == this.startDate.date)
        return true;
    return false;
  }

  isEndRangeDate(date: Date){
    if(this.endDate)
      if(date == this.endDate.date)
        return true;
    return false
  }

  shouldBeDiabled(date: Date): boolean{
    if(!this.shouldDisableDates)
      return false;

    if(this.startDate){
      if(date < this.startDate.date)
        return true;
    }
    
    if(this.firstBusyDay){
      if(date >= this.firstBusyDay)
        return true;
    }

    return false;  
  }
 
}

interface Day{
  date: Date,
  isFree: boolean
}

interface DayRange{
  date: Date,
  clicked: boolean
}