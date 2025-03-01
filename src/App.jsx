import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusRentCalculator from './pages/BusRentCalculator';

function ContainerLayout({ children }) {
  return (
    <div className="max-w-5xl mx-auto p-5">
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ContainerLayout>
        <Routes>
          <Route path="/" element={<BusRentCalculator />} />
        </Routes>
      </ContainerLayout>
    </Router>
  );
}

export default App;
