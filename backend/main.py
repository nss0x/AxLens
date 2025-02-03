from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import pyautogui
import os

app = FastAPI()

app.mount("/screenshots", StaticFiles(directory="screenshots"), name="screenshots")

# Ensure a directory exists for screenshots
if not os.path.exists("screenshots"):
    os.makedirs("screenshots")

@app.post("/api/v1/analyze-screen")
def analyze_screen():
    """
    Captures the screen and saves it.
    In the future, this will also handle AI analysis.
    """
    screenshot_filename = "temp_screenshot.png"
    screenshot_path = os.path.join("screenshots", screenshot_filename)
    try:
        screenshot = pyautogui.screenshot()
        screenshot.save(screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
        screenshot_url = f"http://127.0.0.1:8000/screenshots/{screenshot_filename}"
        return {"status": "success", "path": screenshot_url}
    except Exception as e:
        print(f"Error capturing screen: {e}")
        return {"status": "error", "message": str(e)}
