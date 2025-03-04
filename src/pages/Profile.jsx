import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';

const Profile = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    if (!user) {
        return <p>Foydalanuvchi ma'lumotlari topilmadi.</p>;
    }

    return (
        <Card title="👤 Profil" style={{ width: 400, margin: "50px auto" }}>
            <h3>📝 Ism: {user.fullname}</h3>
            <h3>📧 Email: {user.email}</h3>
            <Button type="primary" danger onClick={logout} block>Log out</Button>
        </Card>
    );
};

export default Profile;
