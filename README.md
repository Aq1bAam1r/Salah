# 🕌 Salah App

A modern, visually rich Islamic web app for London Salah Times, a Hadith Collection, and a beautiful Islamic Calendar. Everything is designed for clarity, speed, and flexibility—with a focus on user experience, responsive design, and easy customization.
✨ Features

    Accurate London Salah Times

        Real-time prayer times for London, UK (API-powered)

        Next prayer countdown with dynamic highlight and themed backgrounds

        Quick navigation for previous/next days

        Hijri and Gregorian date display

    Hadith Collection

        Browse, search, and filter authentic hadiths by category (Faith, Manners, Worship, Family, Social, Ethics)

        "Featured Hadith" of the day, plus recent hadiths

        Beautiful, readable cards with narrator/source details

    Islamic Calendar 2025

        Month grid with Islamic months and major events

        Click any month for detailed events in a modal

        Seamless year navigation

    Ayah of the Day

        Random Quranic verse (Arabic + English) with surah and ayah reference

    Mobile-First, Responsive UI

        Looks and feels great on any device

        Smooth navigation bar with icons

    Easy Theming & Customization

        All colors, gradients, and fonts are set via CSS variables—change the look with a few tweaks!

## 🚀 Quick Start

    Clone the repository:

bash
git clone https://github.com/Aq1bAam1r/Salah.git
cd islamic-utilities-app

Open salah.html in your browser.
No build step needed—just static files!

API Key:
The Salah Times app uses the [London Prayer Times API].

    Default API key is included for demo.

    To use your own, replace the apiKey variable in script.js

        .

## 🛠️ Project Structure
File/Folder	Description
index.html	Main Salah Times page
calendar.html	Islamic Calendar 2025
hadith.html	Hadith Collection
styles.css	Theme and layout (easy to customize)
script.js	All app logic and API integration
assets/	Icons, images, and fonts (optional)
🔑 API Details
Salah Times (London Prayer Times API)

    Endpoint:
    http://www.londonprayertimes.com/api/times/?format=json&key=YOUR_API_KEY&date=YYYY-MM-DD&24hours=true

    API Key:
    Default: cde641ff-cdde-4d25-8a62-4ec8cabc7f57
    (Replace with your own for production use!)

    Returns:
    Fajr, Dhuhr, Asr, Maghrib, Isha times for the specified date

    .

Hijri Date (Aladhan API)

    Endpoint:
    https://api.aladhan.com/v1/gToH/DD-MM-YYYY

    Returns:
    Hijri date for a given Gregorian date

    .

Ayah of the Day (AlQuran Cloud API)

    Endpoint:
    https://api.alquran.cloud/v1/ayah/{ayahNumber}/editions/quran-uthmani,en.asad

    Returns:
    Arabic and English translation of a random Quranic verse

    .

## 🎨 Customization & Theming

The look and feel are controlled by CSS variables in styles.css.
Want a new color palette? Just change these at the top


    Fonts: Uses [Poppins] and [Amiri] for a modern, readable blend.

    Icons: All navigation and UI icons are from [Font Awesome] and Google Material Icons.

## 📱 Responsive Design

    Mobile-first, but looks great on desktop

    Touch-friendly navigation and cards

    Bottom nav bar for quick access to all sections

## 🧩 Extending the App

    Add more cities:
    Swap out the API endpoint or add a dropdown for user location.

    Add more hadiths:
    Expand the hadiths array in hadith.html or connect to a hadith API

.

More calendar years:
Update the calendar data object or fetch from an external source

    .

    Dark/light themes:
    Add a toggle and swap CSS variables for instant theming.

## 🤝 Contributing

Pull requests are welcome!
If you have ideas for new features, bug fixes, or want to add more content, open an issue or PR.
## 📜 License

MIT — free for personal and commercial use.
## 🙏 Acknowledgements

    London Prayer Times API

    Aladhan Hijri API

    AlQuran Cloud API

    Font Awesome

    Google Fonts



# Exampler Usage:


![WhatsApp Image 2025-06-07 at 18 29 48_303ee67d](https://github.com/user-attachments/assets/fd1f2a3f-139a-45ae-aeaa-5df9ea704265)


![WhatsApp Image 2025-06-07 at 18 29 47_cf3d1009](https://github.com/user-attachments/assets/d3044898-3a01-417e-a005-12535e5490b1)


![WhatsApp Image 2025-06-07 at 18 29 47_a3e7be16](https://github.com/user-attachments/assets/a585579f-af6d-43b7-8a8f-0a454fdf4148)


![photos](https://github.com/user-attachments/assets/63659262-66c5-4823-8716-71707164ce06)


Ready to use, easy to extend, and beautiful out of the box.
Happy coding!


<p align="center"> <img src="https://img.icons8.com/color/48/000000/mosque.png" width="40"/> <b>May this app benefit you and your community!</b> </p>

    “The best of people are those who are most beneficial to people.”
              Prophet Muhammad ﷺ (Sunan At-Tirmidhi 2347)


