namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string  City { get; set; }

        public string Venue { get; set; }

        public static explicit operator global::Microsoft.AspNetCore.Mvc.ActionResult<global::System.Object>(Activity v)
        {
            throw new global::System.NotImplementedException();
        }
    }
}