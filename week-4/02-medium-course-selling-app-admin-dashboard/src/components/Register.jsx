import React from "react";
import { useNavigate } from "react-router-dom";
import {Button,TextField,Box} from "@mui/material";
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigateto = useNavigate();
    
    const handleEmailChange = React.useCallback((e) => {
        setEmail(e.target.value);
    },[])
    const handlePasswordChange = React.useCallback((e) => {
        setPassword(e.target.value);
    },[])

    const handleClickRegister = async() => {
        try{
            const response = await fetch('http://localhost:3000/admin/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    username:email,
                    password:password
                }),
            });

            if(!response.ok){
                const errorMessage = await response.json();
                console.log(`ErrorMessage:${response.status},Message:${errorMessage}`);

            } else {
                const result = await response.json();
                console.log(result.message);
                navigateto('/login');

            }

        }catch(error) {
            console.log('Error:',error)
        }
    }
    return (
    <Box
    sx = {{
        display:"flex",
        flex_direction: "row",
        alignItems: "center",
        justifyContent: "center",
    }}
    >
        <Box
        component="img"
        sx={{
        }}
        src = "assets/welcome.svg"
        alt = "Welcome Picture">

        </Box>
        <Box>
            <h1>Register to the website</h1>
            <br/>
            <TextField type={"text"} onChange={handleEmailChange} label = "Email"/>
            <br />
            <TextField type={"text"} onChange={handlePasswordChange} label  = "Password"/>
            <br/>
            <Button variant="contained" onClick={handleClickRegister}>Register</Button>
            <br />
            Already a user? <a href="/login">Login</a>
        </Box>
    </Box>
    );
}

export default Register;