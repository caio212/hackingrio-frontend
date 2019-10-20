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

  registered: boolean;

  constructor(
    private registerService: RegisterService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.setPhoneNumber();
  }

  register(userData: UserData) {
    const params = this.getParams();
    this.http.post(`${ environment.API }/auth`, userData).subscribe(
      res => console.log(params.registered ? 'Verificação bem sucedida' : 'Cadastro bem sucedido.'),
      err => console.error(err)
    );
  }

  getParams() {
    const params = {} as any;
    window.location.href
      .split('?')[1]
      .split('&')
      .map(str => str.split('=').map(str => str.replace(/%3D/g, '=')))
      .forEach(pair => params[pair[0]] = pair[1] === 'true' ? true : (pair[1] === 'false' ? false : pair[1]));
    this.registered = params.registered;
    return params;
  }

  private setPhoneNumber() {
    const params = this.getParams();
    this.registerForm.patchValue({
      phone: atob(params.phone)
    });
  }

}
