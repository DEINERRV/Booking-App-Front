import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, numberAttribute, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardComponent implements OnInit {
  @Input({ required: true, alias:'card-id', transform: numberAttribute}) id!: number;
  private platformId: any = inject(PLATFORM_ID);
  
  ngOnInit (): void {
    if(!isPlatformBrowser(this.platformId))
      return;

    const swiper: SwiperContainer | null = document.querySelector(".card-id-"+this.id);
    const swiperParams: SwiperOptions = {
      navigation:{
        nextEl: ".swiper-btn-next-"+this.id,
        prevEl: ".swiper-btn-prev-"+this.id
      },
      pagination:{
        dynamicBullets: true,
        dynamicMainBullets: 1
      }
    };
    
    Object.assign(swiper!, swiperParams);
    swiper?.initialize();
  }
}
