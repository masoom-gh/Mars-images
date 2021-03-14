using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MarsPhotoApp.Models
{
    public class RoverRepository : IRoverRepository
    {
        private readonly AppDbContext _context;

        public RoverRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Rover> ListRoverByIdAsync(int roverId)
        {
            return await _context.Rovers.FirstOrDefaultAsync(r=>r.RoverId==roverId);
        }

        public async Task<IEnumerable<Rover>> ListRoversAsync()
        {
            return await _context.Rovers.ToListAsync();
        }
    }
}
