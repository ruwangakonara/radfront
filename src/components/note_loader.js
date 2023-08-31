import {React, useEffect} from "react";
import axios from "axios";

class Notes extends React.Component{

    constructor(props){
        super(props)

        // this.state = {



        // }

        // useEffect(() => {
            // this.fetchnotes()
        // }, [])
    }

    componentDidMount(){
        this.fetchnotes
    }

    fetchnotes = async () =>{

        const response = await axios.get("http://localhost:9007/notes")

        console.log(response)
    }

}

export default Notes