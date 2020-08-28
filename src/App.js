import React from "react";
import "./scss/main.scss";
import Form from "./components/Form";
// import Flights from "./components/Flights";
import { ReactComponent as Airplane } from "./airplane.svg";

function App() {
	///////////////////////////////////// DFS method

	// function dfs(start, finish, visited = new Set()) {
	//   console.log(start);
	//   // debugger

	//   visited.add(start);

	//   const destinations = adjacencyList.get(start);

	//   const path = [];

	//   for (const destination of destinations) {
	//     // console.log(destination);

	//     if (destination === finish) {
	//       console.log(` found =====>${finish}`);
	//       console.log(visited);
	//       return visited;
	//     }

	//     if (!visited.has(destination)) {
	//       dfs(destination, finish, visited);
	//     }
	//   }
	// }

	// dfs("BTS", "DUB");

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
