import React from "react";
import "./scss/main.scss";
import Form from "./components/Form";
import { ReactComponent as Airplane } from "./airplane.svg";

function App() {

	return (
		<div className="App">
			<header className="App-header">
				<h2>Flight App</h2>
				<Airplane className="airplane" />
			</header>
			<section className="main-container">
				<Form />
			</section>
		</div>
	);
}

export default App;
