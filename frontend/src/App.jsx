import { useState } from 'react';
import './App.css';
import FormComponent from './component/FormComponent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormComponent />
    </>
  );
}

export default App;
