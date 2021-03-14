using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MarsPhotoApp.Models;

namespace MarsPhotoApp.Profiles
{
    public class RoverProfile : Profile
    {
        public RoverProfile()
        {
            this.CreateMap<Rover, RoverDto>();
        }
    }
}
