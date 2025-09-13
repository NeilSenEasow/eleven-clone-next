@echo off
echo Starting Eleven Clone Development Environment...

echo.
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && python main.py"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:8080
echo.
echo Press any key to exit...
pause > nul
