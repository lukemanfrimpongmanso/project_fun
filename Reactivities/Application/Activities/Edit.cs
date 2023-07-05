using Domain;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Unit>
        {
            public Activity Activity {get; set;}
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                activity.Title = request.Activity.Title ?? activity.Title;
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}