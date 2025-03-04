import React, { useState } from 'react';
import './Signup.css';

const SignupPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setForm({
            ...form,
            showPassword: !form.showPassword,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log('Form submitted:', form);
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select your role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>
                <input
                    type={form.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type={form.showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <input
                    type="checkbox"
                    checked={form.showPassword}
                    onChange={togglePasswordVisibility}
                /> Show Password
                <button type="submit">Sign Up</button>
                <div className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;