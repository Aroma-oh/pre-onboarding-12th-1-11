// component import 
import { AuthTitle } from '../components/Auth/AuthTitle';
import { AuthInput } from '../components/Auth/AuthInput';
import { Button } from '../components/Common/Button';
import { AuthFooter } from '../components/Auth/AuthFooter';
import * as S from '../styles/Auth.styled';

// custom hook, api, validation import 
import { useInput } from '../hooks/useInput';
import { emailValidation, passwordValidation } from '../utils/validation';

// library import 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// constant data import 
import { EMAIL_VALIDATION_MSG, PASSWORD_VALIDATION_MSG } from '../constants/message';

// types import
import { AuthPageProps } from '../types/AuthTypes';

export const AuthContainer = ({ api, title, navigation, link, buttonType, footerType, testid, footerText }: AuthPageProps) => {
  const navigate = useNavigate();

  const [email, handleEmail] = useInput('');
  const [password, handlePassword] = useInput('');

  // 에러 메시지 관리 방안 고민중 
  const [errorMessage, setErrorMessage] = useState({
    emailError: '',
    passwordError: '',
  })

  const isEmailValid = emailValidation(email)
  const isPasswordValid = passwordValidation(password)

  useEffect(() => {
    const updatedErrorMessage = {
      ...errorMessage,
      emailError: isEmailValid ? '' : EMAIL_VALIDATION_MSG,
      passwordError: isPasswordValid ? '' : PASSWORD_VALIDATION_MSG
    };

    setErrorMessage(updatedErrorMessage);

  }, [isEmailValid, isPasswordValid]);


  // 렌더링 최적화 실패
  const handleSubmit = async () => {
    await api(email, password);
    navigate(navigation);
  }

  return (
    <S.AuthContainerStyled>
      <AuthTitle title={title} />
      <form onSubmit={handleSubmit}>
        <AuthInput
          email={email}
          handleEmail={handleEmail}
          password={password}
          handlePassword={handlePassword}
          errorMessage={errorMessage}
        />
        <Button
          type={buttonType}
          testid={testid}
          disabled={!emailValidation(email) || !passwordValidation(password)}
        />
      </form>
      <AuthFooter
        text={footerText}
        type={footerType}
        route={link}
      />
    </S.AuthContainerStyled>

  )
}