// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the buttons
    const addAdminBtn = document.querySelector('.left-section .btn');
    const conductElectionsBtn = document.querySelector('.right-section .btn:nth-of-type(1)');
    const resultsBtn = document.querySelector('.right-section .btn:nth-of-type(2)');

    // Add event listeners to navigate to the corresponding pages

    addAdminBtn.addEventListener('click', function() {
        // Navigate to the Add Admin page
        window.location.href = '/Admin/add_admin.html';
    });

    conductElectionsBtn.addEventListener('click', function() {
        // Navigate to the Conduct Elections page
        window.location.href = '/Admin/conduct_elections.html';
    });

    resultsBtn.addEventListener('click', function() {
        // Navigate to the Results page
        window.location.href = '/Admin/results.html';
    });
});