document.addEventListener('DOMContentLoaded', async () => {
    const email = new URLSearchParams(window.location.search).get('email');
    const uniqueId = new URLSearchParams(window.location.search).get('uniqueId');

    if (!email || !uniqueId) {
        alert("Email and Unique ID are required to vote.");
        window.location.href = '/Voter/voter_login.html';
        return;
    }

    const response = await fetch('https://script.google.com/macros/s/AKfycbx2PXOlLJpQWvzrnCMDWr1MW5BouafYNfrl3HPqm2-zVTOdjOONCIzBmK4CC92AjBeG/exec');
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split('\t'));

    // Assuming the first row is the election details
    const electionDetails = rows[0];
    document.getElementById('election-name').textContent = electionDetails[0];

    const voteList = document.getElementById('vote-list');
    for (let i = 1; i < rows.length; i++) {
        const contestantName = rows[i][0];
        const contestantParty = rows[i][2];

        const voteItem = document.createElement('div');
        voteItem.className = 'vote-item';
        voteItem.innerHTML = `
            <span class="vote-number">${i}.</span>
            <span class="vote-contestant">${contestantName}</span>
            <span class="vote-party">${contestantParty}</span>
            <button class="vote-btn" data-contestant="${contestantName}">VOTE</button>`;
        voteList.appendChild(voteItem);
    }

    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', () => {
            const contestant = button.getAttribute('data-contestant');
            fetch('https://script.google.com/macros/s/AKfycbw_EzoxksYtXJjdbQcvH3B2klnKnxP6Ez_BUfoyzNQTPCOzSZx-qydrPyL5cAo4BGP6/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    contestant: contestant,
                    email: email,
                    uniqueId: uniqueId
                }).toString()
            })
            .then(response => response.json())
            .then(data => {
                if (data.hasVoted) {
                    alert(data.message);
                } else {
                    alert("Vote cast successfully!");
                    window.location.href = `/Voter/voter_dashboard.html?email=${encodeURIComponent(email)}`;
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});
