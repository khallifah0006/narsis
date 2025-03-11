
const dbPromise = indexedDB.open('stories-db', 1);

const StoryDB = {
  saveStory: (story) => {
      const request = indexedDB.open('stories-db', 1);
      request.onsuccess = (event) => {
          const db = event.target.result;
          const tx = db.transaction('stories', 'readwrite');
          const store = tx.objectStore('stories');
          store.put(story);
          console.log('Story saved successfully:', story);
      };
  },
  deleteStory: (id) => {
    const request = indexedDB.open('stories-db', 1);
    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction('stories', 'readwrite');
        const store = tx.objectStore('stories');
        store.delete(id);
        console.log(`Story with ID ${id} deleted!`);
    };
},
  getStories: () => {
      return new Promise((resolve, reject) => {
          const request = indexedDB.open('stories-db', 1);
          request.onsuccess = (event) => {
              const db = event.target.result;
              const tx = db.transaction('stories', 'readonly');
              const store = tx.objectStore('stories');
              const getRequest = store.getAll();

              getRequest.onsuccess = () => resolve(getRequest.result);
              getRequest.onerror = (event) => reject(event.target.error);
          };
      });
  }
};
dbPromise.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('stories')) {
        db.createObjectStore('stories', { keyPath: 'id' });
    }
    console.log('IndexedDB structure created!');
};


dbPromise.onsuccess = (event) => {
    console.log('IndexedDB opened successfully!');
};


dbPromise.onerror = (event) => {
    console.error('Error opening IndexedDB:', event.target.error);
};



