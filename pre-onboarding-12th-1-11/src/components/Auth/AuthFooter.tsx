// react, router import
import {memo} from 'react';
import {Link} from 'react-router-dom';
// style, type imort
import * as S from '../../styles/Auth.styled';
import {AuthFooterProps} from '../../types/AuthTypes';

export const AuthFooter = memo(({text, type, route}: AuthFooterProps) => {
    console.info('AuthFooter re-rendering');

    return (
        <S.AuthFooterStyled>
            <span>{text}</span>
            <Link to={route} className='link'>
                {type}
            </Link>
        </S.AuthFooterStyled>
    );
});
