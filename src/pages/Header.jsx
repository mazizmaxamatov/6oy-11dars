import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Header = () => {
    let navigate = useNavigate();
    let isAuthenticated = localStorage.getItem("accessToken");

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 20px', background: '#1890ff', color: 'white'
        }}>
            <h2>🌐 My App</h2>
            <div>
                {!isAuthenticated ? (
                    <>
                        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Registratsiya</Link>
                        <Link to="/login" style={{ color: 'white' }}>Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link>
                        <Button type="primary" danger onClick={logout}>Log out</Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
