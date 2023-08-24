import * as S from '../styles/Auth.styled';
import {AuthContainer} from '../containers/AuthContainer';
import {SIGNIN_PROPS} from '../constants/authProps';

export const Signin = () => {
    document.title = SIGNIN_PROPS.title;

    return (
        <S.AuthPageStyled>
            <AuthContainer {...SIGNIN_PROPS} />
        </S.AuthPageStyled>
    );
};
