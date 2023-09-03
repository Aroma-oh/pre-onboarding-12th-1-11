import styled from 'styled-components';

export const InputStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
        color: var(--dark-gray);
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
    }

    input {
        padding: 14px 11px 13px 11px;
        border-radius: 5px;
        border: 1px solid var(--light-gray);
        background: var(--white);
    }

    input::placeholder {
        color: var(--dark-gray);
        font-size: 16px;
        font-weight: 400;
    }
`;

export const ButtonStyled = styled.button`
    margin: 10px 0;
    padding: 14.5px 120.4px 17.5px 120.6px;
    width: 300px;
    height: 50px;

    line-height: 170%;

    border: none;
    border-radius: 25px;

    background: var(--blue);
    color: var(--white);

    cursor: pointer;

    &:disabled {
        background: var(--light-gray);
        color: var(--dark-gray);
    }
`;
