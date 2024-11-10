using Microsoft.AspNetCore.SignalR;

namespace ChatDistribuido.Infra
{
    public class Chat : Hub 
    {
        // Metodo para escutar as conversar
        public void NewMessage(string userName, string message)
        {
            Clients.All.SendAsync("newMessage", userName, message);
        }

        // Metodo para notificar que usuario entrou na sala
        public void NewUser(string userName)
        {
            Clients.All.SendAsync("newUser", userName);
        }
    }
}
