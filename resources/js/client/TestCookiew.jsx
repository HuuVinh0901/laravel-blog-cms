import { useEffect } from 'react';
import axios from 'axios';

const TestCookie = () => {
    useEffect(() => {
        axios.get('http://localhost:8000/api/test-cookie', {
            withCredentials: true,
        })
            .then((res) => {
                console.log('COOKIE gửi lên:', res.data);
            })
            .catch((err) => {
                console.error('Lỗi:', err);
            });
    }, []);

    return <div>Kiểm tra cookie...</div>;
};

export default TestCookie;
