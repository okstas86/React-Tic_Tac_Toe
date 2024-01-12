import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combination'

function deriveActivePlayer(gameTurns) {
	let curentPlayer = 'X'
	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		curentPlayer = 'O'
	}
	return curentPlayer
}

function App() {
	const [gameTurns, setGameTurns] = useState([])
	const activePlayer = deriveActivePlayer(gameTurns)

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns(prevTurns => {
			let curentPlayer = deriveActivePlayer(prevTurns)

			const updatedTurns = [
				{
					square: {
						row: rowIndex,
						col: colIndex,
					},
					player: curentPlayer,
				},
				...prevTurns,
			]

			return updatedTurns
		})
	}
	return (
		<main>
			<div id='game-container' className='highlight-player'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName={'Player 1'}
						symbol={'X'}
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName={'Player 2'}
						symbol={'O'}
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	)
}

export default App
