import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combination'

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
]

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

	let gameBoard = initialGameBoard

	for (const turn of gameTurns) {
		const { square, player } = turn
		const { row, col } = square
		gameBoard[row][col] = player
	}

	let winner = null

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSimbol =
			gameBoard[combination[0].row][combination[0].column]
		const secondSquareSimbol =
			gameBoard[combination[1].row][combination[1].column]
		const thirdSquareSimbol =
			gameBoard[combination[2].row][combination[2].column]

		if (
			firstSquareSimbol &&
			firstSquareSimbol === secondSquareSimbol &&
			firstSquareSimbol === thirdSquareSimbol
		) {
			winner = firstSquareSimbol
		}
	}

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
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	)
}

export default App
