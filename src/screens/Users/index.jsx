import { View, TouchableOpacity  } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./styles";
import Title from "../../components/Title";


export default function Users() {
  const [users, setUsers] = useState([]);
  
  const apiURL= process.env.EXPO_PUBLIC_API_URL;

  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiURL}/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.get(`${apiURL}/users`, {
        name: "Usuario 1",
        email: "dev@felipe",
        password: "19032021",
      });
      setUsers(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  getUsers();
} , []);

console.log("Usuarios", users);

  return (
    <View style={styles.container}>
      <Title title="Users" />
      {
        users ? (
          users.map((user) => (
            <View key={user.id} style={styles.user}>
              <Title title={user.name} />
              <Title title={user.email} />
            </View>
          ))
        ) : (
          <Title title="Loading..." />
        )
      }

      <TouchableOpacity onPress={getUsers}>
        <Title title="Reload" />
      </TouchableOpacity>

      <TouchableOpacity onPress={createUser}>
        <Title title="Create User" />
      </TouchableOpacity>
      
    </View>
  );
}
