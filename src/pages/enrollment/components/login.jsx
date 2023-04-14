/* import Sidebar from '../../../common/components/Sidebar/Sidebar' 
import InputField from '../../../common/components/Inputfield/Inputfield' */
import React from 'react'

export default function Login() {
    const [usercode, setUsercode] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Submitting usercode: ${usercode} and password: ${password}`);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Codigo Alumno:
          <input type="text" value={usercode} onChange={(e) => setUsercode(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    );
  }