using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
      

      

        [HttpGet] // api/activities

        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id) => await Mediator.Send(new Details.Query { Id = id });

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command { Activity = activity });
            return Ok((object)result);
        }

    }
}