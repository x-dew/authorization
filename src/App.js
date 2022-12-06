import React from "react";
import './assets/styles/App.css';
import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/appRouter";

const App = () => {
    useAuth()
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}

export default App;
