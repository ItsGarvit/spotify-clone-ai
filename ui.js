// UI Controller - Handles all DOM manipulation and rendering

// Render songs grid
function renderSongs(songs, containerId = 'songsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!songs || songs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎵</div>
                <p>No songs found</p>
            </div>
        `;
        return;
    }
    
    songs.forEach((song, index) => {
        const songCard = createSongCard(song, index);
        container.appendChild(songCard);
    });
}

// Create song card element
function createSongCard(song, index) {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.style.animationDelay = `${(index % 6) * 50}ms`;
    
    const isPlaying = player.currentSongId === song.id && player.isPlaying;
    
    card.innerHTML = `
        <div class="album-art-container">
            <img src="${song.albumArt}" alt="${song.title}" class="album-art">
            <div class="play-overlay ${isPlaying ? 'playing-indicator' : ''}">
                <span class="play-icon">${isPlaying ? '⏸' : '▶'}</span>
            </div>
        </div>
        <div class="song-title" title="${song.title}">${song.title}</div>
        <div class="song-artist" title="${song.artist}">${song.artist}</div>
        <div class="song-meta">
            <span>${song.duration}</span>
            ${song.playCount > 0 ? `<span class="play-count">▶ ${song.playCount}</span>` : ''}
        </div>
    `;
    
    card.addEventListener('click', () => {
        if (player.currentSongId === song.id && player.isPlaying) {
            player.pause();
        } else {
            playSongFromList(song.id);
        }
    });
    
    return card;
}

// Update player UI
function updatePlayerUI(song) {
    if (!song) return;
    
    document.getElementById('playerAlbumArt').src = song.albumArt;
    document.getElementById('playerSongTitle').textContent = song.title;
    document.getElementById('playerSongArtist').textContent = song.artist;
    
    // Update like button
    const likeBtn = document.getElementById('likeBtn');
    likeBtn.textContent = song.liked ? '♥' : '♡';
    likeBtn.classList.toggle('liked', song.liked);
    
    // Update document title
    document.title = `${song.title} - ${song.artist} | Spotify Clone`;
}

// Update play button
function updatePlayButton(isPlaying) {
    const playBtnIcon = document.getElementById('playBtnIcon');
    playBtnIcon.textContent = isPlaying ? '⏸' : '▶';
    
    // Update all song cards
    if (player.currentSongId) {
        document.querySelectorAll('.song-card').forEach(card => {
            const overlay = card.querySelector('.play-overlay');
            const icon = card.querySelector('.play-icon');
            if (overlay && icon) {
                overlay.classList.remove('playing-indicator');
                icon.textContent = '▶';
            }
        });
        
        // Update current song card
        if (isPlaying) {
            const cards = Array.from(document.querySelectorAll('.song-card'));
            cards.forEach(card => {
                const title = card.querySelector('.song-title')?.textContent;
                const currentSong = getSongById(player.currentSongId);
                if (currentSong && title === currentSong.title) {
                    const overlay = card.querySelector('.play-overlay');
                    const icon = card.querySelector('.play-icon');
                    if (overlay && icon) {
                        overlay.classList.add('playing-indicator');
                        icon.textContent = '⏸';
                    }
                }
            });
        }
    }
}

// Update progress bar
function updateProgressBar(percent, currentTime, duration) {
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    
    progressFill.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
}

// Update duration display
function updateDuration(duration) {
    const totalTimeEl = document.getElementById('totalTime');
    totalTimeEl.textContent = formatTime(duration);
}

// Update progress ring around album art
function updateProgressRing(percent) {
    const canvas = document.getElementById('progressRing');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = 35;
    const centerY = 35;
    const radius = 32;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * percent / 100);
    
    ctx.clearRect(0, 0, 70, 70);
    
    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#1DB954';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Render visualizer
function renderVisualizer() {
    const canvas = document.getElementById('visualizer');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const dataArray = player.getFrequencyData();
    const barCount = 25;
    const barWidth = width / barCount;
    
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * dataArray.length / barCount);
        const value = dataArray[dataIndex] || 0;
        const barHeight = (value / 255) * height * 0.8;
        
        const x = i * barWidth;
        const y = height - barHeight;
        
        // Color based on frequency (bass = red, mid = green, treble = blue)
        let color;
        if (i < barCount * 0.3) {
            color = '#FF6B35'; // Bass - orange/red
        } else if (i < barCount * 0.7) {
            color = '#1DB954'; // Mid - green
        } else {
            color = '#3B82F6'; // Treble - blue
        }
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
    }
    
    if (player.isPlaying) {
        requestAnimationFrame(renderVisualizer);
    }
}

// Update volume UI
function updateVolumeUI(volume) {
    const volumeFill = document.getElementById('volumeFill');
    const volumeIcon = document.getElementById('volumeIcon');
    
    volumeFill.style.width = `${volume * 100}%`;
    
    if (volume === 0) {
        volumeIcon.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
}

// Render playlists
function renderPlaylists() {
    const container = document.getElementById('playlistsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    appState.playlists.forEach(playlist => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        if (appState.currentPlaylistId === playlist.id) {
            item.classList.add('active');
        }
        
        const songCount = playlist.songs.length;
        
        item.innerHTML = `
            <span>${playlist.name} ${songCount > 0 ? `(${songCount})` : ''}</span>
            ${playlist.editable ? `
                <div class="playlist-item-actions">
                    <button class="playlist-action-btn" data-action="rename" data-id="${playlist.id}" title="Rename">✏️</button>
                    <button class="playlist-action-btn" data-action="delete" data-id="${playlist.id}" title="Delete">🗑️</button>
                </div>
            ` : ''}
        `;
        
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('playlist-action-btn')) {
                const action = e.target.dataset.action;
                const id = e.target.dataset.id;
                if (action === 'delete') {
                    deletePlaylist(id);
                } else if (action === 'rename') {
                    renamePlaylist(id);
                }
            } else {
                loadPlaylist(playlist.id);
            }
        });
        
        container.appendChild(item);
    });
}

// Render queue
function renderQueue() {
    const container = document.getElementById('queueList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (appState.queue.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-size: 14px;">Queue is empty</p>';
        return;
    }
    
    appState.queue.forEach((songId, index) => {
        const song = getSongById(songId);
        if (!song) return;
        
        const item = createQueueItem(song, index);
        container.appendChild(item);
    });
}

// Create queue item
function createQueueItem(song, index) {
    const item = document.createElement('div');
    item.className = 'queue-item';
    item.draggable = true;
    item.dataset.index = index;
    item.dataset.songId = song.id;
    
    item.innerHTML = `
        <img src="${song.albumArt}" alt="${song.title}" class="queue-item-art">
        <div class="queue-item-info">
            <div class="queue-item-title">${song.title}</div>
            <div class="queue-item-artist">${song.artist}</div>
        </div>
        <div class="queue-item-actions">
            <button class="queue-action-btn" data-action="remove" data-index="${index}" title="Remove">×</button>
        </div>
    `;
    
    // Drag and drop handlers
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
    
    // Remove button
    const removeBtn = item.querySelector('[data-action="remove"]');
    removeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromQueue(index);
    });
    
    return item;
}

// Render history
function renderHistory() {
    const container = document.getElementById('historyList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (appState.history.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-size: 14px;">No history yet</p>';
        return;
    }
    
    const recentHistory = appState.history.slice(-5).reverse();
    
    recentHistory.forEach(songId => {
        const song = getSongById(songId);
        if (!song) return;
        
        const item = createQueueItem(song, -1);
        item.classList.remove('queue-item');
        item.classList.add('history-item');
        item.draggable = false;
        item.querySelector('.queue-item-actions')?.remove();
        
        item.addEventListener('click', () => {
            playSongFromList(song.id);
        });
        
        container.appendChild(item);
    });
}

// Render recommendations
function renderRecommendations() {
    const container = document.getElementById('contextRecommendations');
    if (!container) return;
    
    const currentSong = player.currentSongId ? getSongById(player.currentSongId) : null;
    const recommendations = getRecommendations(currentSong, 8);
    
    container.innerHTML = '';
    
    if (currentSong) {
        const header = document.createElement('p');
        header.style.color = 'var(--text-secondary)';
        header.style.fontSize = '14px';
        header.style.marginBottom = '16px';
        header.textContent = `"${currentSong.title}"`;
        container.appendChild(header);
    }
    
    recommendations.forEach(song => {
        const item = createQueueItem(song, -1);
        item.classList.remove('queue-item');
        item.draggable = false;
        item.querySelector('.queue-item-actions')?.remove();
        
        item.addEventListener('click', () => {
            addToQueue(song.id);
        });
        
        container.appendChild(item);
    });
}

// Render analytics
function renderAnalytics() {
    document.getElementById('totalListeningTime').textContent = 
        `${Math.floor(appState.stats.totalListeningTime / 60)} min`;
    document.getElementById('totalSongsPlayed').textContent = appState.stats.totalPlays;
    document.getElementById('totalLikedSongs').textContent = 
        appState.playlists.find(p => p.id === 'liked')?.songs.length || 0;
    document.getElementById('totalPlaylists').textContent = appState.playlists.length;
    
    // Most played songs
    const mostPlayed = [...songsData]
        .filter(s => s.playCount > 0)
        .sort((a, b) => b.playCount - a.playCount)
        .slice(0, 10);
    
    const container = document.getElementById('mostPlayedList');
    container.innerHTML = '';
    
    if (mostPlayed.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">No plays yet</p>';
        return;
    }
    
    mostPlayed.forEach((song, index) => {
        const item = createQueueItem(song, -1);
        item.draggable = false;
        item.querySelector('.queue-item-actions')?.remove();
        
        // Add rank
        const rank = document.createElement('div');
        rank.style.cssText = 'font-size: 20px; font-weight: bold; color: var(--accent-green); min-width: 30px;';
        rank.textContent = index + 1;
        item.insertBefore(rank, item.firstChild);
        
        // Add play count
        const playCount = document.createElement('div');
        playCount.style.cssText = 'font-size: 12px; color: var(--text-secondary);';
        playCount.textContent = `${song.playCount} plays`;
        item.querySelector('.queue-item-info').appendChild(playCount);
        
        item.addEventListener('click', () => {
            playSongFromList(song.id);
        });
        
        container.appendChild(item);
    });
}

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}