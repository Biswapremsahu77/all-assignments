
import React from "react";
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const [loggedIn,setloggedIn] = React.useState(false);

    const handleLogOut = () =>{
        localStorage.removeItem('token');
        setloggedIn(false);

    }

    React.useEffect(() => {
        const logInCheck = async()=>{
            const token = localStorage.getItem('token');
            try{
                const response = await fetch('http://localhost:3000/admin/check',{
                    method:'GET',
                    headers:{
                        'authorization': "Bearer " + token
                    }
                });

                if(!response.ok){
                    console.log(response.status);
                    console.log("Control reaches here")
                } else {
                    const result = await response.json();
                    setloggedIn(result.isAuthenticated);
                }

            }catch(error){
                console.log('Error:',error);
            }

        }

    logInCheck();
    },[loggedIn]);

    function RenderLoggedOut(){
         return (<div>
            <h1>Welcome to course selling website!</h1>
            <a href="/register">Register</a>
            <br/>
            <a href="/login">Login</a>
        </div>);
    }
    function RenderLoggedIn(){
        return (<div>
                <h1>Welcome to the Website, Admin</h1>
               <a href="/about">CreateCourse</a>
               <br />
               <a href="/courses">ShowCourses</a>
               <br />
               <button onClick = {handleLogOut}> logout</button>
               <br />
            </div>);
    }
    return loggedIn ? <RenderLoggedIn /> : <RenderLoggedOut/>;
}


export default Landing;