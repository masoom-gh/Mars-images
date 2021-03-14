using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarsPhotoApp.Models
{
    public interface IRoverRepository
    {
        Task<IEnumerable<Rover>> ListRoversAsync();

        Task<Rover> ListRoverByIdAsync(int roverId);
    }
}
