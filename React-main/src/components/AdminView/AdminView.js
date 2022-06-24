// import React,{useRef} from "react";
// import * as admin from "firebase-admin"
// // import * as functions from "firebase-functions"

// export default function AdminView() {

// const grantStudentRoleRef= useRef()

// async function grantStudentRole(){
//     let email = grantStudentRoleRef.current.value
//     const user = await admin.auth()
//     // if(user.customClaims && (user.customClaims.role === 'student')){
//     //     return;
//     // }
//     // return admin.auth().setCustomUserClaims(user.uid, {
//     //     role: 'student'
//     // });
    
// }


//   return (
//     <div>
//         <input ref={grantStudentRoleRef} placeholder=" eulooooo" type="text"/><input type="button"value="elo"onClick={grantStudentRole}/>
      
//     </div>
//   );
// }