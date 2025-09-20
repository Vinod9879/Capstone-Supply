#!/bin/bash

echo "========================================"
echo "Contact Management App Setup Script"
echo "========================================"
echo

echo "[1/4] Setting up Backend (ASP.NET Core Web API)..."
cd webApitest
echo "Restoring NuGet packages..."
dotnet restore
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to restore packages"
    exit 1
fi

echo "Building the project..."
dotnet build
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build project"
    exit 1
fi

echo "Backend setup completed!"
echo

echo "[2/4] Setting up Frontend (React)..."
cd ../react-contacts-app
echo "Installing npm packages..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install npm packages"
    exit 1
fi

echo "Frontend setup completed!"
echo

echo "[3/4] Starting Backend Server..."
cd ../webApitest
gnome-terminal -- bash -c "dotnet run; exec bash" 2>/dev/null || xterm -e "dotnet run" 2>/dev/null || echo "Please start backend manually: cd webApitest && dotnet run"
echo "Backend server starting..."
echo

echo "[4/4] Starting Frontend Server..."
cd ../react-contacts-app
gnome-terminal -- bash -c "npm start; exec bash" 2>/dev/null || xterm -e "npm start" 2>/dev/null || echo "Please start frontend manually: cd react-contacts-app && npm start"
echo "Frontend server starting..."
echo

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo
echo "Backend: https://localhost:7000"
echo "Frontend: http://localhost:3000"
echo "Swagger: https://localhost:7000/swagger"
echo
echo "Default Admin Credentials:"
echo "Username: admin"
echo "Password: admin123"
echo
