import { React, useState } from 'react'
import Header from '../header/Header'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '', // required
    password: '' // required
})

function handleSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data.user))

}

function handleChange(e) {
    setFormData({...formData, [e.target.name] : e.target.value})
}

  return (
    <>
      <Header/>
      <div className="login-wrapper">

      <h1>Connexion</h1>

      <form onSubmit={e => handleSubmit(e)}>
          <TextField size="small" label='Email' type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></TextField>
          
          <TextField size="small" label='Mot de passe' type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></TextField>

        <div>
          <Button variant='contained' type="submit">Login</Button>
        </div>
      </form>
    </div>
    </>
  )
}

export default LoginPage
