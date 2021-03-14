using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarsPhotoApp.Models
{
    public class Camera
    {
        public int CameraId { get; set; }
        public string ShortName { get; set; }
        public int RoverId { get; set; }
        public string FullName { get; set; }
    }
}
