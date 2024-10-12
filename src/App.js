import Dashboard from './Dashboard';
import Details from './Details';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
return(
  <div>
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
    </Router>

  </div>
)
}
 

export default App; 
