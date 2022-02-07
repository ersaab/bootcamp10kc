import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  localStorage = window.localStorage;
  sessionStorage = window.sessionStorage;


  constructor() { }

  setItem(key: any, data: any) {
    this.localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: any) {
    return JSON.parse(this.localStorage.getItem(key));
  }

  removeItem(key: any) {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }


  setSessionItem(key: any, data: any) {
    this.sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSessionItem(key: any) {
    return JSON.parse(this.sessionStorage.getItem(key));
  }

  removeSessionItem(key: any) {
    this.sessionStorage.removeItem(key);
  }

  clearSession() {
    this.sessionStorage.clear();
  }



}
