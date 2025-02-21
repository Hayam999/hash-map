import LinkedList from "linked-list";
class HashMap {
  constructor() {
    this.buckets = new Array(this.capacity);
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.size = 0;
  }
  // turn given key into a hash
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + (key.charCodeAt(i) % this.capacity);
    }

    return hashCode;
  }

  set(key, value) {
    const newHash = this.hash(key);
    let entry = this.buckets[newHash];
    if (!entry) {
      // check whether to grow capacity
      const result = this.capacity * this.loadFactor;
      if (result < this.size) {
        this.capacity = 2 * this.capacity;
      }
      // add entry to buckets
      entry = [key, value];
      this.size += 1;
    } else {
      if (entry.key == key) {
        entry.value = value;
      } else {
        if (entry instanceof LinkedList) {
          entry.append([key, value]);
        } else {
          let newLinkedList = new LinkedList();
          newLinkedList.append(entry).append([key, value]);
        }
      }
    }
  }
  get(key) {
    // return value of key
    let hashKey = this.hash(key);
    let element = this.buckets[hashKey];
    if (element) {
      if (element instanceof LinkedList) {
        for (let i = 0; i <= element.size; i++) {
          let currentNode = element.at(i);
          if (currentNode.key === key) {
            return currentNode.value;
          }
        }
      } else {
        return element.value;
      }
    }
  }
  has(key) {
    // return true if the key is in the hash map, false otherwise
    const hashKey = this.hash(key);
    const element = this.buckets[hashKey];
    if (element) {
      if (element instanceof LinkedList) {
        for (let i = 0; i <= element.size; i++) {
          let currentNode = element.at(i);
          if (currentNode.key === key) {
            return true;
          }
        }
        return false;
      } else {
        return element.key === key;
      }
    }
  }
  remove(key) {
    // if the key is in hashMap remove the entry with that key and return true, else just return false
    const hashKey = this.hash(key);
    const element = this.buckets[hashKey];
    if (element) {
      if (element instanceof LinkedList) {
        for (let i = 0; i <= element.size; i++) {
          let currentNode = element.at(i);
          if (currentNode.key === key) {
            element.removeAt(i);
          }
        }
      } else if (element.key === key) {
        this.buckets.splice(hashKey, 1);
      }
    }
  }
  length() {
    let sum = 0;
    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i] instanceof LinkedList) {
        sum += this.buckets[i].size;
      }
      sum += 1;
    }
    return sum;
  }
  clear() {
    // remove all entries in the buckets
    // update the loadFactor and capacity
    this.buckets = new Array(this.capacity);
  }
  keys() {
    // return an array contains all keys inside the buckets
    let keysArray = [];
    for (let element of this.buckets) {
      if (element instanceof LinkedList) {
        for (let i = 0; i < element.size; i++) {
          keysArray += element.at(i).key;
        }
      } else {
        keysArray += element.key;
      }
    }
    return keysArray;
  }
  vlaues() {
    // returns an array containing all values
    let valuesArray = [];
    for (let element of this.buckets) {
      if (element instanceof LinkedList) {
        for (let i = 0; i < element.size; i++) {
          valuesArray += element.at(i).value;
        }
      } else {
        valuesArray += element.value;
      }
    }
    return valuesArray;
  }
  entries() {
    let entries = [];
    for (let element of this.buckets) {
      if (element instanceof LinkedList) {
        for (let i = 0; i < element.size; i++) {
          entries += element.at(i);
        }
      } else {
        entries += element;
      }
    }
    return entries;
  }
}

export { HashMap };
