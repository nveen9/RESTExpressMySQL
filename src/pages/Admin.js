import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Admin() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!loading) {
            async function fetchData() {
                try {
                    const users = await axios.get('http://localhost:3000/user');
                    console.log(users);
                    setData(users.data.user);
                    setLoading(true);
                } catch (error) {
                    console.log(error.response.data);
                    alert(error.response.data.message);
                }
            }
            fetchData();
        }
    }, [loading]);

    const handleAdd = async (event) => {
        await axios.post('http://localhost:3000/signup', {
            email,
            password,
            first_name,
            last_name,
            city,
            state
        }
            , {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                // Handle successful response from backend here
                alert(response.data.message);
                console.log(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                // Handle error here
                console.log(error.response.data);
                alert(error.response.data.message);
            });
    }

    const handleUpdate = (index) => {

    }

    return (
        <div className="justify-center items-center space-y-10">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">All User Details</h1>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
                <input
                    id="grid-email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <input
                    id="grid-password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <input
                    id="grid-first-name"
                    type="text"
                    placeholder="first_name"
                    value={first_name}
                    onChange={(e) => setFirst_Name(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <input
                    id="grid-last-name"
                    type="text"
                    placeholder="last_name"
                    value={last_name}
                    onChange={(e) => setLast_Name(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <input
                    id="grid-city"
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}>
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
                <button className="px-4 py-2 text-white bg-blue-500 rounded" onClick={handleAdd}>
                    Add
                </button>
            </div>
            <div className="flex justify-center items-center">
                <table className="table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 px-4 py-2">Email</th>
                            <th className="border border-gray-400 px-4 py-2">First Name</th>
                            <th className="border border-gray-400 px-4 py-2">Last Name</th>
                            <th className="border border-gray-400 px-4 py-2">City</th>
                            <th className="border border-gray-400 px-4 py-2">State</th>
                            <th className="border border-gray-400 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">{item.email}</td>
                                <td className="border border-gray-400 px-4 py-2">{item.first_name}</td>
                                <td className="border border-gray-400 px-4 py-2">{item.last_name}</td>
                                <td className="border border-gray-400 px-4 py-2">{item.city}</td>
                                <td className="border border-gray-400 px-4 py-2">{item.state}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleUpdate(index)}>Update</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
