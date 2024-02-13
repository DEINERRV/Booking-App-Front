import { Injectable, PLATFORM_ID, Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  private L: any = null
  private isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.isBrowser = true;
    }
  }

  getLeaflet(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Si la variable ya está asignada, resuelve la promesa inmediatamente
      if (this.L) {
        resolve(this.L);
      }
      else if(this.isBrowser){
        // Si la variable aún no está asignada, espera a que la importación se complete
        import('leaflet').then( lib => {
          this.L = lib;
          resolve(this.L);
        })
        .catch(error => reject(error));
      }
      else{
        reject(new Error("No Browser"));
      }
    });
  }
  
}