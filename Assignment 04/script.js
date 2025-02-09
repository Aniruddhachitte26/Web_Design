document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitButton = form.querySelector("input[type='submit']");
  const inputs = form.querySelectorAll("input, textarea, select");
  const interactedFields = new Set();

  // Function to validate individual fields
  function validateField(field) {
    let isValid = true;
    let errorMessage = "";
    const errorSpan = document.querySelector(`#${field.id}Error`);

    // Show error messages only if the field has been interacted with
    if (!interactedFields.has(field.name)) return true;

    if (field.name === "title") {
      const radios = document.querySelectorAll(`input[name='${field.name}']`);
      isValid = Array.from(radios).some((radio) => radio.checked);
      errorMessage = isValid ? "" : "Please select a title.";
    }

    if (field.type === "text") {
      if (
        (field.name === "firstName" || field.name === "lastName") &&
        !/^[a-zA-Z]+$/.test(field.value)
      ) {
        isValid = false;
        errorMessage = "Only letters are allowed.";
      }
      if (
        field.name === "emailId" &&
        !/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(field.value)
      ) {
        isValid = false;
        errorMessage = "Enter a valid Email from @northeastern.edu domain.";
      }
      if (
        field.name === "phoneNumber" &&
        !/^\(\d{3}\) \d{3}-\d{4}$/.test(field.value)
      ) {
        isValid = false;
        errorMessage = "Enter a valid phone number.";
      }
      if (field.name === "zipcode" && !/^\d{5,6}$/.test(field.value)) {
        isValid = false;
        errorMessage = "Enter a valid zip code.";
      }
    }

    if (field.id === "comments" && field.value.length < 5) {
      isValid = false;
      errorMessage = "Comments must be at least 5 characters long.";
    }

    if (field.name === "source") {
      const checkboxes = document.querySelectorAll("input[name='source']");
      isValid = Array.from(checkboxes).some((checkbox) => checkbox.checked);
      errorMessage = isValid ? "" : "Please select at least one option.";
    }

    // Show error message only if the field has been interacted with
    if (errorSpan) {
      errorSpan.textContent = isValid ? "" : errorMessage;
    }

    return isValid;
  }

  function validateForm() {
    let allValid = true;
    inputs.forEach((input) => {
      // Temporarily add all fields to interactedFields for initial validation
      interactedFields.add(input.name);
      if (!validateField(input)) {
        allValid = false;
      }
    });
    submitButton.disabled = !allValid;
  }

  inputs.forEach((input) => {
    if (input.type !== "submit" && input.type !== "reset") {
      input.addEventListener("input", function () {
        interactedFields.add(input.name); // Mark field as interacted
        validateForm();
      });

      input.addEventListener("focus", function () {
        interactedFields.add(input.name); // Ensure focus triggers tracking
      });

      if (input.type === "checkbox" || input.tagName === "SELECT") {
        input.addEventListener("change", function () {
          interactedFields.add(input.name);
          validateForm();
        });
      }

      if (input.name === "phoneNumber") {
        input.addEventListener("input", function (e) {
          let value = e.target.value.replace(/\D/g, "");
          let formattedValue = "";

          if (value.length > 0) formattedValue += "(" + value.substring(0, 3);
          if (value.length >= 4) formattedValue += ") " + value.substring(3, 6);
          if (value.length >= 7) formattedValue += "-" + value.substring(6, 10);

          e.target.value = formattedValue;
        });
      }
    }
  });

  // Initial validation to set the submit button state correctly
  validateForm();

  // Add CSS class to hide all error messages initially
  inputs.forEach((input) => {
    const errorSpan = document.querySelector(`#${input.id}Error`);
    if (errorSpan) {
      errorSpan.style.display = "none";
    }
  });

  // Show error messages after user interaction
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      const errorSpan = document.querySelector(`#${input.id}Error`);
      if (errorSpan) {
        errorSpan.style.display = "inline";
      }
    });

    input.addEventListener("blur", function () {
      const errorSpan = document.querySelector(`#${input.id}Error`);
      if (errorSpan && interactedFields.has(input.name)) {
        errorSpan.style.display = input.value.trim() === "" ? "inline" : "none";
      }
    });
  });

  // Dynamic dropdown and checkbox logic (as you requested)
  const dropdown = document.querySelector("#dropdown");
  const dynamicCheckboxContainer = document.querySelector(
    "#dynamicCheckboxContainer"
  );

  function addCheckboxAndTextField(selectedValue) {
    dynamicCheckboxContainer.innerHTML = "";

    const container = document.createElement("div");
    container.classList.add("field-container");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "dynamicCheckbox";
    checkbox.name = "dynamicCheckbox";

    const label = document.createElement("label");
    label.setAttribute("for", "dynamicCheckbox");
    label.innerText = "Any additional instructions for " + selectedValue;

    // Create text field (hidden initially)
    const textField = document.createElement("input");
    textField.type = "text";
    textField.id = "dynamicTextField";
    textField.name = "dynamicTextField";
    textField.placeholder = "Enter text for " + selectedValue;
    textField.style.display = "none";

    // Create error message span
    const errorSpan = document.createElement("span");
    errorSpan.id = "dynamicTextError";
    errorSpan.classList.add("error");
    errorSpan.style.color = "red";
    errorSpan.style.display = "none";

    // Toggle text field visibility and required attribute based on checkbox state
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        textField.style.display = "block";
        textField.setAttribute("required", "true");
        errorSpan.style.display = "inline";
        errorSpan.textContent = "This field is required.";
      } else {
        textField.style.display = "none";
        textField.removeAttribute("required");
        textField.value = "";
        errorSpan.style.display = "none";
        errorSpan.textContent = "";
      }
    });

    // Hide the error message when user starts typing
    textField.addEventListener("input", function () {
      if (textField.value.trim() !== "") {
        errorSpan.style.display = "none";
      } else {
        errorSpan.style.display = "inline";
        errorSpan.textContent = "This field is required.";
      }
    });

    // Append elements to the container
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(textField);
    container.appendChild(errorSpan);

    dynamicCheckboxContainer.appendChild(container);
  }

  // Event listener for dropdown change
  dropdown.addEventListener("change", function () {
    const selectedValue = dropdown.value;
    addCheckboxAndTextField(selectedValue);
  });

  const address2Field = document.querySelector("#address2");
  const address2Counter = document.querySelector("#address2Counter");

  address2Field.addEventListener("input", function () {
    const maxLength = 20; // Max characters allowed
    const currentLength = address2Field.value.length;
    if (currentLength > maxLength - 1) {
      address2Field.value = address2Field.value.slice(0, maxLength - 1);
    }
    address2Counter.textContent = `${currentLength}/${maxLength} characters used`;
  });

  form.addEventListener("submit", function (event) {
    const textField = document.querySelector("#dynamicTextField");
    const checkbox = document.querySelector("#dynamicCheckbox");
    const errorSpan = document.querySelector("#dynamicTextError");

    if (checkbox && checkbox.checked && textField.value.trim() === "") {
      event.preventDefault();
      errorSpan.style.display = "inline";
      errorSpan.textContent = "This field is required.";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Capture the form data
    const formData = {
      title: document.querySelector("input[name='title']:checked")?.value,
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      emailId: document.querySelector("#emailId").value,
      phoneNumber: document.querySelector("#phoneNumber").value,
      zipcode: document.querySelector("#zipcode").value,
      source: Array.from(
        document.querySelectorAll("input[name='source']:checked")
      ).map((el) => el.value),
      dropdown: document.querySelector("#dropdown").value,
      dynamicTextField: document.querySelector("#dynamicTextField")
        ? document.querySelector("#dynamicTextField").value
        : "",
      address2: document.querySelector("#address2").value || "",
      comments: document.querySelector("#comments").value,
    };

    // Add data horizontally in a new row
    const tableBody = document.querySelector("#tableBody");
    const row = document.createElement("tr");

    Object.values(formData).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = Array.isArray(value) ? value.join(", ") : value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);

    // Show the table if it was hidden
    document.querySelector("#submittedDataTable").style.display = "table";
    form.reset();
    validateForm();

    const dynamicCheckboxContainer = document.querySelector(
      "#dynamicCheckboxContainer"
    );
    dynamicCheckboxContainer.innerHTML = "";
    const checkbox = document.querySelector("#dynamicCheckbox");
    const errorSpan = document.querySelector("#dynamicTextError");
    checkbox.innerHTML = "";
    errorSpan.innerHTML = "";

    // Re-enable dropdown logic by setting the dropdown value and triggering the change event
    const dropdown = document.querySelector("#dropdown");
    const selectedValue = dropdown.value;
    addCheckboxAndTextField(selectedValue);
  });
  form.addEventListener("reset", function (event) {
    form.reset();
    validateForm();

    const dynamicCheckboxContainer = document.querySelector(
      "#dynamicCheckboxContainer"
    );
    dynamicCheckboxContainer.innerHTML = "";
    const checkbox = document.querySelector("#dynamicCheckbox");
    const errorSpan = document.querySelector("#dynamicTextError");
    checkbox.innerHTML = "";
    errorSpan.innerHTML = "";

    // Re-enable dropdown logic by setting the dropdown value and triggering the change event
    const dropdown = document.querySelector("#dropdown");
    const selectedValue = dropdown.value;
    addCheckboxAndTextField(selectedValue);
  });
});
