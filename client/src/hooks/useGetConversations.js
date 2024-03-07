import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try { 
                const res = await fetch("/api/users");
                const data = await res.json();
                if (res.status === 401) {
                    toast.error(data.message, {
                        duration: 4000,
                        position: 'top-center',
                        style: { 
                            backgroundColor: '#FAFAFA',
                            color: 'black', 
                            fontWeight: '600'
                        },
                        icon: false
                    });
                }
                if (data.error) {
                    throw new Error(data.error);
                } 

                setConversations(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, []);

    return { loading, conversations }
}

export default useGetConversations