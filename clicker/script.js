let count = 0;
const counterDisplay = document.getElementById('counter');
const resetBtn = document.getElementById('reset');
const downloadBtn = document.getElementById('download');
const themeBtn = document.getElementById('theme');
const saveBtn = document.getElementById('save');
const homeBtn = document.getElementById('home');
const menuBtn = document.getElementById('menu');
const kaabaImage = document.querySelector('.kaaba-image');
const titleElement = document.querySelector('h1');
const counterApp = document.querySelector('.counter-app');

// Color themes
const themes = [
    { name: 'Default', background: '#000000' },
    { name: 'Cyan', background: '#008B8B' },
    { name: 'Dark Blue', background: '#00008B' },
    { name: 'Gold', background: '#B8860B' },
    { name: 'Dark Red', background: '#8B0000' },
    { name: 'Lime Green', background: '#32CD32' },
    { name: 'Dark Green', background: '#006400' },
    { name: 'Navy', background: '#001F3F' },
    { name: 'Dark Purple', background: '#4B0082' },
    { name: 'Dark Brown', background: '#3E2723' },
    { name: 'Yellow', background: '#FFD700' }
];

let currentThemeIndex = 0;

// Theme toggle
themeBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    counterApp.style.backgroundColor = newTheme.background;
    
    // Save the current theme preference
    localStorage.setItem('currentThemeIndex', currentThemeIndex);
});

// Load saved theme on startup
window.addEventListener('load', () => {
    localStorage.removeItem('count');
    count = 0;
    counterDisplay.textContent = '0';
    
    const selectedDhikr = localStorage.getItem('selectedDhikr');
    if (selectedDhikr) {
        titleElement.textContent = selectedDhikr;
    }

    // Load saved theme
    const savedThemeIndex = localStorage.getItem('currentThemeIndex');
    if (savedThemeIndex !== null) {
        currentThemeIndex = parseInt(savedThemeIndex);
        counterApp.style.backgroundColor = themes[currentThemeIndex].background;
    }
});

// Remove the click event from the counter-app
// Add click event only to the Kaaba image
kaabaImage.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
});

// Reset counter
resetBtn.addEventListener('click', () => {
    count = 0;
    counterDisplay.textContent = count;
});

// Navigate to save page
saveBtn.addEventListener('click', () => {
    window.location.href = 'save.html';
});

// Update download button functionality
downloadBtn.addEventListener('click', () => {
    if (count > 0) {
        const currentDate = new Date();
        const dhikrRecord = {
            dhikr: titleElement.textContent,
            count: count,
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString(),
            day: currentDate.toLocaleDateString('en-US', { weekday: 'long' })
        };

        // Get existing records or initialize empty array
        let savedRecords = JSON.parse(localStorage.getItem('dhikrRecords') || '[]');
        savedRecords.push(dhikrRecord);
        localStorage.setItem('dhikrRecords', JSON.stringify(savedRecords));

        alert('Dhikr saved successfully!');
    } else {
        alert('Please complete some dhikr before saving');
    }
});

// Navigate to menu page when menu button is clicked
menuBtn.addEventListener('click', () => {
    window.location.href = 'menu.html';
});

// Load saved count on startup
window.addEventListener('load', () => {
    const savedCount = localStorage.getItem('savedCount');
    if (savedCount) {
        count = parseInt(savedCount);
        counterDisplay.textContent = count;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const selectedDhikr = localStorage.getItem('selectedDhikr') || 'subhanAllah';
    const dhikrTitle = document.getElementById('dhikrTitle');
    if (dhikrTitle) {
        dhikrTitle.textContent = selectedDhikr;
    }

    // Request notification permission
    if ("Notification" in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                setupDailyNotification();
            }
        });
    }
});

function setupDailyNotification() {
    // Set notification for 5:00 AM daily
    let now = new Date();
    let scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0);
    
    // If it's already past 5 AM, schedule for next day
    if (now > scheduledTime) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    let timeUntilNotification = scheduledTime - now;
    
    // Schedule the notification
    setTimeout(() => {
        // Show notification
        const notification = new Notification("Daily Tasbeeh Reminder", {
            body: "Don't forget your daily Tasbeeh!",
            icon: "/img/Kaaba1.jpeg", // Add your app icon path here
        });
        
        // Schedule next day's notification
        setupDailyNotification();
    }, timeUntilNotification);
}

// Function to show notification immediately (for testing)
function showTestNotification() {
    if (Notification.permission === "granted") {
        const notification = new Notification("Tasbeeh Reminder", {
            body: "Don't forget your daily Tasbeeh!",
            icon: "/img/Kaaba1.jpeg", // Add your app icon path here
        });
    }
}

// Add navigation handlers
document.getElementById('home').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('menu').addEventListener('click', () => {
    window.location.href = 'menu.html';
});