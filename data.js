// Sample Music Data
const songsData = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        genre: "Synthwave",
        year: 2019,
        duration: "3:20",
        durationSeconds: 200,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2019-11-29"
    },
    {
        id: 2,
        title: "Good as Hell",
        artist: "Lizzo",
        album: "Cuz I Love You",
        genre: "Pop",
        year: 2019,
        duration: "3:34",
        durationSeconds: 214,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2019-04-19"
    },
    {
        id: 3,
        title: "Electric Feel",
        artist: "MGMT",
        album: "Oracular Spectacular",
        genre: "Indie Pop",
        year: 2007,
        duration: "3:48",
        durationSeconds: 228,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2007-04-16"
    },
    {
        id: 4,
        title: "Midnight City",
        artist: "M83",
        album: "Hurry Up, We're Dreaming",
        genre: "Synthpop",
        year: 2011,
        duration: "4:09",
        durationSeconds: 249,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        albumArt: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2011-10-17"
    },
    {
        id: 5,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        genre: "Disco",
        year: 2020,
        duration: "3:24",
        durationSeconds: 204,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        albumArt: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2020-10-27"
    },
    {
        id: 6,
        title: "One Dance",
        artist: "Drake ft. Wizkid & Kyla",
        album: "Views",
        genre: "Hip Hop",
        year: 2016,
        duration: "2:54",
        durationSeconds: 174,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        albumArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2016-04-29"
    },
    {
        id: 7,
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        genre: "Funk",
        year: 2014,
        duration: "4:30",
        durationSeconds: 270,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        albumArt: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2014-10-24"
    },
    {
        id: 8,
        title: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        genre: "Pop",
        year: 2022,
        duration: "2:47",
        durationSeconds: 167,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2022-04-01"
    },
    {
        id: 9,
        title: "Blinding Lights (Remix)",
        artist: "The Weeknd & Rosalía",
        album: "After Hours (Deluxe)",
        genre: "Synthwave",
        year: 2021,
        duration: "3:45",
        durationSeconds: 225,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2021-03-12"
    },
    {
        id: 10,
        title: "Take On Me",
        artist: "a-ha",
        album: "Hunting High and Low",
        genre: "Synthpop",
        year: 1985,
        duration: "3:48",
        durationSeconds: 228,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "1985-01-01"
    },
    {
        id: 11,
        title: "Titanium",
        artist: "David Guetta ft. Sia",
        album: "Nothing but the Beat",
        genre: "EDM",
        year: 2011,
        duration: "4:08",
        durationSeconds: 248,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2011-04-04"
    },
    {
        id: 12,
        title: "Mr. Brightside",
        artist: "The Killers",
        album: "Hot Fuss",
        genre: "Rock",
        year: 2003,
        duration: "3:43",
        durationSeconds: 223,
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        albumArt: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
        playCount: 0,
        liked: false,
        explicit: false,
        releaseDate: "2003-06-07"
    }
];

// Predefined Playlists
const defaultPlaylists = [
    {
        id: 'all',
        name: 'All Songs',
        songs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        editable: false
    },
    {
        id: 'liked',
        name: 'Liked Songs',
        songs: [],
        editable: false
    },
    {
        id: 'workout',
        name: 'Workout Vibes',
        songs: [7, 11, 6, 5],
        editable: true
    },
    {
        id: 'chill',
        name: 'Chill Vibes',
        songs: [2, 8, 4, 10],
        editable: true
    }
];

// Get all unique genres
function getGenres() {
    const genres = [...new Set(songsData.map(song => song.genre))];
    return genres.sort();
}

// Get all unique years
function getYears() {
    const years = [...new Set(songsData.map(song => song.year))];
    return years.sort((a, b) => b - a);
}

// Get song by ID
function getSongById(id) {
    return songsData.find(song => song.id === id);
}

// Get songs by IDs
function getSongsByIds(ids) {
    return ids.map(id => getSongById(id)).filter(song => song !== undefined);
}

// Get random songs (for recommendations)
function getRandomSongs(count, excludeIds = []) {
    const availableSongs = songsData.filter(song => !excludeIds.includes(song.id));
    const shuffled = [...availableSongs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Get songs by genre
function getSongsByGenre(genre) {
    return songsData.filter(song => song.genre === genre);
}

// Get recommendations based on a song
function getRecommendations(baseSong, count = 5) {
    if (!baseSong) return getRandomSongs(count);
    
    // First, get songs from the same genre
    const sameGenre = getSongsByGenre(baseSong.genre)
        .filter(song => song.id !== baseSong.id);
    
    // If not enough, add random songs
    if (sameGenre.length < count) {
        const additionalSongs = getRandomSongs(
            count - sameGenre.length,
            [...sameGenre.map(s => s.id), baseSong.id]
        );
        return [...sameGenre, ...additionalSongs].slice(0, count);
    }
    
    return sameGenre.slice(0, count);
}