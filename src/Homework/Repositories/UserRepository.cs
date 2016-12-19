using System.Collections.Generic;
using Homework.Context;
using Homework.Models;
using System.Linq;

namespace Homework.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User Add(User user)
        {
            var u = new User()
            {
                Address = user.Address,
                City = user.City,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PostalCode = user.PostalCode
            };

            _context.Users.Add(u);
            _context.SaveChanges();

            return u;
        }

        public User Find(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public bool Remove(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);

            if (user == null)
                return false;

            _context.Remove(user);
            _context.SaveChanges();

            return true;
        }

        public User Update(int id, User user)
        {
            var u = _context.Users.FirstOrDefault(x => x.Id == id);

            if (u == null)
                return null;

            u.Address = user.Address;
            u.City = user.City;
            u.FirstName = user.FirstName;
            u.LastName = user.LastName;
            u.PostalCode = user.PostalCode;

            _context.SaveChanges();

            return u;
        }
    }
}
