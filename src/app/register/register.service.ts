import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface UserData {
  phone: number;
  cpf: number;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(userData: UserData) {
    return this.http.post(`${ environment.API }/auth`, userData);
  }

}
