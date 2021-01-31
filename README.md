## Issue

After running the app, open the console to see the loaded data. It should print two arrays of tasks, the first one is empty which is the unsolved issue.

I am using the `tunguska:reactive-aggregate` to join the task collection and Meteor users, but it always returns an empty array. I also tried `publsihComposite` but it turned out the same.

Codes of publications and collections are in `App.tsx`. I suspect that something is wrong within the `useTracker` function but I have no clue. Most of the example codes are not written in React, especially with the `useTracker` hook.

### What I have:

```json
// Users
[
    {
        "_id": "DCPsPe3ohW4uMf9JN",
        "username": "user1",
        "profile": {
            "nickname": "User 1"
        },
    }
    {
        "_id": "38hZfK5GznDQYCXfH",
        "username": "user2",
        "profile": {
            "nickname": "User 2"
        }
    }
]

// Tasks
[
    {
        "_id": "2CmYbey6ohNAW93Pd",
        "text": "Task 1 of User 1",
        "userId": "DCPsPe3ohW4uMf9JN",
        "createdAt": {
            "$date": "2021-01-31T04:44:02.217Z"
        },
        "isChecked": true
    },
    {
        "_id": "NXGako2b9u3Csn9Eo",
        "text": "Task 2 of User 2",
        "userId": "38hZfK5GznDQYCXfH",
        "createdAt": {
            "$date": "2021-01-31T04:44:02.217Z"
        },
        "isChecked": true
    }
]

```

### What I want:

```json
[
  {
    "_id": "2CmYbey6ohNAW93Pd",
    "text": "Task 1 of User 1",
    "userId": "DCPsPe3ohW4uMf9JN",
    "createdAt": {
      "$date": "2021-01-31T04:44:02.217Z"
    },
    "isChecked": true,
    // I want this user profile
    "profile": {
      "nickname": "User 1"
    }
  },
  {
    "_id": "NXGako2b9u3Csn9Eo",
    "text": "Task 2 of User 2",
    "userId": "38hZfK5GznDQYCXfH",
    "createdAt": {
      "$date": "2021-01-31T04:44:02.217Z"
    },
    "isChecked": true,
    // I want this user profile
    "profile": {
      "nickname": "User 2"
    }
  }
]
```

How to achieve this?
