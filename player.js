// Audio Player Controller
class AudioPlayer {
    constructor() {
        this.audioElement = document.getElementById('audioPlayer');
        this.currentSongId = null;
        this.isPlaying = false;
        this.volume = 0.7;
        this.playbackSpeed = 1;
        this.repeatMode = 0; // 0: off, 1: all, 2: one
        this.isShuffled = false;
        
        // Audio context for visualizer and equalizer
        this.audioContext = null;
        this.analyser = null;
        this.sourceNode = null;
        this.gainNode = null;
        this.filters = [];
        
        // Crossfade
        this.crossfadeDuration = 2;
        this.fadeOutStarted = false;
        
        this.initAudioElement();
        this.setupAudioContext();
    }
    
    initAudioElement() {
        this.audioElement.volume = this.volume;
        this.audioElement.playbackRate = this.playbackSpeed;
        
        // Event listeners
        this.audioElement.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.audioElement.addEventListener('ended', () => this.onEnded());
        this.audioElement.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
        this.audioElement.addEventListener('play', () => this.onPlay());
        this.audioElement.addEventListener('pause', () => this.onPause());
    }
    
    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create nodes
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 64; // 32 bars
            this.gainNode = this.audioContext.createGain();
            
            // Create 5-band equalizer
            const frequencies = [60, 250, 1000, 4000, 12000]; // Bass, Low-Mid, Mid, High-Mid, Treble
            frequencies.forEach(freq => {
                const filter = this.audioContext.createBiquadFilter();
                filter.type = 'peaking';
                filter.frequency.value = freq;
                filter.Q.value = 1;
                filter.gain.value = 0;
                this.filters.push(filter);
            });
            
            // Connect source when audio plays
            if (!this.sourceNode) {
                this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
                
                // Connect: source -> filters -> analyser -> gain -> destination
                let lastNode = this.sourceNode;
                this.filters.forEach(filter => {
                    lastNode.connect(filter);
                    lastNode = filter;
                });
                lastNode.connect(this.analyser);
                this.analyser.connect(this.gainNode);
                this.gainNode.connect(this.audioContext.destination);
            }
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }
    
    play(songId) {
        const song = getSongById(songId);
        if (!song) return;
        
        // Resume audio context if suspended
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.currentSongId = songId;
        this.fadeOutStarted = false;
        
        // Load and play
        this.audioElement.src = song.audioSrc;
        this.audioElement.load();
        this.audioElement.play().catch(err => console.warn('Play error:', err));
        
        this.isPlaying = true;
        
        // Update play count after 30 seconds
        setTimeout(() => {
            if (this.currentSongId === songId && this.isPlaying) {
                song.playCount++;
                appState.stats.totalPlays++;
                appState.stats.totalListeningTime += 30;
                saveToStorage();
            }
        }, 30000);
    }
    
    pause() {
        this.audioElement.pause();
        this.isPlaying = false;
    }
    
    resume() {
        if (this.audioElement.src) {
            this.audioElement.play().catch(err => console.warn('Resume error:', err));
            this.isPlaying = true;
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.currentSongId) {
                this.resume();
            } else if (appState.currentPlaylist.length > 0) {
                this.play(appState.currentPlaylist[0]);
            }
        }
    }
    
    next() {
        const nextSong = getNextSong();
        if (nextSong) {
            this.play(nextSong.id);
        }
    }
    
    previous() {
        if (this.audioElement.currentTime > 3) {
            this.audioElement.currentTime = 0;
        } else {
            const prevSong = getPreviousSong();
            if (prevSong) {
                this.play(prevSong.id);
            }
        }
    }
    
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        this.audioElement.volume = this.volume;
    }
    
    setSpeed(speed) {
        this.playbackSpeed = speed;
        this.audioElement.playbackRate = speed;
    }
    
    setRepeatMode(mode) {
        this.repeatMode = mode;
    }
    
    setShuffleMode(enabled) {
        this.isShuffled = enabled;
    }
    
    seek(percent) {
        if (this.audioElement.duration) {
            this.audioElement.currentTime = (percent / 100) * this.audioElement.duration;
        }
    }
    
    setEqualizer(bandIndex, gain) {
        if (this.filters[bandIndex]) {
            this.filters[bandIndex].gain.value = gain;
        }
    }
    
    resetEqualizer() {
        this.filters.forEach(filter => {
            filter.gain.value = 0;
        });
    }
    
    getFrequencyData() {
        if (!this.analyser) return new Uint8Array(32);
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }
    
    onTimeUpdate() {
        const currentTime = this.audioElement.currentTime;
        const duration = this.audioElement.duration;
        
        if (isNaN(duration)) return;
        
        const progress = (currentTime / duration) * 100;
        updateProgressBar(progress, currentTime, duration);
        updateProgressRing(progress);
        
        // Update stats
        if (this.isPlaying) {
            appState.stats.totalListeningTime += 0.1;
        }
        
        // Crossfade logic
        if (duration - currentTime <= this.crossfadeDuration && !this.fadeOutStarted) {
            this.startCrossfade();
        }
    }
    
    startCrossfade() {
        this.fadeOutStarted = true;
        const startVolume = this.volume;
        const fadeSteps = 20;
        const stepDuration = (this.crossfadeDuration * 1000) / fadeSteps;
        
        let step = 0;
        const fadeInterval = setInterval(() => {
            step++;
            const newVolume = startVolume * (1 - (step / fadeSteps));
            this.audioElement.volume = newVolume;
            
            if (step >= fadeSteps) {
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }
    
    onEnded() {
        this.isPlaying = false;
        this.audioElement.volume = this.volume;
        this.fadeOutStarted = false;
        
        // Add to history
        if (this.currentSongId) {
            addToHistory(this.currentSongId);
        }
        
        if (this.repeatMode === 2) {
            // Repeat current song
            this.play(this.currentSongId);
        } else if (this.repeatMode === 1 || hasNextSong()) {
            // Play next song
            this.next();
        } else {
            // Stop playing
            updatePlayButton(false);
        }
    }
    
    onLoadedMetadata() {
        const duration = this.audioElement.duration;
        updateDuration(duration);
    }
    
    onPlay() {
        this.isPlaying = true;
        updatePlayButton(true);
    }
    
    onPause() {
        this.isPlaying = false;
        updatePlayButton(false);
    }
}

// Initialize player
const player = new AudioPlayer();