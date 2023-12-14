// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * 
//  * @format
//  */

// import React, { useEffect, useState } from 'react';
// import { Text, View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
// }

// const App = () => {
//   const [data, setData] = useState<UserData[]>([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [showUnfetchButton, setShowUnfetchButton] = useState(false);

//   const fetchUserData = async () => {
//     try {
//       setIsFetching(true);
//       setShowUnfetchButton(false);

//       const url = "http://127.0.0.1:3000/users";
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result: UserData[] = await response.json();
//       setData(result);
//       setShowUnfetchButton(true); // Show Unfetch button after fetching data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const fetchUserDataWithDelay = () => {
//     setIsFetching(true); // Show activity indicator
//     setTimeout(() => {
//       fetchUserData();
//     }, 2000); // Wait for 2 seconds before fetching data
//   };

//   const unfetchUserData = () => {
//     setIsFetching(false);
//     setData([]);
//     setShowUnfetchButton(false);
//   };

//   const renderUserItem = ({ item }: { item: UserData }) => (
//     <View style={styles.userContainer}>
//       <Text style={styles.userId}>ID: {item.id}</Text>
//       <Text style={styles.userName}>
//         Name: {item.name || 'Name not available'}
//       </Text>
//       <Text style={styles.userEmail}>
//         Email: {item.email || 'Email not available'}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Users</Text>
//       <TouchableOpacity
//         style={styles.fetchButton}
//         onPress={() => fetchUserDataWithDelay()}
//         disabled={isFetching}
//       >
//         <Text style={styles.buttonText}>
//           {isFetching ? 'Fetching...' : 'Fetch User Data'}
//         </Text>
//       </TouchableOpacity>
//       {showUnfetchButton && (
//         <TouchableOpacity
//           style={styles.unfetchButton}
//           onPress={() => unfetchUserData()}
//           disabled={!data.length}
//         >
//           <Text style={styles.buttonText}>Unfetch User Data</Text>
//         </TouchableOpacity>
//       )}
//       {isFetching ? (
//         <ActivityIndicator size="large" color="#3498db" />
//       ) : data.length ? (
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderUserItem}
//           style={styles.flatList}
//         />
//       ) : (
//         <View style={styles.centeredContainer}>
//           <Text style={styles.emptyText}>
//             No users found. Please fetch user data again.
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface UserData {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showUnfetchButton, setShowUnfetchButton] = useState(false);

  const fetchUserData = async () => {
    try {
      setIsFetching(true);
      setShowUnfetchButton(false);

      const url = "http://127.0.0.1:3000/users";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: UserData[] = await response.json();
      setData(result);
      setShowUnfetchButton(true); // Show Unfetch button after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchUserDataWithDelay = () => {
    setIsFetching(true); // Show activity indicator
    setTimeout(() => {
      fetchUserData();
    }, 2000); // Wait for 2 seconds before fetching data
  };

  const unfetchUserData = () => {
    setIsFetching(false);
    setData([]);
    setShowUnfetchButton(false);
  };

  const renderUserItem = ({ item }: { item: UserData }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userId}>ID: {item.id}</Text>
      <Text style={styles.userName}>
        Name: {item.name || 'Name not available'}
      </Text>
      <Text style={styles.userEmail}>
        Email: {item.email || 'Email not available'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {data.length > 0 && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Users Data List</Text>
        </View>
      )}

      <View style={styles.centeredContainer}>
        {!showUnfetchButton && (
          <TouchableOpacity
            style={styles.fetchButton}
            onPress={() => fetchUserDataWithDelay()}
            disabled={isFetching}
          >
            <Text style={styles.buttonText}>
              {isFetching ? 'Fetching...' : 'Fetch User Data'}
            </Text>
          </TouchableOpacity>
        )}

        {isFetching && <ActivityIndicator size="large" color="#3498db" />}

        {!isFetching && data.length === 0 && (
          <Text style={styles.emptyText}>
            No users found. Please fetch user data again.
          </Text>
        )}
      </View>

      {showUnfetchButton && (
        <TouchableOpacity
          style={styles.unfetchButton}
          onPress={() => unfetchUserData()}
          disabled={!data.length}
        >
          <Text style={styles.buttonText}>Unfetch User Data</Text>
        </TouchableOpacity>
      )}

      {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
          style={styles.flatList}
        />
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
  headerContainer: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  fetchButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  unfetchButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  userContainer: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  flatList: {
    marginTop: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
