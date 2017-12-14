import { Injectable } from '@angular/core';

@Injectable()
export class RandomStringService {

  constructor() {
  }

  public  randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const string_length = 8;
    let randomString = '';
    for (let i = 0; i < string_length; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      randomString += chars.substring(randomNum, randomNum + 1);
    }
    return randomString;
  }
}
