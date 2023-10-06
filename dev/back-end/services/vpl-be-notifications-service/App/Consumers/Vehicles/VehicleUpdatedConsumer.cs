using System;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationsService.Hubs;
using VplNotifications.Messages.Vehicles;

namespace NotificationsService.App.Consumers.Vehicles
{
    public class VehicleUpdatedConsumer : IConsumer<VehicleUpdatedMessage>
	{
        private readonly IHubContext<VehicleHub> _hubContext;

        public VehicleUpdatedConsumer(IHubContext<VehicleHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<VehicleUpdatedMessage> context)
        {
            await _hubContext.Clients.All.SendAsync("VehicleUpdated", context.Message.Message);
        }
    }
}

