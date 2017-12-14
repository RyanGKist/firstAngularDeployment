import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  updateTask = {
    req_goal: ''
  };
  user;
  id;
  UserInfo;

  constructor(private _route: ActivatedRoute, private _appService: AppService, private _router: Router) { 
    this._route.paramMap.subscribe( params => this.id = params.get('id'))
  }

  ngOnInit() {
    this._appService.findOne(this.id);
    this._appService.user.subscribe(
      (data) => {this.UserInfo = data}  
    )
  }

  onSubmit(){
    this._appService.editTask(this.id, this.updateTask);
    this._appService.retrieveAll();
    this._router.navigate(['']);
  }
  cancel(){
    this._router.navigate(['']);
  }
}
