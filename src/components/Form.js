import React, { useState } from "react";
import Flights from "./Flights";

export default function Form() {
	const [values, setValues] = useState({
		origin: "",
		destination: "",
	});

	const [message, setMessage] = useState({
		text: "",
		color: "",
		show: false,
	});

	const [flights, setFlights] = useState([]);

	const airports = "ATH BSL BFS BLQ BTS BRS CRL BUD DUB EDI EIN GLA HAM CTA KEF CGN SUF LCA LPL LIS LTN STN MAD".split(
		" "
	);

	const routes = [
		["ATH", "EDI"],
		["ATH", "GLA"],
		["ATH", "CTA"],
		["BFS", "CGN"],
		["BFS", "LTN"],
		["BFS", "CTA"],
		["BTS", "STN"],
		["BTS", "BLQ"],
		["CRL", "BLQ"],
		["CRL", "BSL"],
		["CRL", "LTN"],
		["DUB", "LCA"],
		["LTN", "DUB"],
		["LTN", "MAD"],
		["LCA", "HAM"],
		["EIN", "BUD"],
		["EIN", "MAD"],
		["HAM", "BRS"],
		["KEF", "LPL"],
		["KEF", "CGN"],
		["SUF", "LIS"],
		["SUF", "BUD"],
		["SUF", "STN"],
		["STN", "EIN"],
		["STN", "HAM"],
		["STN", "DUB"],
		["STN", "KEF"],
	];

	//The graph

	const adjacencyList = new Map();

	//Add node

	function addNode(airport) {
		adjacencyList.set(airport, []);
	}

	//Add edge, directed

	function addEdge(origin, destination) {
		adjacencyList.get(origin).push(destination);
		// adjacencyList.get(destination).push(origin);
	}

	//Create the graph

	airports.forEach(addNode);
	routes.forEach((route) => addEdge(...route));

	////////////////////////////////// BFS method

	function bfs(start, finish) {
		debugger;
		console.log("start " + start);

		const previous = new Map();

		const visited = new Set();
		const queue = [];
		queue.push({node: start, dist: 0})
		visited.add(start);


// console.log(previous);
		while (queue.length > 0) {

			const {node, dist} = queue.shift();
			// console.log(node);
			
			// const destinations = adjacencyList.get(airport);
			
			for (const destination of adjacencyList.get(node)) {

				if (destination === finish) {
					setMessage((prev) => ({
						...prev,
						text: "Connection found!!!",
						color: "green",
						show: true,
					}));
	
					visited.add(destination);
	
					const path = [...visited];
	
					setFlights((prev) => [...prev, path]);
	
				}

				if (!visited.has(destination)) {
					previous.set(destination, node)
					visited.add(destination);
					queue.push({node: destination, dist: dist +1});
					// console.log(previous);
				}
			}
		}
		if (!visited.has(finish)) {
			setMessage((prev) => ({
				...prev,
				text: "No Connection found!",
				color: "red",
				show: true,
			}));
		}
		return { shortestDistance: -1, previous}
	}

	const handleChange = (e) => {
		e.preventDefault();

		const { name, value } = e.target;

		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (values.origin === "" || values.destination === "") {
			setMessage((prev) => ({
				...prev,
				text: "Please choose airport",
				color: "red",
				show: true,
			}));

			setFlights([]);
			return;
		}
		if (values.origin === values.destination) {
			setMessage((prev) => ({
				...prev,
				text: "Airports must be different",
				color: "red",
				show: true,
			}));

			setFlights([]);
			return;
		}

		setMessage((prev) => ({
			...prev,
			text: "",
			color: "",
			show: false,
		}));

		setFlights([]);

		bfs(values.origin, values.destination);
	};

	return (
		<form onSubmit={handleSubmit}>
			<select
				id="origin"
				onChange={handleChange}
				name="origin"
				defaultValue={"DEFAULT"}
			>
				<option value="DEFAULT" disabled>
					Origin
				</option>
				{airports.map((airport) => (
					<option key={airport} value={airport}>
						{airport}
					</option>
				))}
			</select>

			<select
				id="destination"
				onChange={handleChange}
				name="destination"
				defaultValue={"DEFAULT"}
			>
				<option value="DEFAULT" disabled>
					Destination
				</option>
				{airports.map((airport) => (
					<option key={airport} value={airport}>
						{airport}
					</option>
				))}
			</select>
			<input
				className="submit-btn"
				type="submit"
				value="Find Connection"
			/>
			{message.show && (
				<p
					className="message"
					style={{
						color: message.color,
					}}
				>
					{message.text}
				</p>
			)}

			<Flights className="flights">
				{flights[0] &&
					flights[0].map((flight) => (
						<p key={flight}>{flight}</p>
					))}
			</Flights>
		</form>
	);
}
