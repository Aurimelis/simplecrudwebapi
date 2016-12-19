using System.Collections.Generic;
using Homework.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Homework.Helpers;
using Homework.Repositories;

namespace Homework.Controllers.api
{
    [Route("api/[controller]")]
    public class RandomUsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public RandomUsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // POST api/values
        [HttpPost]
        public IEnumerable<dynamic> Post([FromBody]IEnumerable<User> users)
        {
            users =  users.Distinct(new DistinctUserComparer()).ToList();

            var g =
                users.GroupBy(item => item.City)
                    .Select(group => new {City = group.Key, Users = group.Select(item => new {item.FirstName, item.LastName, item.Address, item.PostalCode})});

            return g;
        }
    }
}
