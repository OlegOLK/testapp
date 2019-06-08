using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlockstackCommunicator.Controllers
{

    public class InvitationModel
    {
        public string InvitationId;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class RecieverController : ControllerBase
    {
        public static List<string> InvitationList = new List<string>();

        [HttpPost]
        [Route("add")]
        public IActionResult StoreInvitation([FromBody] InvitationModel invitation)
        {
            if (InvitationList.Contains(invitation.InvitationId))
            {
                return NotFound("inv id already exist");
            }

            InvitationList.Add(invitation.InvitationId);
            return Ok("ok");
        }

        [HttpGet]
        public IEnumerable<string> GetInvitations()
        {
            return InvitationList;
        }

        [HttpPost]
        [Route("remove")]
        public IActionResult RemoveAcceptedInvitations([FromBody] InvitationModel[] invitations)
        {
            foreach (InvitationModel invitation in invitations)
            {
                InvitationList.Remove(invitation.InvitationId);
            }

            return Ok();
        }
    }
}