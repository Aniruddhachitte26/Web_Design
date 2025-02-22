$(document).ready(() => {
    // Constants for validation patterns
    const PATTERNS = {
        email: /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/,
        name: /^[A-Za-z]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,16}$/,
        number: /^-?\d+(\.\d+)?$/
    };

    // Login form validation
    const validateLogin = () => {
        let valid = true;
        
        // Validate email
        const email = $("#email").val().trim();
        if (!PATTERNS.email.test(email)) {
            $("#emailError").text("Enter a valid Northeastern email.");
            valid = false;
        } else {
            $("#emailError").text("");
        }
        
        // Validate username
        const username = $("#username").val().trim();
        if (!PATTERNS.name.test(username)) {
            $("#usernameError").text("Username must contain only letters.");
            valid = false;
        } else {
            $("#usernameError").text("");
        }
        
        // Validate password
        const password = $("#password").val();
        if (!PATTERNS.password.test(password)) {
            $("#passwordError").text(
                "Password must be at least 6 and max of 16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, ?, &)."
            );
            valid = false;
        } else {
            $("#passwordError").text("");
        }
        
        // Validate confirm password
        const confirmPassword = $("#confirmPassword").val();
        if (confirmPassword !== password) {
            $("#confirmPasswordError").text("Passwords do not match.");
            valid = false;
        } else {
            $("#confirmPasswordError").text("");
        }
        
        // Enable/disable login button based on validation
        $("#loginBtn").prop("disabled", !valid);
    };

    // Calculator functions
    const compute = (a, b, operator) => {
        switch (operator) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                if (a===0 || b === 0) {
                    return "Cannot divide by zero";
                }
                return a / b;
            default:
                return "Invalid operator";
        }
    };

    const calculate = (op) => {
        let num1 = $("#num1").val().trim();
        let num2 = $("#num2").val().trim();
        let valid = true;
        
        // Validate input numbers
        if (!PATTERNS.number.test(num1)) {
            $("#num1Error").text("Enter a valid number.");
            valid = false;
        } else {
            $("#num1Error").text("");
        }
        
        if (!PATTERNS.number.test(num2)) {
            $("#num2Error").text("Enter a valid number.");
            valid = false;
        } else {
            $("#num2Error").text("");
        }
        
        if (!valid) return;
        
        // Parse numbers and check for infinity
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        
        // Clear previous error messages
        $("#resultError").text("");
        
        // Check for infinite values
        if (!isFinite(num1) || !isFinite(num2)) {
            $("#result").val("");
            $("#resultError").text("Cannot be computed: Input values are too large");
            return;
        }
        
        // Compute and display result
        const result = compute(num1, num2, op);
        $("#result").val(result);
    };

    // Event Handlers
    $("#email, #username, #password, #confirmPassword").on("input", validateLogin);
    
    $("#loginBtn").click(() => {
        $("#loginPage").hide();
        $("#calculatorPage").show();
        $("#loggedInUser").text($("#username").val());
    });
    
    $(".operation").click(function() {
        calculate($(this).data("op"));
    });
});