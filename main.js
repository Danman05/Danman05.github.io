
// Toggle navigation bar for mobile responsiveness
function toggleNav() {
    const nav = document.getElementById("topNav");
    if (nav.className === "nav") nav.className += " responsive";
    else nav.className = "nav";
}

function calculateEducationTime() {
    // DOM elements
    const progBar = document.getElementById('progress-bar');
    const periodLabelContainer = document.getElementById('period');

    const progLabelStart = document.getElementsByClassName('startDate')[0];
    const progLabelEnd = document.getElementsByClassName('endDate')[0];

    // Static dates
    const startDate = new Date(2022, 6, 25); // Start date of education
    const endDate = new Date(2027, 0, 24); // End date of education
    const differenceFromStart = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // Total days - start to end

    const schoolPeriodLength = 70; // School periods is 70 days
    const labels = [     // Array to hold information about my school periods
        { positionStart: getLabelPercentage(new Date(2022, 7, 8)), positionEnd: getLabelPercentage(new Date(2022, 7, 8 + schoolPeriodLength)) ,text: 'H1' },
        { positionStart: getLabelPercentage(new Date(2023, 3, 11)), positionEnd: getLabelPercentage(new Date(2023, 3, 11 + schoolPeriodLength)), text: 'H2' },
        { positionStart: getLabelPercentage(new Date(2024, 0, 22)), positionEnd: getLabelPercentage(new Date(2024, 0, 22 + schoolPeriodLength)), text: 'H3' },
        { positionStart: getLabelPercentage(new Date(2024, 9, 28)), positionEnd: getLabelPercentage(new Date(2024, 9, 28 + schoolPeriodLength)), text: 'H4' },
        { positionStart: getLabelPercentage(new Date(2026, 0, 19)), positionEnd: getLabelPercentage(new Date(2026, 0, 19 + schoolPeriodLength)), text: 'H5' },
        { positionStart: getLabelPercentage(new Date(2026, 8, 14)), positionEnd: getLabelPercentage(new Date(2026, 8, 14 + schoolPeriodLength)), text: 'H6' }
    ];

    // Update labels dynamically based on the dates
    labels.forEach(label => {
        const startlabelElement = document.createElement('div');
        // const endLabelElement = document.createElement('div');

        startlabelElement.className = 'label';
        // endLabelElement.className = 'label';

        startlabelElement.style.left = label.positionStart + '%';
        // endLabelElement.style.left = label.positionEnd + '%';

        startlabelElement.textContent = label.text;
        // endLabelElement.textContent = label.text;
        
        if(label.positionEnd < todaysCompletedPercentage()) {
            startlabelElement.style.color = "green";
            // endLabelElement.style.color = "green";
        }
        else if(label.positionStart < todaysCompletedPercentage()) {
            startlabelElement.style.color = "yellow"
        }

        periodLabelContainer.appendChild(startlabelElement);
        // periodLabelContainer.appendChild(endLabelElement);

    });


    updateProgressBar(); // Executes method
    setInterval(updateProgressBar, 30000); // subsequently runs the method
    
    function getLabelPercentage(date) {
        return Math.round(((date - startDate) / (endDate - startDate)) * 100);
    }
    function todaysCompletedPercentage() {
        // Dates
        const today = new Date();
        
        // Time calculations
        const differenceFromToday = (endDate - today) / (1000 * 60 * 60 * 24);
        
        const daysCompletedPercentage = Math.round((differenceFromStart - differenceFromToday) / differenceFromStart * 10000) / 100;
        
        return daysCompletedPercentage;
    }
    function updateProgressBar() {

        const daysCompletedPercentage = todaysCompletedPercentage();
        progBar.style.width = `${daysCompletedPercentage}%`;
        progBar.innerText = `${daysCompletedPercentage}%`;

        // DOM manipulation
        progLabelStart.innerText = startDate.toLocaleDateString();
        progLabelEnd.innerText = endDate.toLocaleDateString();
    }
}