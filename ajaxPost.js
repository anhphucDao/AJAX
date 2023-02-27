//HTTP POST

function firstExecution ( callBackAsSecondExecutor ) {

let request = new XMLHttpRequest ();
 
const newUser = {
    firstName: 'John',
    lastName: 'Doe',
    occupy: 'Software Engineer'
}

const getApi = 'https://reqres.in/api/users';
request.open('POST', getApi, true);

request.setRequestHeader('Content-type', 'application/json');


 request.addEventListener('load', postUserData)

 function postUserData() {
    if (request.status == 201 && request.readyState == 4)
    {
        console.log(JSON.parse(request.responseText));
    }

    else throw new Error ("Bad request");
 }


 request.send(JSON.stringify(newUser));

 //HTTP PUT

 const putApi = 'https://reqres.in/api/users/2';

 const updateUser = {
    firstName: 'John',
    lastName: 'Doe',
    occupy: 'pilot'
 }

 let req = new XMLHttpRequest();

 req.open('PUT', putApi, true);

 req.setRequestHeader('Content-type', 'application/json');
 
 
 req.addEventListener('load', putUserData)
 
  function putUserData() {
     if (req.status == 200 && req.readyState == 4)
     {
         console.log(JSON.parse(req.responseText));
     }
 
     else throw new Error ("Bad request");
  }

req.send(JSON.stringify(updateUser));


callBackAsSecondExecutor();

}





//HTTP  DELETE
function lastExecution () {

const deleteApi = 'https://reqres.in/api/users/2'

let deleteUser = new XMLHttpRequest();

deleteUser.open('DELETE',deleteApi,true )

deleteUser.addEventListener('load', deleteData)
 
  function deleteData() {
     if (deleteUser.status == 204 && deleteUser.readyState == 4)
     {
         console.log("Delete user data successfully!");
     }
 
     else throw new Error ("Bad request");
  }


deleteUser.send()
}

firstExecution(lastExecution());


