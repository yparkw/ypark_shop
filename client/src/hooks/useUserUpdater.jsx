import Cookies from "js-cookie";
import { useState } from 'react';
import axios from 'axios';

const useUserUpdater = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const updateUser = async (userId, userData) => {
        setIsLoading(true);
        setError(null);

        const token = Cookies.get("access");
        try {
            const response = await axios.patch(`/api/user/update/`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { updateUser, isLoading, error, data };
};

export default useUserUpdater;