const nameRegex = /^[a-zA-Z\s'À-ỹ]+$/;

export const CheckNameRegex = (text) => {
    return nameRegex.test(text);
}
