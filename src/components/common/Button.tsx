// react import
import {memo} from 'react';
// type, style import
import {ButtonProps} from '../../types/CommonTypes';
import * as S from '../../styles/Common.styled';

export const Button = memo(({type, testid, disabled}: ButtonProps) => {
    console.info('Button re-rendering');

    return (
        <S.ButtonStyled type='submit' data-testid={testid} disabled={disabled}>
            {type}
        </S.ButtonStyled>
    );
});
