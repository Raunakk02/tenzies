import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
import "./styles.css";

function App() {
	const [dice, setDice] = useState(generateRandom());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allHeld = dice.every((d) => d.isHeld);
		const val = dice[0].value;
		const allSameValue = dice.every((d) => d.value === val);

		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	console.log(tenzies);

	function generateRandom() {
		const newDice = [];
		let t = 10;
		while (t--)
			newDice.push({
				value: Math.round(Math.random() * 5 + 1),
				isHeld: false,
			});

		return newDice;
	}

	function rollDice() {
		let newDices = generateRandom();
		setDice((prev) => {
			return prev.map((d, i) => {
				return d.isHeld === true ? d : newDices[i];
			});
		});
	}

	function holdDice(id) {
		setDice((prev) => {
			return prev.map((d, i) => {
				return i === id ? { ...d, isHeld: !d.isHeld } : d;
			});
		});
	}

	const diceElements = dice.map((d, i) => (
		<Die
			key={i}
			value={d.value}
			isHeld={d.isHeld}
			handleClick={() => holdDice(i)}
		/>
	));

	return (
		<>
			<main>
				{tenzies && <Confetti />}
				<h1 className="title">Tenzies</h1>
				<p className="instructions">
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
				<div className="die-grid">{diceElements}</div>
				<button className="roll-button" onClick={rollDice}>
					{tenzies ? "New Game" : "Roll"}
				</button>
			</main>
		</>
	);
}

export default App;
