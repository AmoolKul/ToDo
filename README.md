## TODO API ENDPOINTS
---

- *GET ALL TODO*
    - ENDPOINT : `/`
    - METHOD:    `GET`

    Sample Response: 

    
        [
            {
                "id": "bbb5e7c3-247e-4e42-a4f2-f8ecdb9fe2dc",
                "name": "ANiket231",
                "description": "ARK231",
                "createdAt": 1677256426187,
                "updatedAt": 1677258988959,
                "reminderDate": "16772548358510",
                "completed": true
            },
            {
                "id": "13dc873f-ec60-48e6-9b90-01e007933460",
                "name": "hello",
                "description": "hello",
                "createdAt": 1677259705448,
                "updatedAt": 1677259705448,
                "reminderDate": "1677254835228510",
                "completed": false
            }
    ]
    
---

- *CREATE NEW TODO*
    - ENDPOINT : `/create`
    - METHOD:    `POST`

    - PARAMETERS REQUIRED:
        
            name: {Name of Todo}
            description: {Description of Todo},
            reminderDate: {Reminder Date for Todo},
        

    Sample Response: 
        
            200 OK
            "New note Created"
        
---

- *EDIT TASK*
    - ENDPOINT : `/edit`
    - METHOD:    `PUT`

    - PARAMETERS REQUIRED:
        
            name: {Name of Todo}
            description: {Description of Todo},
            reminderDate: {Reminder Date for Todo},
            completed: {Boolean}
        

    Sample Response: 
        
            200 OK
            "Note Updated"
        
---


- *DELETE TASK*
    - ENDPOINT : `/delete`
    - METHOD:    `DELETE`

    - PARAMETERS REQUIRED:
        
            id: {ID of Exisiting Task}
        

    Sample Response: 
        
            200 OK
            "Note Deleted"
        

---

*SAMPLE ERROR MESSAGE*

- STATUS CODE: `500`

    "Something went wrong. Try again Later"
