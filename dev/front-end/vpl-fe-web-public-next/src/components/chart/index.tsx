import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useListEvaluationsByVehicleId from "../../hooks/evaluation/use-list-evaluations-by-vehicle-id";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import { Evaluation } from "../../models/evaluation";
import { PriceReference } from '../../enums/price-reference.enum';
import { Box } from '@mui/material';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

interface ChartComponentProps {
    evaluations: Evaluation[],
    priceReference: PriceReference
}

const ChartComponent = ({ evaluations, priceReference }: ChartComponentProps) => {
    const data = {
        labels: evaluations.map(x => x.year.toString()),
        datasets: [
            {
                label: 'Valores por ano',
                data: evaluations.map(x => x.value),
                backgroundColor: priceReference === PriceReference.Fipe ? 'aqua' : 'lime',
                borderColor: priceReference === PriceReference.Fipe ? 'aqua' : 'lime',
                pointBorderColor: priceReference === PriceReference.Fipe ? 'blue' : 'olive',
                fill: 'start',
                tension: 0.4
            }
        ]
    }

    const options: any = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                // min: 1,
                // max: 20
            }
        }
    }

    return (
        <Box sx={{ width: '600px', height: '300px', padding: '20px' }}>
            <Line data={data} options={options} />
        </Box>
    );
}

export default ChartComponent;