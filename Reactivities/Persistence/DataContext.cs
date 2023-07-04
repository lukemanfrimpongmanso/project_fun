using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<Activity> Activities{ get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Implement the logic to save changes asynchronously
        // For example:
        // return base.SaveChangesAsync(cancellationToken);
        // Or:
        // return base.SaveChangesAsync(true, cancellationToken);
        return base.SaveChangesAsync(cancellationToken);
    }
    }
}