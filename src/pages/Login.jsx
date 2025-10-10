// pages/Login.jsx
import React from 'react';
import { Card, Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'; // Optional styling

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card 
        style={{
          width: 400,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ 
            color: '#1890ff',
            background: 'linear-gradient(135deg, #1890ff, #722ed1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700 
          }}>
            Welcome Back
          </h2>
          <p>Sign in to your account</p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="" style={{ float: 'right' }}>
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              size="large"
              block
              style={{
                background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or</Divider>
        
        <div style={{ textAlign: 'center' }}>
          <p>Don't have an account? <a href="">Register now!</a></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;