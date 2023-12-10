import './App.css';
import Sector from './sector/Sector';
import { Route, Routes } from "react-router-dom";
import Users from "./sector/Users";

function App() {
  return (
<Routes>
			<Route
				path="/"
				element={<Sector />}
			/>
			<Route
				path="users"
				element={<Users />}
			/>
	</Routes>
  );
}

export default App;
