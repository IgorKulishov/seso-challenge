"use strict";

class Node {
  constructor(logsArrayIndex, timestamp) {
    this.logsArrayIndex = logsArrayIndex;
    this.timestamp = timestamp;
    this.next = null;
  }
}

class LogsList {
  constructor() {
    this.head = null;
    this.end = null;
    this.length = 0;
  }
  push(logsArrayIndex, timestamp) {
    const newNode = new Node(logsArrayIndex, timestamp);
    if(!this.head) {
      this.head = newNode;
      this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = newNode;
    }
    this.length++;
    return this;
  }
  shift() {
    if(!this.head) return undefined;
    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if(this.length === 0) {
      this.end = null;
    }
    return currentHead;
  }
  unshift(logsArrayIndex, timestamp) {
    const newNode = new Node(logsArrayIndex, timestamp);
    if(!this.head) {
      this.head = newNode;
      this.end = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  insert(logsArrayIndex, timestamp) {
    if(this.length === 0) {
      return this.unshift(logsArrayIndex, timestamp);
    } else if(this.length > 0 && this.head.timestamp > timestamp) {
      return this.unshift(logsArrayIndex, timestamp);
    }
    const newNode = new Node(logsArrayIndex, timestamp);
    const previousNode = this.getPreviousNode(timestamp);
    let nextOfPrev = previousNode.next;
    previousNode.next = newNode;
    newNode.next = nextOfPrev;
    this.length++;
    return newNode;
  }
  getPreviousNode(timestamp) {
    let current = this.head;
    while(current && current.next && timestamp > current.timestamp) {
      const nextTimestamp = current.next.timestamp;
      if(timestamp < nextTimestamp) {
        break;
      } else {
        current = current.next;
      }
    }
    return current;
  }
}

module.exports = {
  LogsList
}
