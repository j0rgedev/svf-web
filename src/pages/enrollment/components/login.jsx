import Sidebar from '../components/Sidebar' 
import InputField from '../components/InputField'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Submitting username: ${username} and password: ${password}`);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Codigo Alumno:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    );
  }
  
  export default LoginForm;