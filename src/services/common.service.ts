import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isSidebarOpen: boolean = false;

  constructor() { }
}
