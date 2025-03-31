import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState(null);
    const [alertedValues, setAlertedValues] = useState(new Set()); // Stores unique alerted values

    const THRESHOLD = 100; 

    useEffect(() => {
        const interval = setInterval(fetchSensorData, 5000); // Fetch every 5 sec
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const fetchSensorData = async () => {
        try {
            const response = await axios.get("https://enose-backend.onrender.com/api/sensor-data");
            const newData = response.data.data;
            setSensorData(newData);
            setError(null);

            if (newData.length > 0) {
                const latestData = newData[0];

                // Alert only if value crosses threshold and hasn't been alerted before
                if (latestData.sensorValue > THRESHOLD && !alertedValues.has(latestData.sensorValue)) {
                    alert(`⚠️ High Gas Alert! Gas value reached ${latestData.sensorValue}`);
                    
                    // Update alerted values to prevent repeated alerts
                    setAlertedValues(prevSet => new Set(prevSet).add(latestData.sensorValue));
                }
            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
            setError("Failed to fetch sensor data. Please try again.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <div className="dashboard-header">
                    <h2>Sensor Data</h2>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="sensor-data">
                    {sensorData.length > 0 ? (
                        sensorData.map((data, index) => (
                            <div className={`data-card ${data.sensorValue > THRESHOLD ? 'high-value' : ''}`} key={index}>
                                <h3>Gas Value: {data.sensorValue}</h3>
                                <p className="timestamp">🕒 {new Date(data.timestamp).toLocaleTimeString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-data">No sensor data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
