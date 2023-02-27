 //readyState Values

    //0: request not initialized
    //1: server connection established
    //2: request received
    //3: processing request
    //4: request finished and response is ready

//HTTP statuses
    //200: "OK"
    //403: "Forbidden"
    //404: "Not found"

    const githubApi = 'https://api.github.com/users';

    let targetDiv = document.getElementsByClassName('buttonSection');

    let buttonGet = document.getElementById('btn');

    buttonGet.addEventListener('click', getUser );

    function getUser () {
        
        // targetDiv.style.display ='none';
            //hide button

            buttonGet.style.display = 'none';

            

        let userList = new XMLHttpRequest;

        userList.open('GET', githubApi, true)


        userList.onload = () => {
        
            if (this.status == 200) 
            
            {
                document.getElementByID('text').innerHTML = this.responseText;
            }

            let listOfUsers = JSON.parse(userList.responseText);

            console.log(listOfUsers);
            

            let output = ' ';
            for (let i in listOfUsers)
            {
                output += 
                `<div class = "user">
                <img src = "${listOfUsers[i].avatar_url} width ="160" height = "160">
                <ul class ="userInfo"> 
                <li>ID: ${listOfUsers[i].id} </li>
                <li>Name: ${listOfUsers[i].login} </li>
                </ul>
                </div>`
            }

            document.getElementById('text').innerHTML = output;
        

            
        }

        

        

        userList.send();
    }


