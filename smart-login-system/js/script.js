// #region REGEX
let nameRegex = /^[a-zA-Z ]{3,}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^.{6,}$/;
// #endregion

// #region USERS
let users = JSON.parse(localStorage.getItem("users")) || [];
// #endregion

// #region SIGNUP

let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let signupBtn = document.getElementById("signupBtn");

// ERRORS
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Clear old errors
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    // Empty fields
    if (signupName.value === "") {
      nameError.innerHTML = "Name is required";
      return;
    }

    if (signupEmail.value === "") {
      emailError.innerHTML = "Email is required";
      return;
    }

    if (signupPassword.value === "") {
      passwordError.innerHTML = "Password is required";
      return;
    }

    // Regex validation
    if (!nameRegex.test(signupName.value)) {
      nameError.innerHTML = "Invalid Name";
      return;
    }

    if (!emailRegex.test(signupEmail.value)) {
      emailError.innerHTML = "Invalid Email";
      return;
    }

    if (!passwordRegex.test(signupPassword.value)) {
      passwordError.innerHTML = "Invalid Password";
      return;
    }

    // Check if email already exists
    let existingUser = users.find(function (user) {
      return user.email === signupEmail.value;
    });

    if (existingUser) {
      emailError.innerHTML = "Email already exists";
      return;
    }

    // Create new user
    let user = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };

    // Add user to array
    users.push(user);

    // Save users array
    localStorage.setItem("users", JSON.stringify(users));

    // Go to Home
    window.location.href = "home.html";
  });
}

// #endregion

// #region LOGIN
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let loginBtn = document.getElementById("loginBtn");

// ERRORS
let loginEmailError = document.getElementById("loginEmailError");
let loginPasswordError = document.getElementById("loginPasswordError");

// MESSAGE
let signupMessage = document.getElementById("signupMessage");
let closeMessage = document.getElementById("closeMessage");
if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Clear old errors
    loginEmailError.innerHTML = "";
    loginPasswordError.innerHTML = "";
    // Hide old message
    signupMessage.classList.add("d-none");
    // Empty fields
    if (loginEmail.value === "") {
      loginEmailError.innerHTML = "Email is required";
      return;
    }

    if (loginPassword.value === "") {
      loginPasswordError.innerHTML = "Password is required";
      return;
    }

    // Regex validation
    if (!emailRegex.test(loginEmail.value)) {
      loginEmailError.innerHTML = "Invalid Email";
      return;
    }

    if (!passwordRegex.test(loginPassword.value)) {
      loginPasswordError.innerHTML = "Invalid Password";
      return;
    }

    // Search for user
    let existingUser = users.find(function (user) {
      return (
        user.email === loginEmail.value && user.password === loginPassword.value
      );
    });

    // User exists
    if (existingUser) {
      window.location.href = "home.html";
    }

    // User doesn't exist
    else {
      signupMessage.classList.remove("d-none");

      setTimeout(function () {
        signupMessage.classList.add("d-none");
      }, 3000);
    }
  });
}

if (closeMessage) {
  closeMessage.addEventListener("click", () => {
    signupMessage.classList.add("d-none");
  });
}
// #endregion
