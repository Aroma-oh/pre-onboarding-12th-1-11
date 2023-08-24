import styled from 'styled-components';

export const AuthPageStyled = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

export const AuthContainerStyled = styled.div`
    width: 300px;
    height: 374.44px;
`;

export const AuthTitleStyled = styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 25.44px;
`;

export const AuthInputStyled = styled.div``;
export const AuthErrorMessageStyled = styled.div`
    margin: 5px 0 20px 0;
    font-size: 12px;
    font-weight: 400;
    color: var(--red);
`;
export const AuthFooterStyled = styled.div`
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    span {
        color: var(--dark-gray);
    }
    .link {
        color: var(--blue);
    }
`;
