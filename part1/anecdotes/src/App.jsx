import React from 'react'
import { useState } from 'react'

const fessior = {
	member_count: 3 + 1 + 3 + 1,
	anecdotes: [
	{
		message: 'A busan a day keeps the doctor away!',
		upvotes: 2,
		downvotes: 0,
	},
	{
		message : 'Avoid sending too many updates to database in quick succession to avoid race condition!',
		upvotes: 0,
		downvotes: 0
	},
	{
		message : 'Daily meetup at 8PM to maximize productivity!',
		upvotes: 0,
		downvotes: 0
	},
	{
		message : 'Weekly meetup at R&B 3 Thang 2 to boost production!',
		upvotes: 10,
		downvotes: -1
	},
	]
}

const SelectedAnecdote = (props) => {
	const id = props.id
	return (
		<div className="selected-anecdote">
			{fessior.anecdotes[id].message}
		</div>
	);
}

const UpvoteButton = () => {
	return (
		<button>
			Upvote! ()
		</button>
	);
}

const DownvoteButton = () => {
	return (
		<button>
			Downvote! ()
		</button>
	);
}

const VoteSection = (props) => {
	return (
		<div className="vote-section">
			<UpvoteButton />
			<DownvoteButton />
		</div>
	)
}

const RandomizerButton = (props) => {
	return (
		<button className="randomizer-button" onClick={props.onClickCb}>
			Click here to randomize!
		</button>
	);
}

const AnecdoteViewer = () => {
	const [idx, setIdx] = useState(0)
	return (
		<div className="anecdote-viewer">
			<SelectedAnecdote id={idx} />
			<VoteSection id={idx}/>
			<RandomizerButton onClickCb={() => {
				let val = Math.round((Math.random() * (fessior.anecdotes.length - 1)))
				console.log("val is", val)
				setIdx(val)
			}}/>
		</div>
	);
}

const App = () => (<AnecdoteViewer />
)

export {App}