// Function to toggle the dropdown menu
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown-menu');
    dropdown.classList.toggle('show');
  }
  
  // Function to close the dropdown menu if the user clicks outside of it
  function closeDropdown(event) {
    if (!event.target.matches('.dropdown-toggle')) {
      const dropdowns = document.querySelectorAll('.dropdown-menu');
      for (let dropdown of dropdowns) {
        if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    }
  }
  
  // Event listeners for the dropdown menu
  document.querySelector('.dropdown-toggle').addEventListener('click', toggleDropdown);
  document.addEventListener('click', closeDropdown);
  
  // Function to handle the search form submission
  function search(event) {
    event.preventDefault();
    const query = document.querySelector('.form-control').value;
    const url = `https://www.airbnb.com/s/homes?query=${query}`;
    window.location.href = url;
  }
  
  // Event listener for the search form
  document.querySelector('form').addEventListener('submit', search);
  