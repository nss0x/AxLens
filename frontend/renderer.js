document.addEventListener('DOMContentLoaded', () => {
    const captureBtn = document.getElementById('capture-btn');
    const screenshotDisplay = document.getElementById('screenshot-display');
    const analysisResultDiv = document.getElementById('analysis-result');

    captureBtn.addEventListener('click', () => {
        window.electronAPI.sendCaptureScreen();
    });

    window.electronAPI.onScreenshotCaptured((data) => {
        screenshotDisplay.src = data.path;
        screenshotDisplay.style.display = 'block';

        if (data.analysis) {
            analysisResultDiv.innerText = data.analysis;
            analysisResultDiv.style.display = 'block';
        } else {
            analysisResultDiv.style.display = 'none';
        }
    });
});