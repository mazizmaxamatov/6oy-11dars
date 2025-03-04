import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, message } from 'antd';

const Register = () => {
    let [fullname, setfullname] = useState("");
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!fullname.trim() || !email.trim() || !password.trim()) {
            message.error("Barcha maydonlarni to‘ldiring!");
            return;
        }

        try {
            let response = await axios.post(
                `https://api.ashyo.fullstackdev.uz/auth/register`,
                { fullname, email, password }
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            message.success("Muvaffaqiyatli ro‘yxatdan o‘tdingiz!");
            navigate("/profile");  
        } catch (error) {
            message.error(error.response?.data?.message || "Xatolik yuz berdi!");
        }
    }

    return (
        <Card title="📝 Ro‘yxatdan o‘tish" style={{ width: 400, margin: "50px auto" }}>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Full Name" style={{ marginBottom: 10 }} onChange={(e) => setfullname(e.target.value)} />
                <Input placeholder="Email" type="email" style={{ marginBottom: 10 }} onChange={(e) => setemail(e.target.value)} />
                <Input.Password placeholder="Password" style={{ marginBottom: 10 }} onChange={(e) => setpassword(e.target.value)} />
                <Button type="primary" htmlType="submit" block>Ro‘yxatdan o‘tish</Button>
            </form>
        </Card>
    );
};

export default Register;
