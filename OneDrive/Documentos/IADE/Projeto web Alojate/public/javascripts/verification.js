const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorLabel = document.querySelector('.error');
const deleteAccountBtn = document.querySelector('.delete-account');

form.addEventListener('submit', (event) => {
  let isValid = true;

  if (nameInput.value.trim() === '') {
    setError('Name is required');
    isValid = false;
  }

  if (phoneInput.value.trim() === '') {
    setError('Phone number is required');
    isValid = false;
  } else if (!phoneInput.value.match(/^+?\d{1,4}[\s-]?\d{1,15}$/)) {
    setError('Invalid phone number');
    isValid = false;
  }


  if (emailInput.value.trim() === '') {
    setError('Email is required');
    isValid = false;
  } else if (!emailInput.value.match(/^\S+@\S+.\S+$/)) {
    setError('Email is not valid');
    isValid = false;
  }

  if (passwordInput.value.trim() === '') {
    setError('Password is required');
    isValid = false;
  } else if (passwordInput.value.length < 8) {
    setError('Password must be at least 8 characters long');
    isValid = false;
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    setError('Passwords do not match');
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully');
  }

  event.preventDefault();
});

deleteAccountBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete your account?')) {
    alert('Account deleted');
  }
});

function setError(message) {
  errorLabel.textContent = message;
}