# 📚 GitHub Setup Guide

## 🚀 Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New Repository"** (green button)
3. **Repository Name**: `contact-management-app`
4. **Description**: `Full-stack Contact Management Application with React & ASP.NET Core`
5. **Visibility**: Public or Private (your choice)
6. **Initialize**: Don't initialize with README (we already have one)
7. **Click "Create Repository"**

## 📤 Step 2: Upload Your Code

### Option A: Using GitHub Desktop (Easiest)
1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Clone your repository
3. Copy all project files to the cloned folder
4. Commit and push

### Option B: Using Command Line
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Contact Management App"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/contact-management-app.git

# Push to GitHub
git push -u origin main
```

## 🔧 Step 3: Configure for Different Environments

### For Same Machine (Development)
No changes needed - works out of the box!

### For Different Machines/Networks

1. **Update API Configuration** in `react-contacts-app/src/config/api.js`:
```javascript
const API_CONFIG = {
  development: {
    baseURL: 'https://YOUR_BACKEND_IP:7000/api',  // Change this
    timeout: 10000
  }
};
```

2. **Update CORS** in `webApitest/Program.cs`:
```csharp
policy.WithOrigins(
    "http://localhost:3000", 
    "https://localhost:3000",
    "http://YOUR_FRONTEND_IP:3000",  // Add your frontend IP
    "https://YOUR_FRONTEND_IP:3000"  // Add your frontend IP
)
```

## 🌐 Step 4: Deploy to Different Environments

### Local Development
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/contact-management-app.git
cd contact-management-app

# Run setup script
# Windows:
setup.bat

# Linux/Mac:
chmod +x setup.sh
./setup.sh
```

### Production Deployment

#### Backend (ASP.NET Core)
1. **Deploy to Azure/AWS/Heroku**
2. **Update connection string** for production database
3. **Configure CORS** for your frontend domain

#### Frontend (React)
1. **Build for production**:
   ```bash
   cd react-contacts-app
   npm run build
   ```
2. **Deploy to Netlify/Vercel/GitHub Pages**
3. **Update API URL** in `src/config/api.js`

## 🔐 Step 5: Environment Variables

### Backend (.NET)
Create `appsettings.Production.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_PRODUCTION_CONNECTION_STRING"
  },
  "JwtSettings": {
    "SecretKey": "YOUR_PRODUCTION_SECRET_KEY",
    "Issuer": "ContactManagementAPI",
    "Audience": "ContactManagementClient",
    "ExpiryInHours": 24
  }
}
```

### Frontend (React)
Create `.env.production`:
```
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 📱 Step 6: Testing on Different Machines

1. **Clone the repository** on the new machine
2. **Install prerequisites** (Node.js, .NET 8.0 SDK)
3. **Run setup script** or follow manual setup
4. **Update API URLs** if needed
5. **Test the application**

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Error**: 
   - Update CORS policy in `Program.cs`
   - Add your frontend URL to allowed origins

2. **API Not Found**:
   - Check API URL in `src/config/api.js`
   - Ensure backend is running on correct port

3. **Database Connection**:
   - Update connection string in `appsettings.json`
   - Ensure SQL Server is running

4. **Port Conflicts**:
   - Change ports in `launchSettings.json` (backend)
   - Change port in `package.json` (frontend)

## 📋 Quick Commands

### Backend
```bash
cd webApitest
dotnet restore
dotnet run
```

### Frontend
```bash
cd react-contacts-app
npm install
npm start
```

### Full Setup (One Command)
```bash
# Windows
setup.bat

# Linux/Mac
./setup.sh
```

## 🎯 Default URLs

- **Frontend**: `http://localhost:3000`
- **Backend**: `https://localhost:7000`
- **Swagger**: `https://localhost:7000/swagger`
- **Admin Login**: `admin` / `admin123`

## 📝 Notes

- The application automatically creates the database
- Admin user is seeded on first run
- JWT tokens expire after 24 hours
- All API endpoints are documented in Swagger
- The app is responsive and mobile-friendly
