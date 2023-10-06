import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useSnackbar } from "notistack";

const DefaultLayout = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [connection, setConnection] = useState<HubConnection>();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const evaluationsConnect = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_NOTIFICATION_URL}/hubs/evaluations`)
            .withAutomaticReconnect()
            .build();

        setConnection(evaluationsConnect);

        const vehiclesConnect = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_NOTIFICATION_URL}/hubs/vehicles`)
            .withAutomaticReconnect()
            .build();

        setConnection(vehiclesConnect);
    }, []);

    useEffect(() => {
        if (connection?.state == HubConnectionState.Disconnected) {
            connection.start()
                .then(_ => {
                    connection.on('EvaluationCreated', (message: string) => {
                        enqueueSnackbar(message, { variant: 'info' })
                    });

                    connection.on('EvaluationUpdated', (message: string) => {
                        enqueueSnackbar(message, { variant: 'info' })
                    });

                    connection.on('VehicleCreated', (message: string) => {
                        enqueueSnackbar(message, { variant: 'info' })
                    });

                    connection.on('VehicleUpdated', (message: string) => {
                        enqueueSnackbar(message, { variant: 'info' })
                    });

                    connection.onclose(() => {
                        setIsLoading(true);
                    });

                    connection.onreconnected(() => {
                        setIsLoading(false);
                    });

                    setIsLoading(false);
                })
                .catch(_ => alert('Não foi possível se conectar ao servidor.'));
        }
    }, [connection]);

    return (
        <>
            <Header />

            <Container component="main" sx={{ mt: 10 }}>
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;