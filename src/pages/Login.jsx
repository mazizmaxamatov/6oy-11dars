import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, message } from 'antd';

const Login = () => {
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            message.error("Barcha maydonlarni to‘ldiring!");
            return;
        }

        try {
            let response = await axios.post(
                `https://api.ashyo.fullstackdev.uz/auth/login`,
                { email, password }
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            message.success("Tizimga muvaffaqiyatli kirdingiz!");
            navigate("/profile"); 
        } catch (error) {
            message.error(error.response?.data?.message || "Login yoki parol noto‘g‘ri!");
        }
    }

    return (
        <Card title="🔑 Kirish" style={{ width: 400, margin: "50px auto" }}>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Email" type="email" style={{ marginBottom: 10 }} onChange={(e) => setemail(e.target.value)} />
                <Input.Password placeholder="Password" style={{ marginBottom: 10 }} onChange={(e) => setpassword(e.target.value)} />
                <Button type="primary" htmlType="submit" block>Kirish</Button>
            </form>
        </Card>
    );
};

export default Login;
