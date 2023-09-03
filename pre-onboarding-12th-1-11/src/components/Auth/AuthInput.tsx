import {Input} from '../Common/Input';
import * as S from '../../styles/Auth.styled';
import {AuthErrorMessage} from './AuthErrorMessage';
import {AuthInputProps} from '../../types/AuthTypes';

export const AuthInput = ({
    email,
    handleEmail,
    password,
    handlePassword,
    errorMessage,
}: AuthInputProps) => {
    console.info('AuthInput re-rendering');

    return (
        <S.AuthInputStyled>
            <Input
                label='이메일'
                id='eamil'
                type='text'
                testid='email-input'
                placeholder='이메일을 입력해주세요.'
                value={email}
                onChange={handleEmail}
            />
            <AuthErrorMessage message={email === '' ? '' : errorMessage.emailError} />
            <Input
                label='비밀번호'
                id='password'
                type='password'
                testid='password-input'
                placeholder='비밀번호를 입력해주세요.'
                value={password}
                onChange={handlePassword}
            />
            <AuthErrorMessage message={password === '' ? '' : errorMessage.passwordError} />
        </S.AuthInputStyled>
    );
};
