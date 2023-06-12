import { NavBar } from './components/NavBar';
import { StickersContent } from './components/StickersContent';
import { StickersInfo } from './components/StickersInfo';
import './css/App.css';

function App() {
	return (
		<>
			<NavBar />
			<StickersContent />
			<StickersInfo />
		</>
	);
}

export default App;
