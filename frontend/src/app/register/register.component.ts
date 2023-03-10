import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';

interface responseToken {
  token?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router, private _snackBar: MatSnackBar) { }

  formRegister = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  submit() {
    if (this.formRegister.valid) {
      this.loginService.register(this.formRegister.value).subscribe((response:responseToken) =>{
        if (response) {
          localStorage.setItem('aut',JSON.stringify(response.token))
          this.openSnackBar("Se ha registrado satisfactoriamente", "OK")
          this.router.navigate(['/'])
        }
      })
    }
  }

}
