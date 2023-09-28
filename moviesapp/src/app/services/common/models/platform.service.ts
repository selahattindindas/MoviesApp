import { Injectable } from '@angular/core';
import { PlatformDescription, PlatformEnum } from 'src/app/enums/Platform';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor() { }
  getPlatformEnumValues(): PlatformEnum[] {
    const enumValues = Object.values(PlatformEnum) as PlatformEnum[];
    return enumValues.filter((value) => typeof value === 'number');
  }
  getPlatformDescriptions(): { [key in number]: string } {
    return PlatformDescription;
  }
}
