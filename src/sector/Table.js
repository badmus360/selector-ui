import React from "react";
import { useState } from "react";
import Detail from "./Detail";
import { Link } from "react-router-dom";
import axios from "axios";

function Table(props) {
	const { titles, users, setReload, reload } = props;
	const [user, setUser] = useState(null);
	const [updateModel, setUpdateModel] = useState(false);

	const showUpdate = (e) => {
		const { id } = e.target.dataset;
		const currentUser = users.find((user) => user.id == id) || null;
		if (currentUser) {
			setUser(currentUser);
			setUpdateModel(true);
		}
	};

	const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`https://selector-production.up.railway.app/api/user/delete/${userId}`);
            if (response) {
                setReload(!reload);
                setUpdateModel(false);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
	
	return (
		<div>
			<table id="customers">
				<thead>
					<tr className="tr-head">
						{titles.map((title) => (
							<th key={title}>{title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.sector}</td>
							<td>{user.category}</td>
							<td>{user.product}</td>
							<td>{user.skill}</td>

							<td>
								<button
									className="update"
									data-id={user.id}
									onClick={showUpdate}
								>
									update
								</button>
							</td>

							<td>
								<button
									className="delete"
									onClick={() => handleDelete(user.id)}
								>
                            		Delete
                        		</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Detail
				updateModel={updateModel}
				setUpdateModel={setUpdateModel}
				user={user}
				setReload={setReload}
				reload={reload}
			/>
			<Link to={"/"} className="link-style">create new Users</Link>
		</div>
	);
}

export default Table;
