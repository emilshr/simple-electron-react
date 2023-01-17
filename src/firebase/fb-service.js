const { addDoc, setDoc, getDocs, doc, collection, query, onSnapshot, getDoc } = require('firebase/firestore');
const { db, app } = require('./config')

export const writeText = (text) => {
    
    const col = collection(db, "comprehend");
    
    setDoc(col, { text }, { merge: true })
    .then(value => console.log({value}))
    .catch(err => console.error(err))
    .finally(() => console.log('done'))
};

export const readText =  (callBack) => {
    const col = collection(db, "comprehend");
    const dataList = []
    onSnapshot(col, snapshot => {
        snapshot.forEach(data => {
            dataList.push(data.data().text);
            callBack(dataList.join('\n'))
        })
    })
}