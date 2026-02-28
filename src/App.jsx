import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Books from './Components/Books';
import PlaceBet from './Components/PlaceBet';
import AddBooks from './Components/AddBooks';
import MyBets from './Components/MyBets';
import BetList from './Components/BetList';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/bets/:id"
          element={
            <ProtectedRoute requiredRole="user">
              <PlaceBet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bets"
          element={
            <ProtectedRoute requiredRole="user">
              <MyBets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-books"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/betslist/:bookId"
          element={
            <ProtectedRoute requiredRole="admin">
              <BetList />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
