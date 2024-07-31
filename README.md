1.In the Root Component (App.jsx) i have written all the logic for add,edit,delete,update and cancel buttons.

2.If user clicks on add button without typing anything in the input field a toast message will be displayed. i have used "react-hot-toast" for sending toast messages.

3.If user enters their todo and click on "add" button a post request will be made to this backend route
"http://localhost:5000/tasks" and this route will get the data entered by user and stores that data to "mongodb atlas" database.

4.If user clicks on "edit" button "updateTask" function will be called and it is responsible for updating the existing todo. If user changes the existing todo and clicks on "update" button a put request will be made to this route "http://localhost:5000/tasks/${id}" here "id" is the path parameter which is unique for every todo.

5. If user clicks on "delete" button a delete request will be made to this route "http://localhost:5000/tasks/${id}" here "id" is the path parameter which is unique for every todo.