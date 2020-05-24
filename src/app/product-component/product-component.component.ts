import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  Name: AbstractControl;
  id: AbstractControl;
  math: AbstractControl;
  English: AbstractControl;
  users$: Observable<User>;
  currentUser: User;
  baseUrl = 'http://127.0.0.1:8080/';
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'Name': [''],
      'id': [''],
      'math': [''],
      'English':['']
    });
    this.Name = this.myForm.controls['Name']
    this.id = this.myForm.controls['id']
    this.math = this.myForm.controls['math']
    this.English = this.myForm.controls['English']
  } 
  ngOnInit(): void {
  
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  }

  search() {
    if (this.id.value) {
      this.users$ =
        <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' +
          this.id.value);
    } else {
      this.users$ =
        <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
    }

  }
  add() {
    // 通过在html表单中的input设置name属性的值，与服务器接收对象的属性值一致，这样表单的value属性就是一个接收对象
    console.log(this.myForm.value);
    // 对于可观察对象执行，我们需要订阅其结果
    this.httpClient.post(this.baseUrl + 'user',
      this.myForm.value).subscribe(
        (val: any) => { // val是服务器返回的值
          if (val.succ) {
            alert('添加成功!');
          }
        }
      );
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'user/' +
        this.currentUser.id).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('删除成功!');
            }
          }
        )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'user',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('修改成功!');
            }
          }
        )
    }
  }

}
  

  


   
