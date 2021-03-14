using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MarsPhotoApp.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> ops): base(ops)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Rover> Rovers { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Rovers
            modelBuilder.Entity<Rover>().HasData(
                new Rover
                {
                    RoverId = 1,
                    RoverName = "Curiosity",
                    Status = "active",
                    Description = "Nulla eget sagittis ipsum. Fusce a lectus venenatis, mollis mauris sit amet, venenatis ex. Pellentesque in bibendum nulla. Etiam id augue ut magna scelerisque ornare. Donec et lacus et ex porttitor mollis. Morbi vitae nunc eget risus scelerisque tincidunt id id elit. Etiam id ante venenatis, posuere sem in, suscipit nunc. Integer interdum felis non sapien iaculis interdum. Suspendisse nunc urna, luctus et mi tempus, elementum feugiat nisi. Donec dignissim dolor vitae eros feugiat, in pulvinar augue vulputate. Nam ex nisl, lobortis nec nibh in, semper porttitor ex. Nullam hendrerit lacus id lectus varius lobortis. Sed faucibus dolor non nulla tempus hendrerit. Vivamus blandit iaculis accumsan.",
                    LaunchDate = new DateTime(2011, 11, 26),
                    LandingDate = new DateTime(2012, 08, 06),
                    MaxDate = new DateTime(2021, 01, 13),
                    TotalPhotos = 464045,
                    MaxSol = 3000,
                    Camera = "MAST",
                    Url = "https://mars.nasa.gov/msl/home/"
                });

            modelBuilder.Entity<Rover>().HasData(
                new Rover
                {
                    RoverId = 2,
                    RoverName = "Spirit",
                    Status = "complete",
                    Description = "Proin fringilla ante risus, a pellentesque ipsum elementum non. Nam commodo imperdiet massa eget dictum. Pellentesque nec velit sed eros vulputate ultrices. Quisque et lorem in magna bibendum egestas ac vitae tortor. Quisque ut gravida leo. Pellentesque quis justo vitae sapien consequat rhoncus eget at justo. Etiam faucibus malesuada purus, ac iaculis erat ultrices eget.",
                    LaunchDate = new DateTime(2003,06,10),
                    LandingDate = new DateTime(2004,01,04),
                    MaxDate = new DateTime(2010,03,21),
                    TotalPhotos = 124550,
                    MaxSol = 2208,
                    Camera = "PANCAM",
                    Url = "https://www.jpl.nasa.gov/missions/mars-exploration-rover-spirit-mer-spirit/"
                });

            modelBuilder.Entity<Rover>().HasData(
                new Rover
                {
                    RoverId = 3,
                    RoverName = "Opportunity",
                    Status = "complete",
                    Description = "Proin fringilla ante risus, a pellentesque ipsum elementum non. Nam commodo imperdiet massa eget dictum. Pellentesque nec velit sed eros vulputate ultrices. Quisque et lorem in magna bibendum egestas ac vitae tortor. Quisque ut gravida leo. Pellentesque quis justo vitae sapien consequat rhoncus eget at justo. Etiam faucibus malesuada purus, ac iaculis erat ultrices eget.",
                    LaunchDate = new DateTime(2003,07,07),
                    LandingDate = new DateTime(2004,01,25),
                    MaxDate = new DateTime(2018,06,11),
                    TotalPhotos = 198439,
                    MaxSol = 5111,
                    Camera = "PANCAM",
                    Url = "https://mars.nasa.gov/mer/index.cfm"
                });
        }
    }
}
