export const emailValidation = (email: string) => {
    return !!email.includes('@');
};

export const passwordValidation = (password: string) => {
    return password.length >= 8;
};
