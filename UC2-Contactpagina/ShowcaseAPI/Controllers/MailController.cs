using Microsoft.AspNetCore.Mvc;
using ShowcaseAPI.Models;
using System.Net;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShowcaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        // POST api/<MailController>
        [HttpPost]
        public ActionResult Post([Bind("FirstName, LastName, Email, Phone, Subject, Message")] Contactform form)
        {
            //Op brightspace staan instructies over hoe je de mailfunctionaliteit werkend kunt maken:
            //Project Web Development > De showcase > Week 2: contactpagina (UC2) > Hoe verstuur je een mail vanuit je webapplicatie met Mailtrap?
            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("8e48713481327b", "9db48cced83960"),
                EnableSsl = true
            };
            client.Send("Sender@mail.com", "Lisa@Windesheim.com", $"{form.Subject}", $"{form.FirstName}" + " " + $"{form.LastName}" + $"\n{form.Email}" + $"\n{form.Phone}" + "\n" + "\nBericht:" + $"\n{form.Message}");

            System.Console.WriteLine("Sent");

            return Ok();
        }
    }
}
