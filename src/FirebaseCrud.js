import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from './Navbar';

function FirebaseCrud() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                password: password,
            });
            console.log("Document written with ID: ", docRef.id);
            alert("User added successfully!");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error adding document!");
        }
    }
    console.log(db); // This should print the Firestore instance if the import is successful

    return (
        <div>  
    <Navbar /> 
        <div style={styles.container}>
            
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Add New User</h2>
                <div style={styles.formGroup}>
                    <input 
                        type="text" 
                        placeholder='Name'
                        style={styles.input}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <input 
                        type="email" 
                        placeholder='Email'
                        style={styles.input}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <input 
                        type="password" 
                        placeholder='Password'
                        style={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    style={styles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Add User
                </button>
            </div>
        </div>
        </div>
    );
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    formGroup: {
        marginBottom: '20px',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        marginTop: '5px',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
        fontSize: '24px',
    }
};

export default FirebaseCrud;