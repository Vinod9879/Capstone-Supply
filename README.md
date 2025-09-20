# Contact Management Application

A full-stack contact management application built with React frontend and ASP.NET Core Web API backend.

## Features

### User Features
- **User Registration**: Register with full name, email, phone, address details
- **User Login**: Secure authentication with JWT tokens
- **User Dashboard**: View personal profile information
- **Profile Management**: Update personal details

### Admin Features
- **Admin Login**: Secure admin authentication (admin/admin123)
- **Admin Dashboard**: View all registered users
- **User Management**: Create, Read, Update, Delete users
- **User Details**: View detailed user information

### Security Features
- JWT-based authentication
- Password hashing with BCrypt
- Role-based authorization
- CORS configuration for frontend-backend communication
- Input validation and error handling

## Technology Stack

### Frontend (React)
- React 18 with functional components and hooks
- React Router DOM for navigation
- Bootstrap 5 for responsive UI
- Axios for API calls
- js-cookie for JWT token management

### Backend (ASP.NET Core)
- ASP.NET Core 8.0 Web API
- Entity Framework Core with SQL Server
- JWT Authentication
- Swagger/OpenAPI documentation
- BCrypt for password hashing

## Project Structure

```
ContactManagementApp/
├── react-contacts-app/          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Auth/            # Login/Register components
│   │   │   ├── Dashboard/       # User/Admin dashboards
│   │   │   ├── Layout/          # Navigation components
│   │   │   └── Common/          # Reusable components
│   │   ├── Services/            # API service classes
│   │   └── Routes/              # React Router configuration
│   └── package.json
└── webApitest/                  # ASP.NET Core Backend
    ├── Controllers/             # API controllers
    ├── Data/                    # Entity Framework context
    ├── DTOs/                    # Data transfer objects
    ├── Models/                  # Entity models
    ├── Services/                # Business logic services
    └── Program.cs               # Application configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- .NET 8.0 SDK
- SQL Server LocalDB or SQL Server
- Visual Studio or VS Code

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd webApitest
   ```

2. Restore packages:
   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` if needed:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ContactManagementDB;Trusted_Connection=true;MultipleActiveResultSets=true"
   }
   ```

4. Run the application:
   ```bash
   dotnet run
   ```

   The API will be available at `https://localhost:7000` and Swagger UI at `https://localhost:7000/swagger`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd react-contacts-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The React app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### User Profile
- `PUT /api/users/profile` - Update own profile

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

## Database Schema

### Users Table
- `Id` (Primary Key)
- `FullName` (Required, Max 100 chars)
- `Email` (Required, Unique, Max 100 chars)
- `Phone` (Required, Max 15 chars)
- `City` (Required, Max 50 chars)
- `State` (Required, Max 50 chars)
- `Pincode` (Required, Max 10 chars)
- `PasswordHash` (Required)
- `Role` (Required, Max 20 chars)
- `CreatedAt` (Required)
- `UpdatedAt` (Optional)

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: BCrypt for secure password storage
3. **Role-based Authorization**: Different access levels for users and admins
4. **Input Validation**: Comprehensive validation on both frontend and backend
5. **CORS Configuration**: Secure cross-origin requests
6. **Error Handling**: Proper error responses without sensitive information

## Development Notes

- The application uses SQL Server LocalDB by default
- JWT tokens expire after 24 hours
- Admin user is seeded automatically on first run
- All API responses follow consistent JSON format
- Frontend includes loading states and error handling
- Responsive design works on desktop and mobile devices

## Future Enhancements

- Email verification for user registration
- Password reset functionality
- User profile image upload
- Advanced search and filtering
- Export functionality for user data
- Audit logging for admin actions
- Two-factor authentication
- API rate limiting
