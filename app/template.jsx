// import './styles/app.postcss'
import { Route, Routes } from 'react-router-dom'
// import Home from '../pages'


const App = ({ children }) => {
	return (
		<main>
			<header>
				<h1>Dan and Amy are getting married!</h1>
			</header>
			{children}
		</main>
	)
}

export default App
