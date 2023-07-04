using Domain;
using Microsoft.AspNetCore.Mvc;
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
        await Mediator.Send(new Create.Command { Activity = activity });
        return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);
    }


    }
}