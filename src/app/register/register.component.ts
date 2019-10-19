import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface UserData {
  phone: number;
  cpf: number;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
    cpf: new FormControl(''),
  });

  constructor(
    private registerService: RegisterService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.setPhoneNumber();
  }

  register(userData: UserData) {
    this.http.post(`${ environment.API }/auth`, userData).subscribe(
      res => console.log('Cadastrado bem sucedido.'),
      err => console.error(err)
    );
  }

  getNumberParam() {
    // Passar apenas um parâmetro
    return window.location.href.split('?')[1].replace('number=', '');
  }

  private setPhoneNumber() {
    this.registerForm.patchValue({
      phone: atob(this.getNumberParam())
    });
  }

}
