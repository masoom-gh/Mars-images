using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MarsPhotoApp.Models;

namespace MarsPhotoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoversController : ControllerBase
    {
        private readonly IRoverRepository _repository;
        private readonly IMapper _mapper;

        public RoversController(IRoverRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Rovers
        [HttpGet]
        public async Task<IActionResult> GetRovers()
        {

            var rovers = await _repository.ListRoversAsync();
            return Ok(_mapper.Map<IEnumerable<RoverDto>>(rovers));
        }

        // GET: api/Rovers/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRover(int id)
        {
            var rover = await _repository.ListRoverByIdAsync(id);

            if (rover == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<RoverDto>(rover));
        }

        
    }
}
