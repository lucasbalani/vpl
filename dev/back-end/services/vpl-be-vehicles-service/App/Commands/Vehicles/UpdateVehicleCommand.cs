using AutoMapper;

using MassTransit;

using MediatR;

using VehiclesService.Domain.Contracts;
using VehiclesService.Domain.Enums;
using VehiclesService.Domain.ViewModels.Vehicles;

using VplNotifications.Messages.Vehicles;

namespace VehiclesService.App.Commands.Vehicles
{
    public class UpdateVehicleCommand : IRequest<VehicleVm>
    {
        public long Id { get; set; }
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public string Name { get; set; }
        public int ProductionYear { get; set; }
        public int ModelYear { get; set; }
        public VehicleType Type { get; set; }

        public class UpdateVehicleCommandHandler : IRequestHandler<UpdateVehicleCommand, VehicleVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;
            private readonly IBus _bus;
            public UpdateVehicleCommandHandler(IUnitOfWork uow, IMapper mapper, IBus bus)
            {
                _uow = uow;
                _mapper = mapper;
                _bus = bus;
            }

            public async Task<VehicleVm> Handle(UpdateVehicleCommand request, CancellationToken cancellationToken)
            {
                var vehicle = await _uow.Vehicles.FindAsync(request.Id);

                if (vehicle == null)
                    throw new Exception("Veiculo não encontrada.");

                vehicle.Update(request.BrandId,
                               request.ModelId,
                               request.Name,
                               request.ProductionYear,
                               request.ModelYear,
                               request.Type);

                if (!vehicle.Validate())
                    throw new Exception("Veiculo inválida.");

                _uow.Vehicles.Update(vehicle);

                await _uow.Commit();

                await _bus.Publish(new VehicleCreatedMessage
                {
                    Message = $"Foi atualizado o veículo {vehicle.Name}"
                }, cancellationToken);

                return _mapper.Map<VehicleVm>(vehicle);
            }
        }
    }
}
