import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  newTask = {name:'',
            req_goal:''};
  data = [];

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.tasks.subscribe(
      (data) => {this.data = data}
    )
  }
  onSubmit(){
    this._appService.createTask(this.newTask);
    this.newTask = {name: '', req_goal: ''};

  }
  delete(data){
    this._appService.deleteTask(data);
  }

}
