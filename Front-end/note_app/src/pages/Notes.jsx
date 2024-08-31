import {useState,useEffect} from "react"


function Notes()
{
    const [notes,setNotes] = useState([])
    const fetchNotes = async()=>{
        const token = localStorage.getItem("token");
       try {
        const response = await fetch("https://notes-app-0vqm.onrender.com/note",{
            headers:{
                Authorization: `${token}`
            }
        });
        const data = await response.json();
        console.log(data)
        setNotes(data.notes)
       } catch (error) {
        alert(`Error while fetching the notes ${error}`)
       }

        }

    useEffect(()=>{
        fetchNotes()
    },[])

    const handleDelete = async(id)=>{
        const token = localStorage.getItem("token");
        try {
            await fetch(`https://notes-app-0vqm.onrender.com/note/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`${token}`
                }
            })
            fetchNotes()
        } catch (error) {
            alert(`Error while deleting the note ${error}`)
        }
    }

    return(
        <>
        <h1>Notes</h1>
        {notes? notes.map((note)=>{
            return (
                <div key={note._id}>
                <h2>{note.title}</h2>
                <h2>{note.content}</h2>
                <button onClick={()=>handleDelete(note._id)}>Delete</button>
                </div>
            )
        }):alert("No notes found")}
        </>
    )
}

export default Notes