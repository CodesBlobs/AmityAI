document.getElementById('allowBtn').addEventListener('click', async () => {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        // Permission granted
        window.close();
    } catch (err) {
        console.error('Permission denied', err);
        alert('Permission denied. Please allow microphone access in settings.');
    }
});
