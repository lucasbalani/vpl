import { Line } from "react-chartjs-2";
import ChartComponent from "..";

import { useEffect, useState } from "react";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import useListVehicles from "../../../hooks/vehicle/use-list-vehicles";

function VeicleTestePage() {
  const [vehiclesResult, setVehiclesResult] = useState<ApiResult>(ApiResult.start());

  const listVehicles = useListVehicles();

  const fetchData = async () => {
    setVehiclesResult(await listVehicles());
  };

  useEffect(() => {
    if (vehiclesResult.status === ApiResultStatus.loading)
      fetchData();
  });

  return (
    <>

      {vehiclesResult.status === ApiResultStatus.loading && <p>Carregando...</p>}

      {vehiclesResult.status === ApiResultStatus.error && <p>Erro: {vehiclesResult.errorMessage}</p>}

      {vehiclesResult.status === ApiResultStatus.success && vehiclesResult.data.length > 0 &&
        <>
          <h2 style={{ textAlign: "center" }}>Detalhe de Veiculo teste</h2>
          <ChartComponent {...vehiclesResult.data[0]}></ChartComponent>
        </>
      }



      {vehiclesResult.status === ApiResultStatus.success && vehiclesResult.data.length === 0 &&
        <p>:( Nenhum Registro Encontrado</p>
      }
    </>
  );
}
export default VeicleTestePage;