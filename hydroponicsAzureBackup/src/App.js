import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { Container, Typography } from '@mui/material';
import GreenProgressBar from './components/GreenProgressBar';
import AzureBlobConnection from './components/AzureBlobConnection';

function App() {
    const sasUrl = 'https://plcdatastorage.blob.core.windows.net/plcsensordata?sp=r&st=2023-04-05T04:46:42Z&se=2023-05-10T12:46:42Z&sv=2021-12-02&sr=c&sig=Tm48WqlNMpFlr6s43KQk3nzJqs2XyLTWExBr9aQ1reA%3D';
    const startDate = '2023-04-05';

    return (
        <div className="App">
            <Dashboard />
            <AzureBlobConnection sasUrl={sasUrl} />
            <Container>
                <Typography variant="h5" align="center" gutterBottom>
                    Harvest progress
                </Typography>
                <GreenProgressBar startDate={startDate} />
            </Container>
        </div>
    );
}

export default App;
