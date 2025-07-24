# AxLens

## Screen Assistant with AI Analysis Capabilities

AxLens is a desktop application built with Electron and a Python FastAPI backend, designed to capture screenshots and, in the future, perform AI-powered analysis on the captured content. It provides a simple interface to trigger screen captures and a global keyboard shortcut for convenience.

## Features

*   **Screen Capture:** Easily capture screenshots of your entire screen.
*   **Local Storage:** Captured screenshots are saved locally in a dedicated `screenshots` directory.
*   **User Interface:** A minimalist Electron-based interface to initiate screen captures.
*   **Global Shortcut:** Trigger screen captures instantly using the `Control+Space+M` keyboard shortcut.
*   **Extensible Architecture:** Designed to integrate AI analysis capabilities for advanced insights into screen content.

## Technologies Used

### Frontend

*   **Electron:** For building cross-platform desktop applications with web technologies.
*   **HTML, CSS, JavaScript:** Standard web technologies for the user interface.

### Backend

*   **Python:** The core language for the backend logic.
*   **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python.
*   **PyAutoGUI:** Used for programmatic control of the mouse and keyboard, including taking screenshots.
*   **Pillow:** An imaging library for Python, used for saving screenshots.
*   **Uvicorn:** An ASGI server for running FastAPI applications.
*   **Pynput:** (Listed in `requirements.txt`, but not explicitly used in `main.py` for screen capture. Potentially for future input control or global hotkeys within Python.)
*   **OpenAI:** (Listed in `requirements.txt`, indicating future AI integration.)

## Setup and Installation

To get AxLens up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AxLens.git
cd AxLens
```

### 2. Backend Setup

Navigate to the `backend` directory and install the required Python packages:

```bash
cd backend
pip install -r requirements.txt
```

Then, start the FastAPI backend server:

```bash
uvicorn main:app --reload
```

This will typically run the backend on `http://127.0.0.1:8000`.

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, and install the Node.js dependencies:

```bash
cd ../frontend
npm install
```

### 4. Run the Application

Once both the backend and frontend dependencies are installed, you can start the Electron application:

```bash
npm start
```

This will launch the AxLens desktop application.

## Usage

*   **Capture Button:** Click the "Capture Screen" button within the application window to take a screenshot.
*   **Global Shortcut:** Press `Control+Space+M` on your keyboard to instantly capture a screenshot, even when the application window is not in focus.

Captured screenshots will be saved in the `screenshots` directory within your `backend` folder.

## Future Enhancements


*   **User Configuration:** Options for customizing screenshot save locations, shortcut keys, and AI analysis preferences.
*   **Enhanced UI/UX:** Further improvements to the user interface for a more polished and intuitive experience.
