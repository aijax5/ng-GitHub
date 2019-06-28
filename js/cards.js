// url = 'https://api.github.com/users';
// var users;
function getCards() {
    document.querySelector(".loading").style.display='flex';
    fetch("https://api.github.com/users")

        .then(
            function (response) {
                document.querySelector(".loading").style.display='none';
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (users) {
                    // document.querySelector('.usr-cont').innerHTML="";
                    users.forEach(user => {
                        document.querySelector('.usr-cont').innerHTML+=`<div class="user-card flex-col">
                        <div class="flex-row">
                            <img src=`+user.avatar_url+` alt="image"
                                class="user-card--img">
                            <div class="flex-col">
                                <div class="user-card--name"><span>name : </span>`+user.login+`</div>
                                <div class="user-card--bio "><span>Github Link : </span>
                                    <a href="#" target="_blank" rel="noopener noreferrer"><i>`+user.html_url.slice(8)+`</i></a><a href="#" id='card-1' onclick="genDetails('`+user.login+`')">Read more..</a>
                                </div>
                            </div>
                        </div>
                    </div>`

                    });
                  
                })
            }

        )
}
getCards();