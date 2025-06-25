document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const loader = document.getElementById("loader");
    // return true or false based on regex creating a function to check entered username is correct or not
    function validateUsername(username){
        if(username.trim()==""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }


    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            loader.classList.remove("hidden");
            searchButton.textContent = "searching .....";
            searchButton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error(" Unable to fetch user details")
            }

            const data = await response.json();
            console.log("login data   " , data);

            displayUserData(data);
        }

        catch(error){
            statsContainer.innerHTML = `<p> No Data Found </p>`

        }
        finally {
            loader.classList.add("hidden");
            searchButton.textContent = "search";
            searchButton.disabled = false;

        }
    }


    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%` );
        label.textContent = `${solved}/${total}`;


    }

    function displayUserData(data) {
        const totalQues = data.totalQuestions;
        const totalEasyQues = data.totalEasy;
        const totalHardQues = data.totalHard;
        const totalMediumQues = data.totalMedium;


        const totalSolvedQues = data.totalSolved;
        const totalEasySolvedQues = data.easySolved;
        const totalMediumSolvedQues = data.mediumSolved;
        const totalHardSolvedQues = data.hardSolved;

        updateProgress(totalEasySolvedQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(totalMediumSolvedQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(totalHardSolvedQues, totalHardQues, hardLabel, hardProgressCircle);




    }


    searchButton.addEventListener('click',function(){
        const username = usernameInput.value;
        console.log("log in username:" , username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }



    })

})

































