// Replace with your deployed Google Apps Script URL
const scriptUrl = 'https://script.google.com/macros/s/AKfycbyAjah4_zrxQDfoRptMoNLRSDhDAlIrAFjzz_C6xZv9r-hFVANjv7nFG1rvGSLKzK4k/exec';

// Function to fetch election data from Google Sheets via Apps Script
async function fetchElectionData() {
    try {
        const response = await fetch(scriptUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching election data:', error);
    }
}

// Update election results and page with dynamic content
document.addEventListener('DOMContentLoaded', async () => {
    const electionData = await fetchElectionData();
    if (electionData) {
        renderResults(electionData);
    }
    
    // Attach click event to the button
    document.getElementById('download-btn').addEventListener('click', generatePDF);
});

function renderResults(data) {
    const electionName = data.electionName; // Assuming the election name is the first item in your data
    const results = data.candidates; // Array of candidates from your data

    // Update election name
    document.getElementById('election-name').textContent = electionName;

    const resultsTableBody = document.getElementById('results-table').querySelector('tbody');
    let totalVotes = 0;
    let highestVotes = 0;
    let winner = '';

    // Clear previous results
    resultsTableBody.innerHTML = '';

    results.forEach(candidate => {
        const party = candidate[2]; // Assuming party is in the 3rd column
        const candidateName = candidate[0]; // Assuming candidate name is in the 2nd column
        const votes = parseInt(candidate[3], 10) || 0; // Assuming vote count is in the 4th column

        // Add to the table
        const rowHTML = `<tr>
                            <td>${party}</td>
                            <td>${candidateName}</td>
                            <td>${votes}</td>
                         </tr>`;
        resultsTableBody.innerHTML += rowHTML;

        totalVotes += votes;

        // Determine the winner
        if (votes > highestVotes) {
            highestVotes = votes;
            winner = candidateName;
        }
    });

    // Update the winner and voter count
    document.getElementById('winner').textContent = `Winner: ${winner}`;
    document.getElementById('voter-count').textContent = totalVotes;
}

// Function to generate PDF
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('BlockvoteX - Election Results', 105, 10, { align: 'center' });

    // Election name
    const electionName = document.getElementById('election-name').textContent;
    doc.setFontSize(14);
    doc.text(`Election: ${electionName}`, 105, 20, { align: 'center' });

    // Collect data for the table
    const rows = [];
    document.querySelectorAll('#results-table tbody tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('td').forEach(td => row.push(td.textContent.trim()));
        rows.push(row);
    });

    // Generate table with autoTable
    doc.autoTable({
        startY: 30,
        head: [['Party', 'Candidate Name', 'Votes']],
        body: rows,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, // Optional styling
        margin: { top: 10 },
    });

    // Winner
    const winner = document.getElementById('winner').textContent;
    doc.setFontSize(14);
    doc.text(` ${winner}`, 105, doc.lastAutoTable.finalY + 10, { align: 'center' });

    // Voter count
    const totalVotes = document.getElementById('voter-count').textContent;
    doc.setFontSize(12);
    doc.text(`Total Voters: ${totalVotes}`, 105, doc.lastAutoTable.finalY + 20, { align: 'center' });

    // Footer with clickable Instagram handle
    doc.setFontSize(10);
    doc.textWithLink('Developed by Sathish Dusharla | @thedusharla', 105, doc.internal.pageSize.height - 10, {
        url: 'https://www.instagram.com/thedusharla',
        align: 'center'
    });

    // Save PDF
    doc.save('election-results.pdf');
}
