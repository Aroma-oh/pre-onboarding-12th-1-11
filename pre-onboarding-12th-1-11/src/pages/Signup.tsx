import * as S from '../styles/Auth.styled';
import {AuthContainer} from '../containers/AuthContainer';
import {SIGNUP_PROPS} from '../constants/authProps';

export const Signup = () => {
    document.title = SIGNUP_PROPS.title;

    return (
        <S.AuthPageStyled>
            <AuthContainer {...SIGNUP_PROPS} />
        </S.AuthPageStyled>
    );
};
