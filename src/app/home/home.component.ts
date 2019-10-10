import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../shared/data-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   private photos = [];
  constructor(private dataAccessService: DataAccessService) { }

  ngOnInit() {
     this.dataAccessService.getUsers().subscribe(
                (data:any[]) => {
                  console.log(data);
                  this.photos = data;
      });
  }
}
