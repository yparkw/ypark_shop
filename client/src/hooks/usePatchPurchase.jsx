import Cookies from "js-cookie";
import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

export const usePatchPurchase = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStatusChange = async ( purchaseId, newStatus ) => {
        const token = Cookies.get("access");
        setIsLoading(true);
        try {
            const res = await axiosInstance.post(`/api/purchase/${purchaseId}/`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsLoading(false);
            return res.data;
        } catch (error) {
            setError(error);
            setIsLoading(false);
            throw error;
        }
    };

    return { handleStatusChange, isLoading, error};
}