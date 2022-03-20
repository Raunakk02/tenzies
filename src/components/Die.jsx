function Die(props) {
	let addClass = props.isHeld ? "held" : "";
	return (
		<div className={`die ${addClass}`} onClick={props.handleClick}>
			{props.value}
		</div>
	);
}

export default Die;
