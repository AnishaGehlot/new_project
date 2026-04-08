document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm_password");
  const strengthFill = document.getElementById("strengthFill");
  const strengthText = document.getElementById("strengthText");

  if (passwordInput && strengthFill && strengthText) {
    passwordInput.addEventListener("input", () => {
      const value = passwordInput.value;
      let score = 0;

      if (value.length >= 6) score++;
      if (value.length >= 10) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;

      let width = "0%";
      let color = "#e5e7eb";
      let label = "Easy";

      if (score <= 2) {
        width = "33%";
        color = "#ef4444";
        label = "Easy";
      } else if (score <= 4) {
        width = "66%";
        color = "#f59e0b";
        label = "Medium";
      } else {
        width = "100%";
        color = "#22c55e";
        label = "Hard";
      }

      strengthFill.style.width = width;
      strengthFill.style.background = color;
      strengthText.textContent = `Password strength: ${label}`;
    });
  }

  if (confirmInput && passwordInput) {
    confirmInput.addEventListener("input", () => {
      if (confirmInput.value && confirmInput.value !== passwordInput.value) {
        confirmInput.style.borderColor = "#ef4444";
      } else {
        confirmInput.style.borderColor = "#dfe5f1";
      }
    });
  }

  const toggleButtons = document.querySelectorAll("[data-toggle-password]");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle-password");
      const input = document.getElementById(targetId);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  const otpInputs = document.querySelectorAll(".otp-input");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 1);
      if (e.target.value && otpInputs[index + 1]) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && otpInputs[index - 1]) {
        otpInputs[index - 1].focus();
      }
    });
  });
});