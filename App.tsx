/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * @format
 */

import React, { useEffect, useState } from 'react'; 
import { Text, View, FlatList, StyleSheet } from 'react-native';

interface UserData {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [data, setData] = useState<UserData[]>([]);

  const getAPIData = async () => {
    try {
      const url = "http://127.0.0.1:3000/users";
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: UserData[] = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Users</Text>
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.userId}>ID: {item.id}</Text>
              <Text style={styles.userName}>Name: {item.name}</Text>
              <Text style={styles.userEmail}>Email: {item.email}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No users found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    marginBottom: 20,
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    fontSize: 18,
    color: 'red',
  },
});

export default App;
