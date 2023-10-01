import { Component, OnInit } from '@angular/core';
import { List_Platform } from 'src/app/contracts/platform/list-platform';
import { PlatformService } from 'src/app/services/common/models/platform.service';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.css']
})
export class PlatformListComponent implements OnInit {
  platform: List_Platform[];
  filterText: string;
  filterName: keyof List_Platform = 'name';
  constructor(private platformService: PlatformService){}
  ngOnInit(): void {
    this.getPlatform();
  }
  async getPlatform(){
    const platformData: Partial<List_Platform[]> = await this.platformService.get();
    this.platform = platformData as List_Platform[];
  }
  deletePlatform(id: string) {
    this.platformService.delete(id).then(() => {
      this.getPlatform();
    });
  }
}
