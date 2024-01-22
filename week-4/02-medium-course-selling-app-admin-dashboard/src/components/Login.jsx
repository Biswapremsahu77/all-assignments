import * as React from "react"; 
import {useNavigate} from  'react-router-dom';
import {Button,TextField,Box} from '@mui/material';
/// File is incomplete. You need to add input boxes to take input for users to login.

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigateTo = useNavigate();
    
    const handleEmailChange = React.useCallback((e) => {
        setEmail(e.target.value);
    },[])

    const handlePasswordChange = React.useCallback((e) => {
        setPassword(e.target.value);
    },[])
    
    const handleClickLogin = async()=>{
            try{
            const response = await fetch("http://localhost:3000/admin/login",{
                method:'POST',
                headers:{
                    username: email,
                    password: password    
                }
            });
            if(!response.ok){
            const errorMessage = await response.message();
            console.log('Error status:${response.status},Message:',errorMessage);
            }
            const result = await response.json();
            localStorage.setItem('token',result.token);
            navigateTo('/');

        }catch(error){
            console.log("Error status:",error);
        }
      
    }
    return (<div>
        <Box>
            <h1>Login to admin dashboard</h1>
            <br/>
            <TextField type={"text"} onChange={handleEmailChange} label = "Email"/>
            <br />
            <TextField type={"text"} onChange={handlePasswordChange} label = "password"/>
            <br/>
            <Button variant="contained" onClick = {handleClickLogin}>Login</Button>
            <br/>
            New here? <a href="/register">Register</a>
        </Box>
    </div>);



    }
    
    



export default Login;