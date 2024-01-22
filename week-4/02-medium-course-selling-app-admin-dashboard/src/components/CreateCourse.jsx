import React, { useCallback } from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description,setDescription] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [img,setImg] = React.useState(null)

    const handleOnChange = useCallback((e,setElement) =>{
        setElement(e.target.value);
      

    },[]);

    const handleClick = async() => {
        try{
            const response = await fetch('http://localhost:3000/admin/courses',{
                method : 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': ("Bearer" + localStorage.getItem('token'))
                },
                body:{
                    'title' : title , 
                    'description': description,
                    'price': price,
                    'imagelink': img,
                }
            });

                if(!response.ok){
                    const errorMsg = await response.json();
                    console.log("Error Message",errorMsg);
                } else {
                    const result = await response.json();
                    console.log(result.courseId);
                }
                
    
        }catch(error){
            console.log(error);
        }
    } 


    return (<>
        <div>
            <h1>Create Course Page</h1>
            <label htmlFor="title">Title</label><br />
            <input type={"text"} id="title" onChange={(e) => {handleOnChange(e,setTitle)}} /><br />
            <label htmlFor="description">Description</label><br />
            <input type="text" id = "description" onChange = {(e) => {handleOnChange(e,setDescription)}} /><br />
            <label htmlFor="price">Price</label><br />
            <input type="text" id="price" onChange={(e) => {handleOnChange(e,setPrice)}}/><br />
            <label htmlFor="img">Give the Image link</label><br />
            <input type="text" onChange = {(e) => {handleOnChange(e,setImg)}} /><br />
            <button onClick={handleClick}>Create Course</button>
        </div>
    </>);
}
export default CreateCourse;