import { useState } from "react";


function Authenticate({ token, clearToken }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        
      
        if(!token) {
            setError("You must sign up before authenticating");
            return;
        }


        try {
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/authenticate", 
                {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                }
                
            });


            if(!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
            }


            const result = await response.json();
            console.log(result);

            if(result.data && result.data.username) {
                setSuccessMessage(`Welcome, ${result.data.username}`)
            } else {
                setSuccessMessage(result.message || "Authentication successful.");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            clearToken();
        }
        
    }

    return (
    <div>
          <h2 class="title">Authenticate</h2>
          {successMessage && <p>{successMessage}</p>}
          {error && <p style={{ color:"red" }}>{error}</p>}
          <button onClick={handleClick}>Authenticate Token</button>
          
          
    </div>
)
}

export default Authenticate