$(document).ready(() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    const namePattern = /^[A-Za-z]+$/;
    const passwordPattern = /^.{6,16}$/; 


    const validateLogin = () => {
        let valid = true;


        const email = $("#email").val().trim();
        if (!emailPattern.test(email)) {
            $("#emailError").text("Enter a valid Northeastern email.");
            valid = false;
        } else {
            $("#emailError").text("");
        }


        const username = $("#username").val().trim();
        if (!namePattern.test(username)) {
            $("#usernameError").text("Username must contain only letters.");
            valid = false;
        } else {
            $("#usernameError").text("");
        }


        const password = $("#password").val();
        if (!passwordPattern.test(password)) {
            $("#passwordError").text("Password must be between 6 and 16 characters.");
            valid = false;
        } else {
            $("#passwordError").text("");
        }

        const confirmPassword = $("#confirmPassword").val();
        if (confirmPassword !== password) {
            $("#confirmPasswordError").text("Passwords do not match.");
            valid = false;
        } else {
            $("#confirmPasswordError").text("");
        }


        $("#loginBtn").prop("disabled", !valid);
    };


    $("#email, #username, #password, #confirmPassword").on("input", validateLogin);


    $("#loginBtn").click(() => {
        $("#loginPage").hide();
        $("#calculatorPage").show();
        $("#loggedInUser").text($("#username").val());
    });


    const calculate = (op) => {
        let num1 = $("#num1").val().trim();
        let num2 = $("#num2").val().trim();
        let valid = true;


        if (!/^-?\d+(\.\d+)?$/.test(num1)) {
            $("#num1Error").text("Enter a valid number.");
            valid = false;
        } else {
            $("#num1Error").text("");
        }

        if (!/^-?\d+(\.\d+)?$/.test(num2)) {
            $("#num2Error").text("Enter a valid number.");
            valid = false;
        } else {
            $("#num2Error").text("");
        }

        if (!valid) return;


        num1 = parseFloat(num1);
        num2 = parseFloat(num2);


        const compute = (a, b, operator) => ({
            add: a + b,
            subtract: a - b,
            multiply: a * b,
            divide: b !== 0 ? a / b : "Cannot divide by zero"
        })[operator];

        $("#result").val(compute(num1, num2, op));
    };

    $(".operation").click(function () {
        calculate($(this).data("op"));
    });
});
 