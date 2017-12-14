import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
id;
UserInfo;
  constructor(private _appService : AppService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe( params => this.id = params.get('id'))
  }

  ngOnInit() {
    this._appService.findOne(this.id);
    this._appService.user.subscribe(
      (data) => {this.UserInfo = data})  
  }

}
