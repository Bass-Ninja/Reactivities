using Microsoft.AspNetCore.Mvc;
using Domain;

using Application.Activities;
using Application;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // constructor
   
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            activity.Date = DateTime.Now;
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Update.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}


