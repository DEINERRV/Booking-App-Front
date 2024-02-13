import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LodgingService {
  private _http = inject(HttpClient);
  private urlBase: string = 'http://localhost:8080/lodgings';
}