document.addEventListener('DOMContentLoaded', () => {
    const captureBtn = document.getElementById('capture-btn');
    const screenshotDisplay = document.getElementById('screenshot-display');

    captureBtn.addEventListener('click', () => {
        window.electronAPI.sendCaptureScreen();
    });

    window.electronAPI.onScreenshotCaptured((path) => {
        screenshotDisplay.src = path;
        screenshotDisplay.style.display = 'block';
    });
});