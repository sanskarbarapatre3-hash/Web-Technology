const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const successMsg = document.getElementById("successMsg");

// Helper function: Error display karne ke liye
function setError(inputElement, message) {
  const formGroup = inputElement.parentElement;
  formGroup.className = "form-group error";
  const errorElement = formGroup.querySelector(".error-msg");
  errorElement.innerText = message;
}

// Helper function: Success mark karne ke liye
function setSuccess(inputElement) {
  const formGroup = inputElement.parentElement;
  formGroup.className = "form-group success";
  const errorElement = formGroup.querySelector(".error-msg");
  errorElement.innerText = "";
}

// Form submit event listener
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Default page reload rokne ke liye

  let isValid = true;

  // 1. Name Validation (Conditional Statement)
  const nameValue = fullName.value.trim();
  if (nameValue === "") {
    setError(fullName, "Full Name is required.");
    isValid = false;
  } else if (nameValue.length < 3) {
    setError(fullName, "Name must be at least 3 characters long.");
    isValid = false;
  } else {
    setSuccess(fullName);
  }

  // 2. Email Validation using Regex
  const emailValue = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue === "") {
    setError(email, "Email address is required.");
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    setError(email, "Please enter a valid email address.");
    isValid = false;
  } else {
    setSuccess(email);
  }

  // 3. Phone Number Validation (10 digits)
  const phoneValue = phone.value.trim();
  const phonePattern = /^[0-9]{10}$/;
  if (phoneValue === "") {
    setError(phone, "Phone number is required.");
    isValid = false;
  } else if (!phonePattern.test(phoneValue)) {
    setError(phone, "Please enter a valid 10-digit mobile number.");
    isValid = false;
  } else {
    setSuccess(phone);
  }

  // 4. Password Validation
  const passwordValue = password.value.trim();
  if (passwordValue === "") {
    setError(password, "Password is required.");
    isValid = false;
  } else if (passwordValue.length < 6) {
    setError(password, "Password must be at least 6 characters.");
    isValid = false;
  } else {
    setSuccess(password);
  }

  // 5. Success Check & Loop demonstration
  if (isValid) {
    successMsg.innerText = "Registration successful!";
    successMsg.style.display = "block";

    // Loop demonstration: Saare inputs ko loop karke console me print karna
    const allInputs = [fullName, email, phone, password];
    console.log("--- Submitted Form Data ---");
    for (const input of allInputs) {
      console.log(`${input.id}: ${input.value}`);
    }

    // Form reset
    setTimeout(() => {
      form.reset();
      // Loop to clean up border classes
      for (const input of allInputs) {
        input.parentElement.className = "form-group";
      }
      successMsg.style.display = "none";
    }, 2500);
  } else {
    successMsg.style.display = "none";
  }
});