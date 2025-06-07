const apiKey = 'cde641ff-cdde-4d25-8a62-4ec8cabc7f57'; // Replace with your API key
let currentDate = new Date();
let selectedDate = new Date();

// DOM Elements
const nextPrayerName = document.getElementById('next-prayer-name');
const countdownTimer = document.getElementById('countdown-timer');
const gregorianDate = document.querySelector('.gregorian-date');
const hijriDate = document.querySelector('.hijri-date');
const currentTimeElement = document.querySelector('.current-time');

// Prayer time elements
const prayerTimes = {
    fajr: document.getElementById('fajr-time'),
    dhuhr: document.getElementById('dhuhr-time'),
    asr: document.getElementById('asr-time'),
    maghrib: document.getElementById('maghrib-time'),
    isha: document.getElementById('isha-time')
};

// Prayer cards
const prayerCards = {
    fajr: document.getElementById('fajr-card'),
    dhuhr: document.getElementById('dhuhr-card'),
    asr: document.getElementById('asr-card'),
    maghrib: document.getElementById('maghrib-card'),
    isha: document.getElementById('isha-card')
};

// Add today button functionality
const todayBtn = document.getElementById('todayBtn');

// Function to update today button visibility
function updateTodayButtonVisibility() {
    const today = new Date();
    if (isSameDay(selectedDate, today)) {
        todayBtn.classList.add('hidden');
    } else {
        todayBtn.classList.remove('hidden');
    }
}

// Add click handler for today button
todayBtn.addEventListener('click', () => {
    selectedDate = new Date();
    fetchPrayerTimes(selectedDate);
    updateTodayButtonVisibility();
});

// Get current date and time in London timezone
function getLondonTime() {
    return new Date(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }));
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    currentTimeElement.textContent = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/London'
    });
}

// Fetch Islamic date from Aladhan API
async function fetchIslamicDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const url = `https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 200) {
            const hijri = data.data.hijri;
            hijriDate.textContent = `${hijri.day} ${hijri.month.en} ${hijri.year}`;
        } else {
            hijriDate.textContent = 'Error loading date';
        }
    } catch (error) {
        console.error('Error fetching Islamic date:', error);
        hijriDate.textContent = 'Error loading date';
    }
}

// Add event listeners for date navigation
const prevDateBtn = document.getElementById('prevDate');
const nextDateBtn = document.getElementById('nextDate');

prevDateBtn.addEventListener('click', () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    selectedDate = newDate;
    fetchPrayerTimes(selectedDate);
});

nextDateBtn.addEventListener('click', () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    selectedDate = newDate;
    fetchPrayerTimes(selectedDate);
});

// Fetch prayer times using London Prayer Times API
async function fetchPrayerTimes(date) {
    // Format date for API (YYYY-MM-DD)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    
    const apiKey = 'cde641ff-cdde-4d25-8a62-4ec8cabc7f57';
    const url = `http://www.londonprayertimes.com/api/times/?format=json&key=${apiKey}&date=${formattedDate}&24hours=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
            // Update Gregorian date
            gregorianDate.textContent = date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Fetch and display Islamic date
            await fetchIslamicDate(date);

            // Format the data
            const formattedData = {
                fajr: data.fajr,
                dhuhr: data.dhuhr,
                asr: data.asr,
                maghrib: data.magrib,
                isha: data.isha
            };

            // Update the prayer times first
            updatePrayerTimes(formattedData);

            // Then handle the next prayer display
            const today = new Date();
            if (isSameDay(date, today)) {
                // Today - show actual next prayer and countdown
                updateNextPrayer(formattedData);
            } else {
                // Any other date - show dashes
                nextPrayerName.textContent = "Next Prayer";
                countdownTimer.textContent = "--:--";
                
                // Remove active states from prayer cards
                Object.values(prayerCards).forEach(card => card.classList.remove('active'));
                
                // Reset next prayer box styling to default
                const nextPrayerElement = document.querySelector('.next-prayer');
                nextPrayerElement.className = 'next-prayer';
                const iconElement = document.querySelector('.next-prayer-icon i');
                iconElement.className = 'material-symbols-rounded';
                iconElement.textContent = 'mosque';
            }

            updateTodayButtonVisibility();
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        Object.values(prayerTimes).forEach(element => {
            element.textContent = 'Error';
        });
        nextPrayerName.textContent = 'Error';
        countdownTimer.textContent = '--:--:--';
    }
}

// Helper function to convert time to 24-hour format
function ensureTimeFormat(timeStr) {
    if (!timeStr) return '--:--';
    
    // If time is already in 24h format, return as is
    if (!timeStr.includes('AM') && !timeStr.includes('PM')) {
        return timeStr;
    }

    // Convert from AM/PM to 24h format
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Update prayer times display
function updatePrayerTimes(data) {
    // Reset all active states
    Object.values(prayerCards).forEach(card => card.classList.remove('active'));

    // Update each prayer time with AM/PM
    prayerTimes.fajr.textContent = ensureTimeFormat(data.fajr);
    prayerTimes.dhuhr.textContent = ensureTimeFormat(data.dhuhr);
    prayerTimes.asr.textContent = ensureTimeFormat(data.asr);
    prayerTimes.maghrib.textContent = ensureTimeFormat(data.maghrib);
    prayerTimes.isha.textContent = ensureTimeFormat(data.isha);
}

// Calculate and update next prayer
function updateNextPrayer(data) {
    const now = new Date();
    
    // Check if we're viewing today's date
    if (!isSameDay(selectedDate, now)) {
        // If not today, just show dashes
        nextPrayerName.textContent = "Next Prayer";
        countdownTimer.textContent = "--:--";
        
        // Reset next prayer box styling
        const nextPrayerElement = document.querySelector('.next-prayer');
        nextPrayerElement.className = 'next-prayer';
        const iconElement = document.querySelector('.next-prayer-icon i');
        iconElement.className = 'material-symbols-rounded';
        iconElement.textContent = 'mosque';
        
        // Remove active states from prayer cards
        Object.values(prayerCards).forEach(card => card.classList.remove('active'));
        return;
    }

    // Rest of the function for today's date
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
        { name: 'Fajr', time: convertToMinutes(data.fajr), icon: 'dark_mode' },
        { name: 'Dhuhr', time: convertToMinutes(data.dhuhr), icon: 'light_mode' },
        { name: 'Asr', time: convertToMinutes(data.asr), icon: 'wb_twilight' },
        { name: 'Maghrib', time: convertToMinutes(data.maghrib), icon: 'nights_stay' },
        { name: 'Isha', time: convertToMinutes(data.isha), icon: 'bedtime' }
    ];

    let nextPrayer = prayers.find(prayer => prayer.time > currentTime);
    
    if (!nextPrayer) {
        nextPrayer = { ...prayers[0], time: prayers[0].time };
        nextPrayer.isTomorrow = true;
    }

    // Update next prayer display
    const nextPrayerElement = document.querySelector('.next-prayer');
    nextPrayerName.textContent = nextPrayer.name;
    
    // Update prayer-specific styles and icon
    nextPrayerElement.className = `next-prayer ${nextPrayer.name.toLowerCase()}`;
    const iconElement = document.querySelector('.next-prayer-icon i');
    iconElement.className = 'material-symbols-rounded';
    iconElement.textContent = nextPrayer.icon;
    
    // Mark active prayer card
    const activePrayerCard = prayerCards[nextPrayer.name.toLowerCase()];
    if (activePrayerCard) {
        Object.values(prayerCards).forEach(card => card.classList.remove('active'));
        activePrayerCard.classList.add('active');
    }

    // Start countdown
    startCountdown(nextPrayer);
}

// Convert time string to decimal hours
function convertToMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes; // Return total minutes instead of decimal hours
}

// Start countdown timer
function startCountdown(nextPrayer) {
    // First check if we're viewing a date other than today
    const now = new Date();
    if (!isSameDay(selectedDate, now)) {
        // Clear any existing countdown
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
        }
        countdownTimer.textContent = "--:--";
        return; // Exit the function early
    }

    // Clear any existing countdown
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }

    function updateDisplay() {
        const now = new Date();
        
        // Check again if date has changed
        if (!isSameDay(selectedDate, now)) {
            clearInterval(window.countdownInterval);
            countdownTimer.textContent = "--:--";
            return;
        }

        const prayerTime = new Date(now);
        
        // Convert prayer time from minutes to hours and minutes
        const hours = Math.floor(nextPrayer.time / 60);
        const minutes = nextPrayer.time % 60;
        
        prayerTime.setHours(hours);
        prayerTime.setMinutes(minutes);
        prayerTime.setSeconds(0);

        if (nextPrayer.isTomorrow) {
            prayerTime.setDate(prayerTime.getDate() + 1);
        }

        const diff = prayerTime - now;

        if (diff < 0) {
            // Time has passed, refresh prayer times
            fetchPrayerTimes(new Date());
            return;
        }

        // Calculate hours, minutes, seconds
        const hours_remaining = Math.floor(diff / (1000 * 60 * 60));
        const minutes_remaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds_remaining = Math.floor((diff % (1000 * 60)) / 1000);

        // Update display
        countdownTimer.textContent = `${String(hours_remaining).padStart(2, '0')}:${String(minutes_remaining).padStart(2, '0')}:${String(seconds_remaining).padStart(2, '0')}`;
    }

    // Update immediately
    updateDisplay();

    // Update every second
    window.countdownInterval = setInterval(updateDisplay, 1000);
}

// Fetch a random Ayah from the Quran
async function fetchRandomAyah() {
    const randomAyahNumber = Math.floor(Math.random() * 6236) + 1; // Quran has 6236 verses
    const url = `https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/editions/quran-uthmani,en.asad`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data) && data.data.length >= 2) {
            const ayahText = document.getElementById('ayahText');
            const ayahReference = document.getElementById('ayahReference');
            
            // Get Arabic and English texts
            const arabicText = data.data[0].text; // Uthmani Arabic text
            const englishText = data.data[1].text; // English translation
            
            ayahText.innerHTML = `
                <p class="arabic-text">${arabicText}</p>
                <p class="english-text">${englishText}</p>
            `;
            
            // Format reference
            const surahName = data.data[0].surah.englishName;
            const verseNumber = data.data[0].numberInSurah;
            ayahReference.textContent = `Surah ${surahName}, Ayah ${verseNumber}`;
        }
    } catch (error) {
        console.error('Error fetching Ayah:', error);
        const ayahText = document.getElementById('ayahText');
        ayahText.innerHTML = `
            <p class="english-text">Failed to load Ayah. Please try again later.</p>
        `;
    }
}

// Add helper function to compare dates
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Initialize
function init() {
    selectedDate = new Date(); // Start with today's date
    updateCurrentTime();
    fetchPrayerTimes(selectedDate);
    fetchRandomAyah();
    updateTodayButtonVisibility();

    // Update current time every second
    setInterval(updateCurrentTime, 1000);
    
    // Update prayer times every minute only if viewing current date
    setInterval(() => {
        const now = new Date();
        if (isSameDay(selectedDate, now)) {
            fetchPrayerTimes(now);
        }
    }, 60000);

    // Refresh Ayah every 6 hours
    setInterval(fetchRandomAyah, 6 * 60 * 60 * 1000);
}

// Start the app
init();