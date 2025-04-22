import { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/product`,
                );
                console.log('Respuesta del backend:', response.data);
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error al conectar con el backend', error);
                setMessage('Error al conectar con el backend');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Test de conexión API</h2>
            <p className="text-gray-800">{message}</p>
        </div>
    );
};

export default ApiTest;
