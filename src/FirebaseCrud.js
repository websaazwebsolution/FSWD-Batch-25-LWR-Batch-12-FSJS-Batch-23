import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Firestore instance import
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Firestore methods import
import Navbar from './Navbar';

function FirebaseCrud() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    // Fetch all users from Firestore
    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(userData);
        } catch (e) {
            console.error("Error fetching documents: ", e);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts
    }, []);

    // Add new user or update existing user based on whether we are editing or adding
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUserId) {
            // If we are editing an existing user
            await updateDoc(doc(db, "users", editingUserId), {
                user_name: name,
                user_email: email,
                user_password: password,
            });
            alert("User updated successfully!");
        } else {
            // Add a new user
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    user_name: name,
                    user_email: email,
                    user_password: password,
                });
                console.log("Document written with ID: ", docRef.id);
                alert("User added successfully!");
            } catch (e) {
                console.error("Error adding document: ", e);
                alert("Error adding document!");
            }
        }
        fetchUsers(); // Fetch users again to reflect new or updated user
        resetForm(); // Reset form fields after submission
    };

    // Edit user - populate form with existing user data
    const editUser = (user) => {
        setEditingUserId(user.id); // Set the editingUserId to the user's ID
        setName(user.user_name);
        setEmail(user.user_email);
        setPassword(user.user_password);
    };

    // Delete user
    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "users", userId));
            alert("User deleted successfully!");
            fetchUsers(); // Fetch users again to reflect changes
        } catch (e) {
            console.error("Error deleting document: ", e);
            alert("Error deleting document!");
        }
    };

    // Reset the form
    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setEditingUserId(null);
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <h2 style={styles.heading}>{editingUserId ? "Edit User" : "Add New User"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <input
                                type="text"
                                placeholder='Name'
                                style={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type="email"
                                placeholder='Email'
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type="password"
                                placeholder='Password'
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            {editingUserId ? "Update User" : "Add User"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Display all users */}
            <div style={styles.usersContainer}>
                <h2 style={styles.heading}>All Users</h2>
                {users.length > 0 ? (
                    <div style={styles.usersList}>
                        {users.map((user) => (
                            <div key={user.id} style={styles.userCard}>
                                <h3 style={styles.userName}>{user.user_name}</h3>
                                <p style={styles.userDetails}>Email: {user.user_email}</p>
                                <p style={styles.userDetails}>Password: {user.user_password}</p>
                                <div style={styles.actions}>
                                    <button onClick={() => editUser(user)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No users available</p>
                )}
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
        backgroundColor: '#f0f4f8',
        padding: '20px',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        marginBottom: '40px',
    },
    formGroup: {
        marginBottom: '15px',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        marginTop: '5px',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
    },
    button: {
        width: '100%',
        padding: '14px',
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
        marginBottom: '20px',
        fontSize: '24px',
    },
    usersContainer: {
        maxWidth: '1000px',
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    usersList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    userCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '20px',
        width: '220px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    userName: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    userDetails: {
        fontSize: '14px',
        color: '#555',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    editButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default FirebaseCrud;
