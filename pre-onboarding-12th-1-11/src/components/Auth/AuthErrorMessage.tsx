import {memo} from 'react';
import * as S from '../../styles/Auth.styled';

export const AuthErrorMessage = memo(({message}: {message: string}) => {
    console.info('AuthErrorMessage re-rendering');

    return <S.AuthErrorMessageStyled>{message}</S.AuthErrorMessageStyled>;
});
