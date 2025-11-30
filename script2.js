document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(event) {
        // 1. Prevent Default Submission
        event.preventDefault();

        // Reset previous validation styles and messages
        resetValidation();

        // 2. Run validation checks
        const isValid = validateForm();

        // 3. Final Submission or Error Display
        if (isValid) {
            // In a real application, you would send the data to a server here
            
            console.log('Form is valid. Submitting data...');
            
            // Display success message and clear the form
            form.reset();
            successMessage.classList.remove('hidden');

            // Hide the success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);

        } else {
            console.log('Form is invalid. Please correct the errors.');
        }
    });

    function resetValidation() {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('invalid');
            const errorMessage = document.getElementById(input.name + '-error');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
        successMessage.classList.add('hidden');
    }

    function displayError(inputElement, message) {
        inputElement.classList.add('invalid');
        const errorMessage = document.getElementById(inputElement.name + '-error');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    function isValidEmail(email) {
        // 4. Validate Email Format using a simple Regular Expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateForm() {
        let isFormValid = true;

        // Check required fields (Name, Email, Message)
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
            if (input.value.trim() === '') {
                // 3. Check for Required Fields
                displayError(input, `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`);
                isFormValid = false;
            }
        });

        // Check specific email format
        if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
            displayError(emailInput, 'Please enter a valid email address.');
            isFormValid = false;
        }

        return isFormValid;
    }
});