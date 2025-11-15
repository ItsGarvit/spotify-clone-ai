# Advanced Spotify Clone

A feature-rich, front-end web application that replicates the core functionality and feel of the Spotify music player. This project is built from scratch using only **HTML**, **CSS**, and **vanilla JavaScript (ES6+)**, demonstrating a modular, event-driven architecture.

It includes advanced features like a Web Audio API-powered equalizer, a real-time visualizer, and a complete analytics dashboard.

![A placeholder image of the Spotify Clone UI. You can replace this with a screenshot of your project.]

## 🚀 Features

This application is more than just a simple music player. It includes a wide range of features:

### 🎵 Core Playback
* **Full Player Controls:** Play, pause, next, and previous song.
* **Audio Progress Bar:** Clickable and draggable (seek) progress bar that updates in real-time.
* **Volume Control:** A-la-Spotify volume slider and mute toggle.
* **Playback Modes:**
    * **Shuffle:** Randomize the play order of the current playlist.
    * **Repeat:** Toggle between repeat-all, repeat-one, and no-repeat.
* **Keyboard Shortcuts:** Control playback with your keyboard (e.g., `Space` for play/pause, `ArrowRight` for next).

### 🎛️ Advanced Audio
* **5-Band Equalizer:** A modal-based equalizer built with the **Web Audio API** to adjust audio frequencies (60, 250, 1000, 4000, 12000 Hz).
* **Playback Speed Control:** Adjust playback speed (0.5x, 1x, 1.5x, 2x).
* **Real-time Audio Visualizer:** A multi-colored `<canvas>` visualizer that syncs with the audio frequency data.
* **Crossfade on Next:** Smoothly fades out a song as it approaches the end to transition to the next track.

### 📱 UI / UX
* **Modular Interface:** A three-column layout (Sidebar, Main Content, Right Panel) just like the desktop app.
* **View Switching:** A Single Page Application (SPA) feel with dynamic view switching (Home, Search, Library, Analytics) without page reloads.
* **Theme Toggle:** Switch between a custom-built light and dark mode.
* **Responsive Design:** Adapts to various screen sizes, from desktop to mobile.

### 🎼 Content & State Management
* **Dynamic Playlists:** Create, rename, and delete your own custom playlists.
* **Queue Management:**
    * View and clear the upcoming song queue.
    * **Drag-and-Drop** to reorder queue items.
* **"Liked Songs" System:** Add or remove songs from your "Liked Songs" playlist.
* **Live Search & Filtering:** Instantly search for songs, artists, or albums, and filter results by genre or year.
* **Analytics Dashboard:** A dedicated view to see your listening stats, including total listening time, total plays, and a list of your most-played songs.

## 🛠️ Tech Stack

* **HTML5:** For the semantic structure of the application.
* **CSS3:** For all styling, layout, and animations.
    * **Flexbox** and **Grid** for the core layout.
    * **CSS Variables** for easy theming (light/dark) and maintenance.
    * **Animations** and **Transitions** for a smooth, native-like feel.
* **JavaScript (ES6+):**
    * **No frameworks**, just pure, modular vanilla JavaScript.
    * **Class-based Player:** A dedicated `AudioPlayer` class (`player.js`) encapsulates all audio logic.
    * **Modular Architecture:** Code is split into logical files:
        * `app.js`: Main application state, event listeners, and business logic.
        * `ui.js`: All functions that manipulate the DOM.
        * `player.js`: The audio player class.
        * `data.js`: Static data for songs and playlists.
* **Web Audio API:** Used for the equalizer and audio visualizer.
* **HTML5 `<canvas>`:** Used to draw the real-time audio visualizer.

## 📁 Project Structure
index.html # The main HTML file
style.css # All application styles (layout, theme, responsiveness)
app.js # Main application logic, state, and event listeners
ui.js # All DOM rendering and manipulation functions
player.js # The AudioPlayer class and Web Audio API logic
data.js # Sample song and playlist data

Based on the project files you've uploaded, here is a comprehensive `README.md` file you can use.

This README is designed to showcase your project effectively on GitHub, highlighting its advanced features (like the Web Audio API, analytics, and queue management) and the clean, modular code structure you've used.

-----

You can copy and paste the text below directly into a new file named `README.md` in your project's root folder.

```markdown
# Advanced Spotify Clone

A feature-rich, front-end web application that replicates the core functionality and feel of the Spotify music player. This project is built from scratch using only **HTML**, **CSS**, and **vanilla JavaScript (ES6+)**, demonstrating a modular, event-driven architecture.

It includes advanced features like a Web Audio API-powered equalizer, a real-time visualizer, and a complete analytics dashboard.

![A placeholder image of the Spotify Clone UI. You can replace this with a screenshot of your project.]

## 🚀 Features

This application is more than just a simple music player. It includes a wide range of features:

### 🎵 Core Playback
* **Full Player Controls:** Play, pause, next, and previous song.
* **Audio Progress Bar:** Clickable and draggable (seek) progress bar that updates in real-time.
* **Volume Control:** A-la-Spotify volume slider and mute toggle.
* **Playback Modes:**
    * **Shuffle:** Randomize the play order of the current playlist.
    * **Repeat:** Toggle between repeat-all, repeat-one, and no-repeat.
* **Keyboard Shortcuts:** Control playback with your keyboard (e.g., `Space` for play/pause, `ArrowRight` for next).

### 🎛️ Advanced Audio
* **5-Band Equalizer:** A modal-based equalizer built with the **Web Audio API** to adjust audio frequencies (60, 250, 1000, 4000, 12000 Hz).
* **Playback Speed Control:** Adjust playback speed (0.5x, 1x, 1.5x, 2x).
* **Real-time Audio Visualizer:** A multi-colored `<canvas>` visualizer that syncs with the audio frequency data.
* **Crossfade on Next:** Smoothly fades out a song as it approaches the end to transition to the next track.

### 📱 UI / UX
* **Modular Interface:** A three-column layout (Sidebar, Main Content, Right Panel) just like the desktop app.
* **View Switching:** A Single Page Application (SPA) feel with dynamic view switching (Home, Search, Library, Analytics) without page reloads.
* **Theme Toggle:** Switch between a custom-built light and dark mode.
* **Responsive Design:** Adapts to various screen sizes, from desktop to mobile.

### 🎼 Content & State Management
* **Dynamic Playlists:** Create, rename, and delete your own custom playlists.
* **Queue Management:**
    * View and clear the upcoming song queue.
    * **Drag-and-Drop** to reorder queue items.
* **"Liked Songs" System:** Add or remove songs from your "Liked Songs" playlist.
* **Live Search & Filtering:** Instantly search for songs, artists, or albums, and filter results by genre or year.
* **Analytics Dashboard:** A dedicated view to see your listening stats, including total listening time, total plays, and a list of your most-played songs.

## 🛠️ Tech Stack

* **HTML5:** For the semantic structure of the application.
* **CSS3:** For all styling, layout, and animations.
    * **Flexbox** and **Grid** for the core layout.
    * **CSS Variables** for easy theming (light/dark) and maintenance.
    * **Animations** and **Transitions** for a smooth, native-like feel.
* **JavaScript (ES6+):**
    * **No frameworks**, just pure, modular vanilla JavaScript.
    * **Class-based Player:** A dedicated `AudioPlayer` class (`player.js`) encapsulates all audio logic.
    * **Modular Architecture:** Code is split into logical files:
        * `app.js`: Main application state, event listeners, and business logic.
        * `ui.js`: All functions that manipulate the DOM.
        * `player.js`: The audio player class.
        * `data.js`: Static data for songs and playlists.
* **Web Audio API:** Used for the equalizer and audio visualizer.
* **HTML5 `<canvas>`:** Used to draw the real-time audio visualizer.

## 📁 Project Structure

```

.
├── index.html       \# The main HTML file
├── style.css        \# All application styles (layout, theme, responsiveness)
├── app.js           \# Main application logic, state, and event listeners
├── ui.js            \# All DOM rendering and manipulation functions
├── player.js        \# The AudioPlayer class and Web Audio API logic
└── data.js          \# Sample song and playlist data

````

## 🏁 How to Run

This project is fully front-end and requires no backend or build steps. However, due to browser security policies (**CORS**) related to loading audio files and using the **Web Audio API**, you cannot just open the `index.html` file from your local filesystem.

It **must be served by a local server**. The easiest way to do this is:

### Option 1: Using VS Code Live Server
1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code.
2.  Open the project folder in VS Code.
3.  Right-click on `index.html` and select "**Open with Live Server**".

### Option 2: Using Python
1.  Make sure you have Python installed.
2.  Open your terminal or command prompt and navigate to the project's root folder.
3.  Run the following command:
    ```bash
    # For Python 3
    python -m http.server
    
    # For Python 2
    python -m SimpleHTTPServer
    ```
4.  Open your browser and go to `http://localhost:8000`.

## 📝 Notes & Credits

* This is a front-end-only demonstration. All data (songs, playlists) is loaded from the local `data.js` file.
* All audio files are samples from [SoundHelix](https://www.soundhelix.com/examples).
* All album art is placeholder images from [Unsplash](https://unsplash.com/).
````
