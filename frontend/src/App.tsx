// import "./App.css";
// import Header from "./components/Header";
// import { BrowserRouter } from "react-router-dom";

// function App() {
//   <BrowserRouter>
//     <Header />
//   </BrowserRouter>;
// }

// export default App;

import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}
export default App;

