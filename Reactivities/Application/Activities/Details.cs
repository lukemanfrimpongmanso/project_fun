using Domain;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken) => await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);
        }
    }
}