function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateFullName(fullName) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(fullName);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

module.exports = {
    validateEmail,
    validateFullName,
    validatePassword
};
