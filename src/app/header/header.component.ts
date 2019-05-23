import { DataStorageService } from './../services/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) {}
  ngOnInit() {
  }

  saveData() {
    this.dataStorageService.storeData().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  fetchData() {
    this.dataStorageService.getRecipies();
  }
}
