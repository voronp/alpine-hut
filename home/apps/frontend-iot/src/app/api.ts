import { environment } from '../environments/environment';

export type AuthResponse = {
  access_token: string,
}

interface IApi {
  baseUrl: string
  get: <T>(url:string) => Promise<T>
  post: <T>(url:string, data:unknown) => Promise<T>
  login: (login:string, password:string) => Promise<AuthResponse>
  logout: () => Promise<unknown>
}

class Api implements IApi {
  baseUrl:string;

  constructor(baseUrl:string) {
    this.baseUrl = baseUrl
  }
  get<T>(url:string):Promise<T> {
    return window.fetch(this.baseUrl+url).then(res => res.json())
  }
  post<T>(url, data):Promise<T> {
    return window.fetch(this.baseUrl+url, data).then(res => res.json())
  }
  login(login:string, password:string) {
    const form = new URLSearchParams();
    form.append('username', login)
    form.append('password', password)
    return this.post<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: form,
    })
  }
  logout() {
    return this.get('/api/auth/logout')
  }
}

export const api = new Api(environment.httpUrl);
