import { useState } from "react";

function SignUpForm( {setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
async function handleSubmit(event) {
    event.preventDefault();

    if(username.length < 8) {
        setError("Username must be at least 8 characters long");
        return;
    }
    
    if (password.length < 8 || !/\d/.test(password)) {
        setError("Password must be at least 8 characters long and contain at least one number.");
        return;
    } 
    setError(null);


    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password}),
        } )
        const result = await response.json();
        console.log(result);
    
        
        if (result.token) {
            setToken(result.token);
        } else {
            setError("Signup failed. Please try again.");
        }
     

    } catch (error) {
        setError(error.message);
    } 
 
}



   return (
    <div>
        <h2 class="title">Sign Up!</h2>
        { error && <p> {error} </p> }
        
        <form onSubmit={handleSubmit} >
            <label class="t2">
                Username: <br />
                <input value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            </label> <br />

            <label class="t2">
                Password: <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label> <br /> <br />

            <button type="submit">Submit</button>
            
        </form>
        
    </div>

   )
}

export default SignUpForm