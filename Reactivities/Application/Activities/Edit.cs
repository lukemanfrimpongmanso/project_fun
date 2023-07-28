using Domain;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Unit>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, IMapper mapper, ILogger<Handler> logger)
            {
                _mapper = mapper;
                _context = context;
                _logger = logger;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Activity == null)
                {
                    throw new Exception("Activity not passed in the request");
                }

                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null)
                {
                    throw new Exception("Activity not found in the database");
                }

                _logger.LogInformation($"Before mapping: {JsonConvert.SerializeObject(activity)}");
                activity.Title = request.Activity.Title;
                _mapper.Map(request.Activity, activity);
                _context.Activities.Update(activity);

                // Log the state of the activity after mapping
                _logger.LogInformation($"After mapping: {JsonConvert.SerializeObject(activity)}");

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
