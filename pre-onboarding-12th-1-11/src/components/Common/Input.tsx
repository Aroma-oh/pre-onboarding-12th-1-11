import * as S from '../../styles/Common.styled';
import {InputProps} from '../../types/CommonTypes';

export const Input = ({label, testid, id, type, placeholder, value, onChange}: InputProps) => {
    return (
        <S.InputStyled>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                data-testid={testid}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </S.InputStyled>
    );
};
