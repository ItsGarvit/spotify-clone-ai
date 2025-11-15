// Main Application State and Logic

// Global app state
const appState = {
    currentView: 'home',
    currentPlaylistId: 'all',
    currentPlaylist: [],
    queue: [],
    history: [],
    playlists: [],
    searchQuery: '',
    filters: {
        genre: '',
        year: ''
    },
    stats: {
        totalPlays: 0,
        totalListeningTime: 0
    },
    theme: 'dark'
};

// Drag and drop state
let draggedElement = null;
let draggedIndex = null;

// Initialize app
function initApp() {
    loadFromStorage();
    setupEventListeners();
    loadPlaylist('all');
    renderPlaylists();
    renderQueue();
    renderHistory();
    populateFilters();
    startVisualizerLoop();
    
    console.log('Advanced Spotify Clone initialized!');
}

// Storage functions (using in-memory storage since localStorage is blocked)
function saveToStorage() {
    // In a real app, this would save to localStorage
    // For this sandboxed environment, we keep everything in memory
    console.log('State saved to memory');
}

function loadFromStorage() {
    // Initialize playlists
    appState.playlists = JSON.parse(JSON.stringify(defaultPlaylists));
    
    // Update liked songs based on song data
    const likedPlaylist = appState.playlists.find(p => p.id === 'liked');
    if (likedPlaylist) {
        likedPlaylist.songs = songsData.filter(s => s.liked).map(s => s.id);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Player controls
    document.getElementById('playBtn').addEventListener('click', () => {
        player.togglePlayPause();
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        player.previous();
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        player.next();
    });
    
    document.getElementById('shuffleBtn').addEventListener('click', () => {
        toggleShuffle();
    });
    
    document.getElementById('repeatBtn').addEventListener('click', () => {
        toggleRepeat();
    });
    
    // Like button
    document.getElementById('likeBtn').addEventListener('click', () => {
        toggleLike();
    });
    
    // Progress bar
    document.getElementById('progressBar').addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        player.seek(percent);
    });
    
    // Volume controls
    document.getElementById('volumeSlider').addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        player.setVolume(percent);
        updateVolumeUI(percent);
    });
    
    document.getElementById('volumeIcon').addEventListener('click', () => {
        const newVolume = player.volume === 0 ? 0.7 : 0;
        player.setVolume(newVolume);
        updateVolumeUI(newVolume);
    });
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            switchView(item.dataset.view);
        });
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce((e) => {
        handleSearch(e.target.value);
    }, 300));
    
    // Filters
    document.getElementById('genreFilter').addEventListener('change', (e) => {
        appState.filters.genre = e.target.value;
        applyFilters();
    });
    
    document.getElementById('yearFilter').addEventListener('change', (e) => {
        appState.filters.year = e.target.value;
        applyFilters();
    });
    
    document.getElementById('clearFilters').addEventListener('click', () => {
        appState.filters.genre = '';
        appState.filters.year = '';
        document.getElementById('genreFilter').value = '';
        document.getElementById('yearFilter').value = '';
        handleSearch(searchInput.value);
    });
    
    // Modals
    document.getElementById('equalizerBtn').addEventListener('click', () => {
        openModal('equalizerModal');
    });
    
    document.getElementById('speedBtn').addEventListener('click', () => {
        openModal('speedModal');
    });
    
    document.getElementById('createPlaylistBtn').addEventListener('click', () => {
        openModal('playlistModal');
    });
    
    document.getElementById('closeEqualizer').addEventListener('click', () => {
        closeModal('equalizerModal');
    });
    
    document.getElementById('closeSpeed').addEventListener('click', () => {
        closeModal('speedModal');
    });
    
    document.getElementById('closePlaylistModal').addEventListener('click', () => {
        closeModal('playlistModal');
    });
    
    // Equalizer controls
    const eqSliders = document.querySelectorAll('.eq-slider');
    eqSliders.forEach((slider, index) => {
        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            player.setEqualizer(index, value);
            const valueDisplay = slider.parentElement.querySelector('.eq-value');
            valueDisplay.textContent = `${value > 0 ? '+' : ''}${value} dB`;
        });
    });
    
    document.getElementById('resetEqualizer').addEventListener('click', () => {
        player.resetEqualizer();
        eqSliders.forEach(slider => {
            slider.value = 0;
            const valueDisplay = slider.parentElement.querySelector('.eq-value');
            valueDisplay.textContent = '0 dB';
        });
    });
    
    // Speed controls
    document.querySelectorAll('.speed-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseFloat(btn.dataset.speed);
            player.setSpeed(speed);
            document.querySelectorAll('.speed-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelector('#speedBtn .control-icon').textContent = `${speed}x`;
        });
    });
    
    // Create playlist
    document.getElementById('savePlaylistBtn').addEventListener('click', () => {
        createPlaylist();
    });
    
    // Queue management
    document.getElementById('clearQueueBtn').addEventListener('click', () => {
        clearQueue();
    });
    
    // Panel tabs
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchPanelTab(tab.dataset.tab);
        });
    });
    
    // Hamburger menu
    document.getElementById('hamburgerBtn').addEventListener('click', () => {
        toggleSidebar();
    });
    
    // Mini player toggle
    document.getElementById('miniPlayerBtn').addEventListener('click', () => {
        toggleMiniPlayer();
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        toggleTheme();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// View switching
function switchView(view) {
    appState.currentView = view;
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });
    
    // Hide/show sections
    const searchContainer = document.getElementById('searchContainer');
    const analyticsView = document.getElementById('analyticsView');
    const songsGrid = document.getElementById('songsGrid');
    const recommendationsSection = document.getElementById('recommendationsSection');
    
    searchContainer.style.display = 'none';
    analyticsView.style.display = 'none';
    songsGrid.style.display = 'grid';
    recommendationsSection.style.display = 'none';
    
    switch(view) {
        case 'home':
            document.getElementById('sectionTitle').textContent = 'Good evening';
            document.getElementById('sectionSubtitle').textContent = '';
            loadPlaylist('all');
            recommendationsSection.style.display = 'block';
            renderRecommendations();
            break;
        case 'search':
            document.getElementById('sectionTitle').textContent = 'Search';
            document.getElementById('sectionSubtitle').textContent = 'Find your favorite music';
            searchContainer.style.display = 'block';
            document.getElementById('searchInput').focus();
            break;
        case 'library':
            document.getElementById('sectionTitle').textContent = 'Your Library';
            document.getElementById('sectionSubtitle').textContent = 'Your playlists and liked songs';
            loadPlaylist('liked');
            break;
        case 'analytics':
            document.getElementById('sectionTitle').textContent = 'Your Stats';
            document.getElementById('sectionSubtitle').textContent = 'See your listening history';
            analyticsView.style.display = 'block';
            songsGrid.style.display = 'none';
            renderAnalytics();
            break;
    }
}

// Playlist management
function loadPlaylist(playlistId) {
    const playlist = appState.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    appState.currentPlaylistId = playlistId;
    appState.currentPlaylist = playlist.songs;
    
    // Update UI
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const songs = getSongsByIds(playlist.songs);
    renderSongs(songs);
    
    // Update title
    if (appState.currentView === 'home' || appState.currentView === 'library') {
        document.getElementById('sectionTitle').textContent = playlist.name;
        document.getElementById('sectionSubtitle').textContent = 
            `${songs.length} song${songs.length !== 1 ? 's' : ''}`;
    }
}

function createPlaylist() {
    const input = document.getElementById('playlistNameInput');
    const name = input.value.trim();
    
    if (!name) {
        alert('Please enter a playlist name');
        return;
    }
    
    const newPlaylist = {
        id: 'custom_' + Date.now(),
        name: name,
        songs: [],
        editable: true
    };
    
    appState.playlists.push(newPlaylist);
    saveToStorage();
    renderPlaylists();
    closeModal('playlistModal');
    input.value = '';
    
    loadPlaylist(newPlaylist.id);
}

function deletePlaylist(playlistId) {
    if (!confirm('Delete this playlist?')) return;
    
    appState.playlists = appState.playlists.filter(p => p.id !== playlistId);
    saveToStorage();
    renderPlaylists();
    
    if (appState.currentPlaylistId === playlistId) {
        loadPlaylist('all');
    }
}

function renamePlaylist(playlistId) {
    const playlist = appState.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    const newName = prompt('Enter new name:', playlist.name);
    if (newName && newName.trim()) {
        playlist.name = newName.trim();
        saveToStorage();
        renderPlaylists();
    }
}

// Search and filtering
function handleSearch(query) {
    appState.searchQuery = query.toLowerCase();
    applyFilters();
}

function applyFilters() {
    let results = [...songsData];
    
    // Apply search query
    if (appState.searchQuery) {
        results = results.filter(song => 
            song.title.toLowerCase().includes(appState.searchQuery) ||
            song.artist.toLowerCase().includes(appState.searchQuery) ||
            song.album.toLowerCase().includes(appState.searchQuery)
        );
    }
    
    // Apply genre filter
    if (appState.filters.genre) {
        results = results.filter(song => song.genre === appState.filters.genre);
    }
    
    // Apply year filter
    if (appState.filters.year) {
        results = results.filter(song => song.year === parseInt(appState.filters.year));
    }
    
    renderSongs(results);
}

function populateFilters() {
    const genreFilter = document.getElementById('genreFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    // Populate genres
    const genres = getGenres();
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
    
    // Populate years
    const years = getYears();
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Playback functions
function playSongFromList(songId) {
    // Update current playlist to include this song if not already
    if (!appState.currentPlaylist.includes(songId)) {
        appState.currentPlaylist = [songId, ...appState.currentPlaylist];
    }
    
    // Clear queue and add remaining songs
    const currentIndex = appState.currentPlaylist.indexOf(songId);
    appState.queue = appState.currentPlaylist.slice(currentIndex + 1);
    
    player.play(songId);
    updatePlayerUI(getSongById(songId));
    renderQueue();
    renderRecommendations();
    
    // Start visualizer
    if (!player.isPlaying) {
        requestAnimationFrame(renderVisualizer);
    }
}

function getNextSong() {
    if (appState.queue.length > 0) {
        const nextId = appState.queue[0];
        appState.queue.shift();
        renderQueue();
        const song = getSongById(nextId);
        updatePlayerUI(song);
        return song;
    }
    
    if (player.isShuffled) {
        const randomSong = getRandomSongs(1, [player.currentSongId])[0];
        updatePlayerUI(randomSong);
        return randomSong;
    }
    
    return null;
}

function getPreviousSong() {
    if (appState.history.length > 1) {
        appState.history.pop(); // Remove current
        const prevId = appState.history[appState.history.length - 1];
        const song = getSongById(prevId);
        updatePlayerUI(song);
        return song;
    }
    return null;
}

function hasNextSong() {
    return appState.queue.length > 0 || player.isShuffled;
}

// Queue management
function addToQueue(songId) {
    appState.queue.push(songId);
    renderQueue();
    saveToStorage();
}

function removeFromQueue(index) {
    appState.queue.splice(index, 1);
    renderQueue();
    saveToStorage();
}

function clearQueue() {
    appState.queue = [];
    renderQueue();
    saveToStorage();
}

function addToHistory(songId) {
    appState.history.push(songId);
    if (appState.history.length > 50) {
        appState.history.shift();
    }
    renderHistory();
    saveToStorage();
}

// Player controls
function toggleShuffle() {
    player.setShuffleMode(!player.isShuffled);
    document.getElementById('shuffleBtn').classList.toggle('active', player.isShuffled);
}

function toggleRepeat() {
    const nextMode = (player.repeatMode + 1) % 3;
    player.setRepeatMode(nextMode);
    
    const repeatBtn = document.getElementById('repeatBtn');
    const icon = repeatBtn.querySelector('.control-icon');
    
    if (nextMode === 0) {
        repeatBtn.classList.remove('active');
        icon.textContent = '🔁';
    } else if (nextMode === 1) {
        repeatBtn.classList.add('active');
        icon.textContent = '🔁';
    } else {
        repeatBtn.classList.add('active');
        icon.textContent = '🔂';
    }
}

function toggleLike() {
    if (!player.currentSongId) return;
    
    const song = getSongById(player.currentSongId);
    if (!song) return;
    
    song.liked = !song.liked;
    
    // Update liked playlist
    const likedPlaylist = appState.playlists.find(p => p.id === 'liked');
    if (song.liked) {
        if (!likedPlaylist.songs.includes(song.id)) {
            likedPlaylist.songs.push(song.id);
        }
    } else {
        likedPlaylist.songs = likedPlaylist.songs.filter(id => id !== song.id);
    }
    
    updatePlayerUI(song);
    renderPlaylists();
    saveToStorage();
    
    // If currently viewing liked songs, refresh
    if (appState.currentPlaylistId === 'liked') {
        loadPlaylist('liked');
    }
}

// Drag and drop handlers
function handleDragStart(e) {
    draggedElement = e.currentTarget;
    draggedIndex = parseInt(e.currentTarget.dataset.index);
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const targetElement = e.currentTarget;
    if (targetElement !== draggedElement && targetElement.classList.contains('queue-item')) {
        const rect = targetElement.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        
        if (e.clientY < midpoint) {
            targetElement.style.borderTop = '2px solid var(--accent-green)';
            targetElement.style.borderBottom = '';
        } else {
            targetElement.style.borderBottom = '2px solid var(--accent-green)';
            targetElement.style.borderTop = '';
        }
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    const targetElement = e.currentTarget;
    const targetIndex = parseInt(targetElement.dataset.index);
    
    if (draggedIndex !== targetIndex && draggedIndex !== null) {
        // Reorder queue
        const item = appState.queue.splice(draggedIndex, 1)[0];
        appState.queue.splice(targetIndex, 0, item);
        
        renderQueue();
        saveToStorage();
    }
    
    // Clear border indicators
    document.querySelectorAll('.queue-item').forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
    });
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    draggedElement = null;
    draggedIndex = null;
    
    // Clear border indicators
    document.querySelectorAll('.queue-item').forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
    });
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Panel tab switching
function switchPanelTab(tabName) {
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    document.querySelectorAll('.panel-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tabName === 'queue') {
        document.getElementById('queueTab').classList.add('active');
    } else if (tabName === 'recommendations') {
        document.getElementById('recommendationsTab').classList.add('active');
        renderRecommendations();
    }
}

// UI toggles
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

function toggleMiniPlayer() {
    const rightPanel = document.getElementById('rightPanel');
    rightPanel.classList.toggle('hidden');
}

function toggleTheme() {
    appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', appState.theme);
    
    const icon = document.querySelector('.theme-icon');
    icon.textContent = appState.theme === 'dark' ? '🌙' : '☀️';
    
    saveToStorage();
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Don't trigger if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            player.togglePlayPause();
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (e.shiftKey) {
                // Seek forward 10 seconds
                player.audioElement.currentTime += 10;
            } else {
                player.next();
            }
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (e.shiftKey) {
                // Seek backward 10 seconds
                player.audioElement.currentTime -= 10;
            } else {
                player.previous();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            player.setVolume(Math.min(1, player.volume + 0.1));
            updateVolumeUI(player.volume);
            break;
        case 'ArrowDown':
            e.preventDefault();
            player.setVolume(Math.max(0, player.volume - 0.1));
            updateVolumeUI(player.volume);
            break;
        case 'KeyL':
            e.preventDefault();
            toggleLike();
            break;
        case 'KeyS':
            e.preventDefault();
            toggleShuffle();
            break;
        case 'KeyR':
            e.preventDefault();
            toggleRepeat();
            break;
    }
}

// Visualizer loop
function startVisualizerLoop() {
    setInterval(() => {
        if (player.isPlaying) {
            renderVisualizer();
        }
    }, 50);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}