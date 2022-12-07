import { React, useState } from 'react'
import Header from '../header/Header'

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

      <h1>Please Log In</h1>

      <form onSubmit={e => handleSubmit(e)}>
        <label>
          <p>Email</p>
          <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
        </label>
        <label>
          <p>Password</p>
          <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default LoginPage
