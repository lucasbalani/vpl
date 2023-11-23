 

import { Container } from "@mui/material";
import Header from "../../components/header";
import { ReactNode, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { SnackbarProvider, useSnackbar } from "notistack";
import CustomTheme from "../../themes/custom-theme";
import { RecoilRoot } from "recoil";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [connection, setConnection] = useState<HubConnection>();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_NOTIFICATION_URL}/hubs/evaluations`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
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
        <RecoilRoot>
            <SnackbarProvider>
                <CustomTheme>
                    <Header />

                    <Container component="main" sx={{ mt: 10 }}>
                        {children}
                    </Container>
                </CustomTheme>
            </SnackbarProvider>
        </RecoilRoot>
    );
}

export default DefaultLayout;