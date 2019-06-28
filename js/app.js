var mainObj;
var repos;

function slicedate(thedate) {
    return thedate.slice(0, 10)
}

function userLookup() {
    user = document.querySelector('#search').value;
    genDetails(user);
}

function genDetails(user) {

    url = 'https://api.github.com/users/'
    console.log(url + user);
    fetch(url + user)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    mainObj = data;
                    console.log(mainObj.avatar_url);
                    var detailsCard = `<div class="details" id="details">
            <div class="details-header flex-row">
                <img src=` + mainObj.avatar_url + ` alt="usr-img"
                    class="details-header--img">
                <div class="details-header--text flex-col">
                    <div class="details-header--text__name flex-row">
                        <span> name:</span>` +
                        mainObj.name + `<a href=` + mainObj.html_url + ` target="_blank" rel="noopener noreferrer"> <i>
                                ` + mainObj.html_url.slice(8) + `</i> </a>
            
                    </div>
                    <div class="creation flex-row">
                        <div class="created"> <span> created on:</span>` + mainObj.created_at.slice(0, 10) + ` </div>
                        <div class="updated"> <span> last update on:</span>` + mainObj.updated_at.slice(0, 10) + ` </div>
                    </div>
                    <div class="creation flex-row">
                        <div class="created"> <span>COMPANY:</span>` + mainObj.company + `</div>
                        <div class="updated"> <span> LOCATION:</span>` + mainObj.location + `</div>
                    </div>
                </div>
            </div>
            <div class="details-bio">
                <h3><span>bio</span></h3>
                ` + mainObj.bio + `
            </div>
            <div class="details-repos">
                        <h3 class="flex-row" id='repo-header'><span>repos</span>
                        </h3>
                        <div class="repos--list flex-row">
                           
                        </div>
                    </div>`;
                    document.getElementById('details').innerHTML = detailsCard;

                    fetch(url + user + '/repos')
                        .then(
                            function (response) {
                                if (response.status !== 200) {
                                    console.log('Looks like there was a problem. Status Code: ' +
                                        response.status);
                                    return;
                                }

                                // Examine the text in the response
                                response.json().then(function (data) {
                                    console.log(data);
                                    repos = data;
                                    document.querySelector("#repo-header").innerHTML += `<p class="count"><span>Count:</span>` + repos.length + `</p>`
                                    document.querySelector(".repos--list").innerHTML = ''
                                    // console.log(document.querySelector(".repos--list"));
                                    repos.forEach(function (repo) {
                                        document.querySelector(".repos--list").innerHTML += `<div class="repo">
                                        <a href=` + repo.html_url + ` target="_blank" rel="noopener noreferrer">
                                           ` + repo.name + `</a>
                                        <div class="flex-row">
                                            <p class="created"><span>Created on</span> ` + slicedate(repo.created_at) + `</p>
                                            <p class="owner"><span>owner</span> ` + repo.owner.login + `</p>
                                        </div`;
                                    });
                                })
                            }
                        )


                });


            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}


// fetch('https://api.github.com/users/aijaa/repos')
//     .then(
//         function (response) {
//             if (response.status !== 200) {
//                 console.log('Looks like there was a problem. Status Code: ' +
//                     response.status);
//                 return;
//             }

//             // Examine the text in the response
//             response.json().then(function (data) {
//                 console.log(data);

//             });
//         })