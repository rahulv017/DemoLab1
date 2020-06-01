import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  path:string;
  constructor() { }

  getPath()
  {
    return this.path;
  }

  setPath(data:string)
  {
    this.path=data;
  }
}
