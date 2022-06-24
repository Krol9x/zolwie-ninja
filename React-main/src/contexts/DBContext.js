import React, { useContext, useState } from "react"
import { ref, get, set } from 'firebase/database'
import { getDownloadURL, uploadBytesResumable, ref as sRef } from "firebase/storage"
import { firebaseDb as db, storage } from '../firebase'
import { useAuth } from "../contexts/AuthContext"




const DBContext = React.createContext()

export function useDB() {
    return useContext(DBContext)
}

export function DBProvider({ children }) {

    const { currentUser } = useAuth()
    const [user, setUser] = useState(undefined)
    const [uploadState, setUploadState] = useState(0)


    //works, don't use it
    function updateUser() {
        const userref = ref(db, 'users/' + currentUser.uid)
        get(userref).then(snapshot => {
            setUser({ ...currentUser, ...snapshot.val() })
        })

    }
    //works
    function getGroupInfo(groupID) {
        return new Promise((resolve, reject) => {
            const groupref = ref(db, 'groups/' + groupID)
            get(groupref).then(snapshot => {
                console.log(snapshot)
                resolve(snapshot.val())
            })
        })
    }
    //works
    function getUserGroups(userID) {
        return new Promise((resolve, reject) => {
            const userGroupsRef = ref(db, 'users/' + userID + '/groups')
            get(userGroupsRef).then(snapshot => {
                resolve(Object.values(snapshot.val()))
            })
        })
    }
    //works
    function getUserTasks(userID) {
        return new Promise(async (resolve, reject) => {
            const userGroups = await getUserGroups(userID)
            const tasksToBeReturned = []
            for(let group in userGroups){
                group = userGroups[group]
                const groupTasks = ref(db, 'groups/' + group + '/tasks')
                const snapshot = await get(groupTasks)
                const tasks = snapshot.val()
                const taskIDs = Object.keys(tasks)
                for(const taskID of taskIDs){
                    const taskRef = ref(db, 'submitions/' + group + '/' + taskID + '/' + userID)
                    const taskSnapshot = await get(taskRef)
                    if (!taskSnapshot.exists()) {
                        tasks[taskID].submited = false
                    }
                    else {
                        const submition = taskSnapshot.val()
                        tasks[taskID].submited = true
                        tasks[taskID].submitionDate = submition.submitionDate
                        if (submition.feedback) tasks[taskID].feedback = submition.feedback
                        tasks[taskID].fileName = submition.file.name
                        tasks[taskID].fileURL = submition.file.fileURL
                    }
                    tasksToBeReturned.push(tasks[taskID])
                }
            }
            resolve(tasksToBeReturned)
        })
    }
    //works
    function getSubmitions(groupID, taskID) {
        return new Promise((resolve, reject) => {
            const submitionsref = ref(db, 'submitions/' + groupID + '/' + taskID)
            get(submitionsref).then(snapshot => {
                console.log(snapshot)
                resolve(snapshot.val())
            })
        })
    }
    //works
    function getUserName(userID) {
        return new Promise((resolve) => {
            const userref = ref(db, 'users/' + userID)
            get(userref).then(snapshot => {
                resolve(snapshot.val().name)
            })
        })
    }
    //works
    function addUserToGroup(userID, groupID) {
        const userGroupsRef = ref(db, "users/" + userID + "/groups/" + groupID)
        set(userGroupsRef, groupID)
    }
    //works
    function submitSolution(groupID, taskID, file) {
        setUploadState(0)
        if (!file) return

        const storageRef = sRef(storage, 'submitions/' + groupID + '/' + taskID + '/' + user.uid + '/' + file.name)
        const upload = uploadBytesResumable(storageRef, file)

        upload.on("state_changed", snapshot => {
            setUploadState((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
            (error) => {
                console.log(error)
            },
            () => {
                //successfully uploaded file
                getDownloadURL(upload.snapshot.ref).then(url => {
                    //add submition to database
                    const submitionref = ref(db, 'submitions/' + groupID + '/' + taskID + '/' + user.uid +  "/file")
                    set(submitionref, {
                        fileURL: url,
                        name: file.name
                    })

                })
            })
    }
    //works
    function addTask(groupID, task) {
        //expects task to be in format: 
        // {
        //     date: ,
        //     description: "",
        //     dueDate: ,
        //     name: ""
        // }
        const taskID=Date.now()
        const taskref = ref(db, 'groups/' + groupID + '/tasks/'+taskID)
        set(taskref,task)
    }
    function addFeedback(groupID, taskID, userID, feedback) {
        const feedbackref = ref(db, 'submitions/' + groupID + '/' + taskID + '/' + userID + '/feedback')
        set(feedbackref, feedback)
    }


    const value = {
        user,
        updateUser,//nie używajcie tego
        getGroupInfo,
        getSubmitions,
        getUserName,
        addTask,
        submitSolution,
        uploadState,
        getUserGroups,
        getUserTasks,
        addUserToGroup,
        addFeedback
    }

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}