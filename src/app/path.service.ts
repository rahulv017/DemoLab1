import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  path:string;
  port:string;
  constructor() { }

  getPath()
  {
    return this.path;
  }

  setPath(data:string)
  {
    this.path=data;
  }

  getPort()
  {
    return this.port;
  }
  setPort(data)
  {
    this.port=data;
  }
}
