import React from "react"
import { useState } from "react"
import { useDB } from "../../contexts/DBContext"

export default function Task(props) {

    const {submitSolution } = useDB()
    const [filename, setfile] = useState("Wybierz plik z komputera")

    function changefilename(e) {
        setfile(e.target.files[0].name);
    }

    const formHandler = (e) => {
        e.preventDefault()
        console.log("xdddd");
        const file = e.target[0].files[0]
        submitSolution("testGroup", "testTask", file)
    }

    function dfn() {
        setfile("Wybierz plik z komputera");
    }

    return (
        <li>
            <div className="post">
                <div className="header">
                    <h1>{props.name}</h1><h3>{props.dueDate}</h3>
                </div>
                <div>
                    <div className="description"><p>{props.description}</p>
                        <h3>{props.feedback}</h3>
                    </div>
                    <div className="attachments">
                        <div className="files-container">

                            <ol>
                                <li> {filename} <button type="submit" className="add" onClick={dfn} >Usun</button></li>
                            </ol>

                            <div className="buttons">

                                <form onSubmit={formHandler}>
                                    <div class="field upload">
                                        <label>Wybierz plik z komputera</label>
                                        <input type="file" id="upload-button" onChange={changefilename} name="upload-file"></input>
                                    </div>
                                    <button type="submit" className="send" >Przeslij Zadanie</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}