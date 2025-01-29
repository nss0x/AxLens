from fastapi import FastAPI
import pyautogui
import os

app = FastAPI()

# Ensure a directory exists for screenshots
if not os.path.exists("screenshots"):
    os.makedirs("screenshots")

@app.post("/api/v1/analyze-screen")
def analyze_screen():
    """
    Captures the screen and saves it.
    In the future, this will also handle AI analysis.
    """
    screenshot_path = os.path.join("screenshots", "temp_screenshot.png")
    try:
        screenshot = pyautogui.screenshot()
        screenshot.save(screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
        return {"status": "success", "path": screenshot_path}
    except Exception as e:
        print(f"Error capturing screen: {e}")
        return {"status": "error", "message": str(e)}
