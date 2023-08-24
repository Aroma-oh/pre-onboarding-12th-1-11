import { AxiosResponse } from 'axios';
import { ChangeEvent } from 'react';

export interface AuthPageProps {
  api: (email: string, password: string) => Promise<AxiosResponse<string, string> | undefined>;
  title: string;
  navigation: string;
  link: string;
  buttonType: string;
  footerType: string;
  testid: string;
  footerText: string;
}

export interface AuthInputProps {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: {
    emailError: string;
    passwordError: string;
  };
}

export interface AuthFooterProps {
  text: string;
  type: string;
  route: string;
}
