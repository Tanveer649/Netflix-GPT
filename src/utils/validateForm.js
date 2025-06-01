const ValidateForm = (emailOrPhone, password, fullName, MobileNo, isSignInForm) => {
    // console.log('Validate Function', emailOrPhone, password, fullName, MobileNo)
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailOrPhone);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isPhoneNumberValid = /^\d{10}$/.test(emailOrPhone); 
    
    if (isSignInForm) {
        if (!isEmailValid && !isPhoneNumberValid) return "Enter a valid Email ID or Phone Number.";
        if (!isPasswordValid) return "Password is not Valid.";
    }
    else {
        const isFullNameValid = /^[A-Za-z\s]{3,30}$/.test(fullName); // Fixed regex for full name
        const isMobileNoValid = /^\d{10}$/.test(MobileNo);

        // console.log(!isEmailValid, !isPasswordValid, !isMobileNoValid, isFullNameValid,isSignInForm)

        if (!isFullNameValid) return "Name is not Valid.";
        if (!isEmailValid) return "Email is not Valid.";
        if (!isPasswordValid) return "Password is not Valid.";
        if (!isMobileNoValid) return "Phone Number is not Valid.";
    }
    return null ;
};

export default ValidateForm;
