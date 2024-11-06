// Simple Progress Bar animation
let progress = 30;  // Set the initial percentage of progress (starting at 30%)
let progressBar = document.getElementById("progress-bar");  // Get the progress bar element

// Function to increase the progress
function increaseProgress() {
    if (progress < 100) {
        progress += 10;  // Increase progress by 10%
        progressBar.style.width = progress + '%';  // Update the width of the progress bar
    }
}

// Call the function every 2 seconds to simulate progress
setInterval(increaseProgress, 2000);