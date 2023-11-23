const nameRegex = /^[a-zA-Z\s'À-ỹ]+$/;
const PhoneNumberRegex = /^0(?:[3-9]\d{8}|1\d{9})$/;

export const CheckNameRegex = (text) => {
    return nameRegex.test(text);
}

export const CheckPhoneNumberRegex = (text) => {
    return PhoneNumberRegex.test(text);
}

