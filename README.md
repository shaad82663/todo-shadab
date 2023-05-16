# TODO

## DATABASE

### TABLE-1 : Task 
     Schema : {name,description,progress,taskID} //All not null
     Primary Key : _id (auto generated)
     Index key(s) : taskID
     Methods/Functions : none
     

## REST API

The REST API used in the code is described below.

### Add a task in todo

#### Request

`POST /todo/add`

      http://localhost:3000/todo/add

##### Sample Request (JSON)
  
    {
    "name" : "NodeJs",
    "description" : "This is description.",
    "progress" : "not started",
    "taskID" : "A001"
    }
    
#### Response
  
    HTTP/1.1 200 OK
    success,
    message,
    task
    
### Add batch of tasks in todo

#### Request

`POST /todo/add-all`

     http://localhost:3000/todo/add-all

#### Sample Request (JSON)
  
    {
       "tasks" : [task1, task2,...]
    }
    
#### Response
  
    HTTP/1.1 200 OK
    success,
    message,
    addedTasks 
    
### Get a task by id

#### Request

`GET /todo/get:id`

     http://localhost:3000/todo/get/A001

#### Sample Request (JSON)
  
    {}
    
#### Response
  
    HTTP/1.1 200 OK
    success,
    message,
    task
    
### Get all tasks

#### Request

`GET /api/v1/todo/get-all`

     http://localhost:3000/todo/get-all


#### Sample Request (JSON)

   {}

#### Response
  
        HTTP/1.1 200 OK
        success
        count
        tasks
        
    
### Update task by id

#### Request

`PUT /todo/update:id`

     http://localhost:3000/todo/update/A001
     
#### Sample Request (JSON) 
  
    {"name" : "new named task"}      

#### Response
  
        HTTP/1.1 200 OK
        success,
        message,
        updatedTask
         
### Delete task by id  

#### Request

`Delete /todo/delete:id`

     http://localhost:3000/todo/delete/A001

#### Sample Request (JSON)
  
    {} 

#### Response
  
         HTTP/1.1 200 OK
         success : true,
         message                 
         
### Delete all tasks in todo

#### Request

`DELETE /todo/delete-all`

     http://localhost:3000/todo/delete-all
     
#### Sample Request (JSON)
  
    {} 

#### Response
  
         HTTP/1.1 200 OK
         success,
         message      
         
## Installation

```sh
cd <foler path>
npm install
```
