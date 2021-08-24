const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in.");
      document.location.replace("/login");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
