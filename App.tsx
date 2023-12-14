/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * @format
 */

import React, { useEffect, useState } from 'react'; 
import { Text, View, FlatList } from 'react-native';

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
    <View>
      <Text style={{ fontSize: 30 }}>Call JSON server API</Text>
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 30 }}>ID: {item.id}</Text>
              <Text style={{ fontSize: 30 }}>Name: {item.name}</Text>
              <Text style={{ fontSize: 30 }}>Email: {item.email}</Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

export default App;
