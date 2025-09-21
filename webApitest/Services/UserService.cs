using Microsoft.EntityFrameworkCore;
using webApitest.Data;
using webApitest.DTOs;
using webApitest.Models;

namespace webApitest.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserResponseDto> RegisterUserAsync(UserRegisterDto userRegisterDto)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == userRegisterDto.Email))
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            var user = new User
            {
                FullName = userRegisterDto.FullName,
                Email = userRegisterDto.Email,
                Phone = userRegisterDto.Phone,
                City = userRegisterDto.City,
                State = userRegisterDto.State,
                Pincode = userRegisterDto.Pincode,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Password),
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return MapToUserResponseDto(user);
        }

        public async Task<User?> ValidateUserAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            return user;
        }

        public async Task<User?> ValidateAdminAsync(string username, string password)
        {
            // For admin login, we'll check against the hardcoded admin user
            // In a real application, you might have a separate admin table
            var adminUser = await _context.Users.FirstOrDefaultAsync(u => u.Role == "Admin");
            
            if (adminUser == null)
            {
                return null;
            }

            // For simplicity, we'll use the admin user's email as username
            // In a real app, you'd have a separate username field
            if (adminUser.Email == "admin@contactmanager.com" && username == "admin" && 
                BCrypt.Net.BCrypt.Verify(password, adminUser.PasswordHash))
            {
                return adminUser;
            }

            return null;
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(MapToUserResponseDto);
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user != null ? MapToUserResponseDto(user) : null;
        }

        public async Task<UserResponseDto?> UpdateUserAsync(int id, UserRegisterDto userUpdateDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            // Check if email is being changed and if new email already exists
            if (user.Email != userUpdateDto.Email && 
                await _context.Users.AnyAsync(u => u.Email == userUpdateDto.Email))
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            user.FullName = userUpdateDto.FullName;
            user.Email = userUpdateDto.Email;
            user.Phone = userUpdateDto.Phone;
            user.City = userUpdateDto.City;
            user.State = userUpdateDto.State;
            user.Pincode = userUpdateDto.Pincode;
            user.UpdatedAt = DateTime.UtcNow;

            // Only update password if provided
            if (!string.IsNullOrEmpty(userUpdateDto.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userUpdateDto.Password);
            }

            await _context.SaveChangesAsync();
            return MapToUserResponseDto(user);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public UserResponseDto MapToUserResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                City = user.City,
                State = user.State,
                Pincode = user.Pincode,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
}
