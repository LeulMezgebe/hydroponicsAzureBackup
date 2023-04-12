import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, Label } from 'recharts';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../api';


const generateMockDataPoint = (prevDataPoint) => {
    const now = new Date();

    return {
        timestamp: now.toISOString(),
        temperature: prevDataPoint ? Math.max(Math.min(prevDataPoint.temperature + Math.random() * 2 - 1, 30), 20) : Math.floor(Math.random() * 10) + 20,
        humidity: prevDataPoint ? Math.max(Math.min(prevDataPoint.humidity + Math.random() * 2 - 1, 70), 40) : Math.floor(Math.random() * 30) + 40,
        pH: prevDataPoint ? parseFloat(Math.max(Math.min(prevDataPoint.pH + Math.random() * 0.2 - 0.1, 7), 5).toFixed(1)) : parseFloat((Math.random() * 2 + 5).toFixed(1)),
        nutrientLevel: prevDataPoint ? Math.max(Math.min(prevDataPoint.nutrientLevel + Math.random() * 2 - 1, 80), 50) : Math.floor(Math.random() * 30) + 50,
    };
};

const generateInitialData = () => {
    let initialData = [];
    for (let i = 0; i < 20; i++) {
        initialData.push(generateMockDataPoint(i > 0 ? initialData[i - 1] : null));
    }
    return initialData;
};



const Dashboard = () => {
    const initialData = generateInitialData();
    const [sensorData, setSensorData] = useState(initialData);

    useEffect(() => {
        const updateDataInterval = setInterval(() => {
            setSensorData((prevData) => {
                const newDataPoint = generateMockDataPoint(prevData[prevData.length - 1]);
                return [...prevData.slice(1), newDataPoint];
            });
        }, 1000); // Update data every 1 second

        return () => {
            clearInterval(updateDataInterval);
        };
    }, []);


    const fetchSensorData = async () => {
        try {
            const response = await api.get('/sensor-readings');
            setSensorData(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchSensorData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Hydroponic Monitoring Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* ... (Temperature Card) */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Humidity</Typography>
                            <ResponsiveContainer width="100%" height={200} style={{ backgroundColor: 'lightgreen' }}>
                                <LineChart data={sensorData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                    <XAxis dataKey="timestamp" stroke="#666">
                                        <Label value="Time" position="insideBottom" offset={-5} />
                                    </XAxis>
                                    <YAxis stroke="#666">
                                        <Label value="%" position="insideLeft" angle={-90} />
                                    </YAxis>
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">pH Level</Typography>
                            <ResponsiveContainer width="100%" height={200} style={{ backgroundColor: 'red' }}>
                                <LineChart data={sensorData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                    <XAxis dataKey="timestamp" stroke="#666">
                                        <Label value="Time" position="insideBottom" offset={-5} />
                                    </XAxis>
                                    <YAxis stroke="#666">
                                        <Label value="pH" position="insideLeft" angle={-90} />
                                    </YAxis>
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pH" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Nutrient Level</Typography>
                            <ResponsiveContainer width="100%" height={200} style={{ backgroundColor: 'lightgreen' }}>
                                <LineChart data={sensorData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                    <XAxis dataKey="timestamp" stroke="#666">
                                        <Label value="Time" position="insideBottom" offset={-5} />
                                    </XAxis>
                                    <YAxis stroke="#666">
                                        <Label value="%" position="insideLeft" angle={-90} />
                                    </YAxis>
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="nutrientLevel" stroke="#FF8042"/>
                                  </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );

};

export default Dashboard;


