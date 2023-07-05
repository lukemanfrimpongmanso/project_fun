using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;








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
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return (ActionResult<Activity>) await Mediator.Send(new Details.Query { Id = id });
        } 

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity( Guid id, Activity activity)
        {
                activity.Id = id;
                await Mediator.Send(new Edit.Command { Activity = activity });
                return Ok();
        }
        }
}

// ActivitiesController.cs
// using Application.Activities;
// using Domain;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace API.Controllers
// {
//     public class ActivitiesController : BaseApiController
//     {
//         [HttpGet]
//         public async Task<ActionResult<List<Activity>>> GetActivities()
//         {
//             return await Mediator.Send(new List.Query());
//         }

//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetActivity(Guid id)
//         {
//             return await Mediator.Send(new Details.Query { Id = id });
//         }

//         [HttpPost]
//         public async Task<IActionResult> CreateActivity(Activity activity)
//         {
//             await Mediator.Send(new Create.Command { Activity = activity });
//             return CreatedAtAction(nameof(GetActivity), new { id = activity.Id }, activity);
//         }

//         [HttpPut("{id}")]
//         public async Task<ActionResult> EditActivity(Guid Id, Activity activity)
//         {
//             activity.Id = Id;
//             await Mediator.Send(new Edit.Command { Activity = activity });
//             return Ok(activity);;
//         }
//     }
// }
