import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @Input()
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm:FormGroup;
  comment:Comment[];
  rating: number;
  @ViewChild('fform') feedbackFormDirective;
  constructor(private fb:FormBuilder, private dishservice: DishService, private route: ActivatedRoute, private location: Location) {
      this.createForm();
  }

  ngOnInit(): void {
    this.rating = 5;
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    
  }
   
  updateSetting(event: MatSliderChange) {
    console.log(event);
  }

  createForm():void{
     this.commentForm = this.fb.group({
       name:['',[Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
       comment: ['',[Validators.required, Validators.minLength(10)]]
     })
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  handleSubmit(){
    console.log(this.commentForm.value);
    // this.comment.push()
    this.commentForm.reset();
  }  
}
