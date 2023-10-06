using System;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationsService.Hubs;
using VplNotifications.Messages.Vehicles;

namespace NotificationsService.App.Consumers.Vehicles
{
    public class VehicleCreatedConsumer : IConsumer<VehicleCreatedMessage>
	{
        private readonly IHubContext<VehicleHub> _hubContext;

        public VehicleCreatedConsumer(IHubContext<VehicleHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<VehicleCreatedMessage> context)
        {
            await _hubContext.Clients.All.SendAsync("VehicleCreated", context.Message.Message);
        }
    }
}

