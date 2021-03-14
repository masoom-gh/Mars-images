using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarsPhotoApp.Models
{
    public class Rover
    {
        public int RoverId { get; set; }
        public string RoverName { get; set; }
        public string Description { get; set; }
        public DateTime LaunchDate { get; set; }
        public DateTime LandingDate { get; set; }
        public string Status { get; set; }
        public int MaxSol { get; set; }
        public DateTime MaxDate { get; set; }
        public int TotalPhotos { get; set; }
        public string Camera { get; set; }
        public string Url { get; set; }
    }
}
