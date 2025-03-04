// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../../admin/redux/authSlice';

// function Login() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleUsernameChange = (e) => setName(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);
//   const handleRoleChange = (e) => setRole(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !password || !role) {
//       alert('Please enter your username, password, and select a role');
//       return;
//     }

//     axios
//       .post('/assetinventorymanagement/login', { name, password, role }, { withCredentials: true })
//       .then((response) => {
//         console.log(response.data); // e.g., {"message": "Logged in successfully", "user": {"name": "admin", "role": "Admin"}}
//         const { user } = response.data; // Extract user object
//         const backendRole = user.role; // "Admin"

//         // Store credentials in Redux
//         dispatch(setCredentials({ user: { name: user.name }, role: backendRole }));

//         // Redirect based on backend-verified role
//         if (backendRole === 'Admin') {
//           navigate('/admin/dashboard');
//         } else if (backendRole === 'Manager') {
//           navigate('/manager/dashboard');
//         } else if (backendRole === 'Employee') {
//           navigate('/employee/dashboard');
//         } else {
//           navigate('/');
//         }
//       })
//       .catch((error) => {
//         console.error(error.response?.data);
//         alert(error.response?.data?.message || 'Login failed!');
//       });
//   };
//   return (
//     <div className="login">
//       <p>
//         Hello User <br />
//         Please log in first to gain access.
//       </p>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} className="loginForm">
//         <div className="formGroup">
//           <label htmlFor="username" className="label">
//             Name:
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={name}
//             onChange={handleUsernameChange}
//             className="loginInput"
//             required
//           />
//         </div>

//         <div className="formGroup">
//           <label htmlFor="password" className="label">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//             className="loginInput"
//             required
//           />
//         </div>

//         <div className="formGroup">
//           <label htmlFor="role" className="label">
//             Select Role:
//           </label>
//           <select
//             className="form-select"
//             id="role"
//             value={role}
//             onChange={handleRoleChange}
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="1">Admin</option>
//             <option value="2">Manager</option>
//             <option value="3">Employee</option>
//           </select>
//         </div>

//         <button type="submit" className="loginButton">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({
        name: '',
        password: '',
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
        // Replace with your API endpoint
        const apiUrl = 'https://your-api-endpoint.com/login';

        axios.post(apiUrl, {
            name: form.name,
            password: form.password,
        })
        .then(response => {
            console.log('Login successful:', response.data);
            // Handle successful login
        })
        .catch(error => {
            console.error('Login failed:', error);
            // Handle login error
        });
    };

    return (
        <div className="login-container">
            
            <h2>Login</h2>
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
                    type={form.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="checkbox"
                    checked={form.showPassword}
                    onChange={togglePasswordVisibility}
                /> Show Password
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;