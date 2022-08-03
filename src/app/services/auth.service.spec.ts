import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('Test for login', () => {
    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: 'token 123',
      };
      // Act
      const email = 'correo@gmail.com';
      const password = 'password';
      authService.login(email, password).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });

    it('should call to saveToken', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: 'token 123',
      };
      // Act
      const email = 'correo@gmail.com';
      const password = 'password';
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(
          mockData.access_token
        );
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });
  });
});
