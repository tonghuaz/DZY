import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;

  userName: AbstractControl;
  password: AbstractControl;

  name$: Observable<string>;
  baseUrl = 'http://127.0.0.1:8080/';

  constructor(private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['tonghua', Validators.compose([Validators.required, userNameValidator])],
        'password': ['123456', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    })
  }
  ngOnInit(): void {
  }

  login() {
    // 对于可观察对象执行，我们需要订阅其结果
    this.httpClient.post(this.baseUrl + 'admin',
      this.myForm.value).subscribe(
        (val: any) => { // val是服务器返回的值
          console.log(val);
           if (val.succ) {
             this.authService.login();
             this.router.navigate(['/management']);
           }
        }
      );


  }


}



