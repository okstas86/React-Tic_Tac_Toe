import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'

function App() {
	const [activePlayer, setActivePlayer] = useState('X')
	const [gameTurns, setGameTurns] = useState([])

	function handleSelectSquare(rowIndex, colIndex) {
		setActivePlayer(curActivePlayer => (curActivePlayer === 'X' ? 'O' : 'X'))
		setGameTurns(prevTurns => {
			let curentPlayer = 'X'
			if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
				curentPlayer = 'O'
			}
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
