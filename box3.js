document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmpassword");
    const passwordStrength = document.getElementById("passwordStrength");
    const email = document.getElementById("email");
    const location = document.getElementById("location");
    const zip = document.getElementById("zipcode");
    const city = document.getElementById("city");
    const terms = document.getElementById("terms");

    // Password strength checker
    if (password && passwordStrength) {
        password.addEventListener("input", () => {
            const val = password.value;
            let strength = 0;

            if (val.length >= 6) strength++;
            if (/[A-Z]/.test(val)) strength++;
            if (/[0-9]/.test(val)) strength++;
            if (/[^A-Za-z0-9]/.test(val)) strength++;

            const width = (strength / 4) * 100;
            passwordStrength.style.width = width + "%";

            if (strength <= 1) passwordStrength.style.backgroundColor = "#ff5722";
            else if (strength === 2) passwordStrength.style.backgroundColor = "#ffc107";
            else passwordStrength.style.backgroundColor = "#4caf50";
        });
    }

    // Form validation on submit
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // prevent default submit

            const errors = [];

            // Email validation
            const emailPattern = /^\d{2}-\d{5}-\d@student\.aiub\.edu$/;
            if (!emailPattern.test(email.value.trim())) {
                errors.push("Invalid AIUB email format (e.g., 22-48877-3@student.aiub.edu)");
            }

            // Password match
            if (password.value !== confirmPassword.value) {
                errors.push("Passwords do not match.");
            }

            // Zipcode validation
            const zipPattern = /^\d{4}$/;
            if (!zipPattern.test(zip.value.trim())) {
                errors.push("Zip code must be exactly 4 digits.");
            }

            // Required fields check
            if (!email.value || !password.value || !confirmPassword.value || !location.value || !zip.value || !city.value || !terms.checked) {
                errors.push("Please fill in all fields and accept the terms.");
            }

            if (errors.length > 0) {
                alert("Form submission failed:\n\n" + errors.join("\n"));
            } else {
                alert("Form submitted successfully!");
                form.reset();
                passwordStrength.style.width = "0%";
            }
        });
    }
});
