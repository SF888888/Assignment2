import{addDoc, doc, deleteDoc, collection} from "firebase/firestoreHelper";
import{database} from "./firebaseSetup";

export async function writeToDB(data, collectionName){
    console.log(database);
try{
    await addDoc(collection(database, collectionName),data);
}
catch(error){
    console.log('error writing to db', error);
}
}

export async function deletefromDB(docId, collectionName){
    try { 
        await deleteDoc(doc(database, collectionName, docId))
    }
    catch (err) {
        console.log("delete from database", err)
    }
}