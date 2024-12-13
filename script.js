// This file will be used for additional interactivity later
document.addEventListener('DOMContentLoaded', function() {
    const natureSound = document.getElementById('natureSound');
    
    // Function to start audio with user interaction
    function initAudio() {
        // Unmute the audio (browsers require user interaction for unmuting)
        natureSound.muted = false;
        natureSound.volume = 1.0;
        natureSound.loop = true;
        
        // Try to play
        const playPromise = natureSound.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Initial playback failed:", error);
                // Add a one-time click handler to start audio
                document.addEventListener('click', startAudio, { once: true });
                document.addEventListener('touchstart', startAudio, { once: true });
            });
        }
    }

    // Function to start audio
    function startAudio() {
        natureSound.muted = false;
        natureSound.play().catch(error => console.log("Playback failed:", error));
    }

    // Start audio after a delay
    setTimeout(initAudio, 2000);

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && natureSound.paused) {
            natureSound.play().catch(error => console.log("Resume failed:", error));
        }
    });

    // Handle mobile browsers
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Add touch listener for mobile
        document.addEventListener('touchstart', function() {
            if (natureSound.paused) {
                startAudio();
            }
        }, { once: true });
    }

    // Handle desktop browsers that block autoplay
    window.addEventListener('click', function() {
        if (natureSound.paused) {
            startAudio();
        }
    }, { once: true });

    // Handle browser audio policy changes
    natureSound.addEventListener('pause', function() {
        if (!document.hidden) {
            natureSound.play().catch(error => console.log("Policy-based resume failed:", error));
        }
    });
});
