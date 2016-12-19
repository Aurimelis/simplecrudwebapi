using System.Collections.Generic;
using Homework.Models;

namespace Homework.Helpers
{
    public class DistinctUserComparer : IEqualityComparer<User>
    {
        public bool Equals(User x, User y)
        {
            return x.FirstName == y.FirstName &&
                x.LastName == y.LastName &&
                x.Address == y.Address;
        }

        public int GetHashCode(User obj)
        {
            int hash = 17;
            hash = hash * 23 + obj.FirstName.GetHashCode();
            hash = hash * 23 + obj.LastName.GetHashCode();
            hash = hash * 23 + obj.Address.GetHashCode();

            return hash;
        }
    }
}
