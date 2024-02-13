import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  lastScrollTop: number = 0;
  lastScrollTime: number = performance.now();
  isShow: boolean = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(window.scrollY < this.lastScrollTop){
      this.isShow = true;
      this.lastScrollTop = window.scrollY;
      console.log("BBB");
      return;
    }
      

    console.log("AAA");

    let scrollTop = window.scrollY;
    let currentTime = performance.now();
    let scrollDistance = Math.abs(scrollTop - this.lastScrollTop);
    let scrollTime = currentTime - this.lastScrollTime;

    // Calcular velocidad del scroll en píxeles por milisegundo
    let scrollSpeed = scrollDistance / scrollTime;

    // Comparar la velocidad del scroll con un umbral predefinido
    let fastScrollThreshold = 1.0;

    if (scrollSpeed > fastScrollThreshold) {
      this.isShow = false;
    }

    // Actualizar la posición y el tiempo del scroll
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    this.lastScrollTime = currentTime;
  }
}
