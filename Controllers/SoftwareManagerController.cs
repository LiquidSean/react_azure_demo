using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using react_software_manager.Models;

namespace react_software_manager.Controllers
{
    public class SoftwareManagerController: ControllerBase
    {
        private static readonly IEnumerable<Software> _software;

        static SoftwareManagerController() 
        {
            _software = new List<Software>
            {
                new Software
                {
                    Name = "MS Word",
                    Version = "13.2.1."
                },
                new Software
                {
                    Name = "Angular1",
                    Version = "1.0.9"
                },
                new Software
                {
                    Name = "Angular2",
                    Version = "2"
                },
                new Software
                {
                    Name = "Doom",
                    Version = "0.0.5"
                },
                new Software
                {
                    Name = "Clippy",
                    Version = "2.1"
                },
                new Software
                {
                    Name = "Visual Studio",
                    Version = "2017.0.1"
                },
                new Software
                {
                    Name = "Sublime3",
                    Version = "3.9"
                },
                new Software
                {
                    Name = "Call of Duty",
                    Version = "9.9.9"
                }
            };
        }

        [HttpGet]
        [Route("api/SoftwareManager/GetAllSoftware")] 
		public ActionResult<List<Software>> GetAllSoftware()
		{
			return _software.ToList();
		}
    }
}