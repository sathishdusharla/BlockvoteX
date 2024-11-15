document.getElementById('num-contestants').addEventListener('input', function() {
    const numContestants = document.getElementById('num-contestants').value;
    const contestantsSection = document.getElementById('contestants-section');

    // Clear previous contestant fields
    contestantsSection.innerHTML = '';

    // Loop to create contestant fields based on the number entered
    for (let i = 1; i <= numContestants; i++) {
        const contestantDiv = document.createElement('div');
        contestantDiv.classList.add('contestant');

        // Contestant Name Label
        const contestantNameLabel = document.createElement('label');
        contestantNameLabel.setAttribute('for', `contestant-name-${i}`);
        contestantNameLabel.textContent = `Contestant ${i} Name:`;
        contestantDiv.appendChild(contestantNameLabel);

        // Contestant Name Input
        const contestantNameInput = document.createElement('input');
        contestantNameInput.setAttribute('type', 'text');
        contestantNameInput.setAttribute('id', `contestant-name-${i}`);
        contestantNameInput.setAttribute('name', `contestant-name-${i}`);
        contestantNameInput.required = true;
        contestantDiv.appendChild(contestantNameInput);

        // Contestant Bio Label
        const contestantBioLabel = document.createElement('label');
        contestantBioLabel.setAttribute('for', `contestant-bio-${i}`);
        contestantBioLabel.textContent = `Contestant ${i} Bio:`;
        contestantDiv.appendChild(contestantBioLabel);

        // Contestant Bio Input
        const contestantBioInput = document.createElement('input');
        contestantBioInput.setAttribute('type', 'text');
        contestantBioInput.setAttribute('id', `contestant-bio-${i}`);
        contestantBioInput.setAttribute('name', `contestant-bio-${i}`);
        contestantBioInput.required = true;
        contestantDiv.appendChild(contestantBioInput);

        // Contestant Party Label
        const contestantPartyLabel = document.createElement('label');
        contestantPartyLabel.setAttribute('for', `contestant-party-${i}`);
        contestantPartyLabel.textContent = `Contestant ${i} Party:`;
        contestantDiv.appendChild(contestantPartyLabel);

        // Contestant Party Input
        const contestantPartyInput = document.createElement('input');
        contestantPartyInput.setAttribute('type', 'text');
        contestantPartyInput.setAttribute('id', `contestant-party-${i}`);
        contestantPartyInput.setAttribute('name', `contestant-party-${i}`);
        contestantPartyInput.required = true;
        contestantDiv.appendChild(contestantPartyInput);

        contestantsSection.appendChild(contestantDiv);
    }
});

document.getElementById('electionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new URLSearchParams(new FormData(form)).toString();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxiaDFhVpBuhdArjmdCgkIW55SKs_EubAZ-TvERGIeuLYhIqKkpFIfnkhYr-JcbYbk7/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => {
        if (response.ok) {
            alert("Election process started!");
            window.location.href = 'Admin/admin_dashboard.html';
            startElectionMonitoring(form.elements['start-date'].value, form.elements['end-date'].value);
        } else {
            alert("There was an error submitting the data.");
        }
    })
    .catch(error => console.error('Error!', error.message));
});

// Function to monitor election dates
function startElectionMonitoring(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now >= start && now <= end) {
        console.log("Election is currently ongoing.");
    } else {
        console.log("Election has ended.");
    }

    setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= end) {
            console.log("Election has ended automatically.");
            // You can trigger an action here, like notifying admins
        }
    }, 60000); // Check every minute
}