// Import the openDB function from the 'idb' library
import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () => {
  // Open the 'jate' database with version 1
  // and provide an upgrade function
  openDB('jate', 1, {
    // Upgrade function called when the database version is incremented
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create the 'jate' object store with 'id' as the key path and auto-increment
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Function to store data in the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Open the 'jate' database with version 1
  const jateDB = await openDB('jate', 1);
  // Start a transaction with the 'jate' object store for read-write access
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Put the data (content) into the 'jate' object store
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to the database', result.value);
};

// Function to retrieve data from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Open the 'jate' database with version 1
  const jateDb = await openDB('jate', 1);
  // Start a transaction with the 'jate' object store for read-only access
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get the data with key 1 from the 'jate' object store
  const request = store.get(1);
  const result = await request;
  // Check if the data was retrieved successfully
  result
    ? console.log('data retrieved from the database', result.value)
    : console.log('no data in the database');

  // Return the retrieved value, if any
  return result?.value;
};

// Call the initdb function to initialize the database
initdb();
