@echo off
echo ========================================
echo Contact Management App Setup Script
echo ========================================
echo.

echo [1/4] Setting up Backend (ASP.NET Core Web API)...
cd webApitest
echo Restoring NuGet packages...
dotnet restore
if %errorlevel% neq 0 (
    echo ERROR: Failed to restore packages
    pause
    exit /b 1
)

echo Building the project...
dotnet build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build project
    pause
    exit /b 1
)

echo Backend setup completed!
echo.

echo [2/4] Setting up Frontend (React)...
cd ..\react-contacts-app
echo Installing npm packages...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install npm packages
    pause
    exit /b 1
)

echo Frontend setup completed!
echo.

echo [3/4] Starting Backend Server...
cd ..\webApitest
start "Backend Server" cmd /k "dotnet run"
echo Backend server starting in new window...
echo.

echo [4/4] Starting Frontend Server...
cd ..\react-contacts-app
start "Frontend Server" cmd /k "npm start"
echo Frontend server starting in new window...
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend: https://localhost:7000
echo Frontend: http://localhost:3000
echo Swagger: https://localhost:7000/swagger
echo.
echo Default Admin Credentials:
echo Username: admin
echo Password: admin123
echo.
echo Press any key to exit...
pause > nul
