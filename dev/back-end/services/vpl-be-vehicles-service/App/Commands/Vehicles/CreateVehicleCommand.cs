using AutoMapper;

using MassTransit;

using MediatR;

using VehiclesService.App.Commands.Vehicles;
using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.Models;
using VehiclesService.Domain.ViewModels.Vehicles;

using VplNotifications.Messages.Vehicles;

namespace VehiclesService.App.Commands.Vehicles
{
    public class CreateVehicleCommand : IRequest<VehicleVm>
    {
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public string Name { get; set; }
        public int ProductionYear { get; set; }
        public int ModelYear { get; set; }
        public VehicleType Type { get; set; }

        public class CreateVehicleCommandHandler : IRequestHandler<CreateVehicleCommand, VehicleVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IBus _bus;

            public CreateVehicleCommandHandler(IUnitOfWork uow, IMapper mapper, IBus bus)
            {
                _uow = uow;
                _mapper = mapper;
                _bus = bus;
            }

            public async Task<VehicleVm> Handle(CreateVehicleCommand request, CancellationToken cancellationToken)
            {
                var vehicle = new Vehicle(request.BrandId,
                                          request.ModelId,
                                          request.Name,
                                          request.ProductionYear,
                                          request.ModelYear,
                                          request.Type);

                if (!vehicle.Validate())
                    throw new Exception("Veiculo inválida.");

                await _uow.Vehicles.AddAsync(vehicle);

                await _uow.Commit();

                await _bus.Publish(new VehicleCreatedMessage
                {
                    Message = $"Foi cadastrado um novo {vehicle.Name}"
                }, cancellationToken);
                
                return _mapper.Map<VehicleVm>(vehicle);
            }
        }
    }
}
