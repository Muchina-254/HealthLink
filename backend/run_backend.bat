@echo off
REM Activate venv and start uvicorn
if exist venv\Scripts\activate (
  call venv\Scripts\activate
) else (
  echo No virtual environment found. Please create one: python -m venv venv
  pause
  exit /b
)
uvicorn app:app --reload --host 127.0.0.1 --port 8000
pause
