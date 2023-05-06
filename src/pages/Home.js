import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [loading, setLoading] = useState(false);
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [city, setCity] = useState("");
    const [state1, setState1] = useState("");

    useEffect(() => {
        if (!loading) {
            async function fetchData() {
                try {
                    const {id} = state;
                    const users = await axios.get(`http://localhost:3000/user/${id}`);
                    console.log(users);
                    setFirst_Name(users.data.user[0].first_name);
                    setLast_Name(users.data.user[0].last_name);
                    setCity(users.data.user[0].city);
                    setState1(users.data.user[0].state);
                    setLoading(true);
                } catch (error) {
                    console.log(error.response.data);
                    alert(error.response.data.message);
                }
            }
            fetchData();
        }
    }, [loading, state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {id} = state;
        await axios.patch(`http://localhost:3000/user/${id}`, {
            first_name,
            last_name,
            city,
            state : state1
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                // Handle successful response from backend here
                alert(response.data.message);
                setLoading(false);
                console.log(response.data.user);
            })
            .catch(error => {
                // Handle error here
                console.log(error.response.data);
                alert(error.response.data.message);
            });
    };

    const handleLogout = async (event) => {
        navigate("/login");
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <h1 className="text-3xl font-bold mb-5">User Details</h1>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-first-name"
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirst_Name(e.target.value)}
                            placeholder="John"
                            required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            value={last_name}
                            onChange={(e) => setLast_Name(e.target.value)}
                            placeholder="Doe"
                            required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            City
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Albuquerque"
                            required />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            State
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                value={state1}
                                onChange={(e) => setState1(e.target.value)}>
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mr-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Save
                </button>
                </div>
            </form>
            <div className="flex justify-center items-center mt-5">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
