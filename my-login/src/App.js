import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginPage/>
      <h1>{localStorage.getItem("email")}</h1>
      <img style={{height:50, width:50}} src = {localStorage.getItem("profilePic")} alt='no-img'/>
    </div>
  );
}

export default App;
