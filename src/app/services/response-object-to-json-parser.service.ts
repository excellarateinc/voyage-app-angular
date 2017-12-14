import { Injectable } from '@angular/core';

@Injectable()
export class ResponseObjectToJsonParserService {

  constructor() { }

  public parseResponseObjectToJson(response) {
    return JSON.parse(response._body);
  }
}
