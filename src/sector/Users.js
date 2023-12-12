import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const Users = () => {
	const [users, setUsers] = useState();
	const [reload, setReload] = useState(false);

	const titles = ["Name", "Sector", "Category", "Product", "Skill", "Edit", "Delete"];

	useEffect(() => {
		const fetchData = () => {
			axios
				.get("https://selector-production.up.railway.app/api/user/all")
				.then((response) => response.data)
				.then((data) => {
					console.log(data);
					setUsers(data);
				});
		};
		fetchData();
	}, [reload]);

	return (
		<div className="wrapper">
			<div className="container">
				<h2 className="h2-Users">Registered Users</h2>
				<Table
					titles={titles}
					users={users}
					reload={reload}
					setReload={setReload}
				/>
			</div>
		</div>
	);
};

export default Users;
