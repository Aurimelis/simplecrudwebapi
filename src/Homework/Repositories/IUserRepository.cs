using System.Collections.Generic;
using Homework.Models;

namespace Homework.Repositories
{
    public interface IUserRepository
    {
        User Add(User user);
        IEnumerable<User> GetAll();
        User Find(int id);
        bool Remove(int id);
        User Update(int id, User user);
    }
}
