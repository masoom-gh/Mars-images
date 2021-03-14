const API_KEY = config.API_KEY;
const url = "https://api.nasa.gov/planetary/apod?api_key=";
const roversUri = "api/rovers"




const LoadMainPageCarousel = async () => {
    try {
        document.querySelector("#main-page").innerHTML = "";
        const response = await fetch("./MainPageContent.html");
        const data = await response.text();
        document.querySelector("#main-page").innerHTML = data;
    } catch (e) {
        console.log(e, "Unable to load partial html.");
    } 
    
}


const getRovers = async () => {
    try {
        const response = await fetch(roversUri);
        const data = await response.json();

        document.getElementById("rovers").innerHTML = data.map(rover =>
                `<div class="col-sm rover id="${rover.roverId}"><button class="btn" onclick="LoadRoverPage(${rover.roverId})"><h1>${rover.roverName}</h1></button></div>`)
            .join("");
        document.querySelector(".dropdown-menu").innerHTML = data.map(rover =>
            `<a class="dropdown-item" onclick="LoadRoverPage(${rover.roverId})">${rover.roverName}</a>`).join("");
    } catch (error) {
        console.log("Unable to get the data", error);
    }
}


const LoadMainPage = async () => {
    await LoadMainPageCarousel();
    getRovers();
}

LoadMainPage();

const logoLink = document.querySelector("#logo-link");
logoLink.addEventListener("click", LoadMainPage());

const homeLink = document.querySelector("#home-link");
homeLink.addEventListener("click", LoadMainPage());

const memberPage = document.querySelector("#member-page");
memberPage.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const mainPageDiv = document.getElementById("main-page");
        mainPageDiv.innerHTML = "";
        mainPageDiv.innerHTML = `
        <div class="row justify-content-center" >
            <div class="card" id="membership-div">
                <div class="card-body" >
                <h4>Vill du bli <i>medlem</i>?</h4>
                <p>Det är enkelt, nå oss på:</p>
                <h5>070000000</h5>
                </div>
            </div>
        </div>`;
    } catch (error) {
        console.log(error, "There was a problem with loading the membership page.");
    }
});


const LoadRoverPage = async (id) => {
    try {
        const response = await fetch(`${roversUri}/${id}`);
        const data = await response.json();
        CreateContentOfRoverPage(data);
    } catch (error) {
        console.log("Unable to get the data", error);
    }
}


const CreateDescriptionCard = (data) => {
    return `<div class="card" id="rover-info">
        <div class="card-body" >
        <h1>${data.roverName}</h1>
        <img src="../images/${data.roverName}.png" id="rover-image" />
        <p>${data.roverName} lanserades ${data.launchDate.split('T')[0]} från jorden och landade på Mars ${data
        .landingDate.split('T')[0]}. 
        Det har tagit ${data.totalPhotos} från Mars. ${RoverStatus(data)}
        <h6>Läs mer <a href=${data.url} target="_blank">här</a></h6>
        </div>
        </div>`;
}




const CreateDatePickerAndRandomPhotoLoaderButton =  (data) => {
    return `
        <div class="card" id="date-div">
        <div class="card-body" >
        <h6>Välj ett datum och klicka för att se bilderna tagna den dagen av ${data.roverName}:</h6>
        <input id="date" type="date">
          <button  class="btn btn-info" onclick="LoadPhotosFromSelectedDate('${data.roverName}','${data.camera}')">Välj</button>
        
        <div class="card-body" >
        <h6>Eller klicka här för att ladda foton från en random dag i mars (sol):</h6>
          <button class="btn btn-info" onclick="ShowImagesFromRandomSol('${data.roverName}','${data.camera}',${data.maxSol})">Ladda foton från en random sol</button>
        </div>
        </div>
        </div>`; 
}




const ShowMostRecentImages = async (data) => {
    try {
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${data.roverName}/photos?sol=${data.maxSol}&camera=${data.camera}&api_key=${API_KEY}`;
        const response = await fetch(url);
        const imageData = await response.json();

        const imageArray = imageData.photos.map(photo =>
            `<img class="images" loading="lazy" src=${photo.img_src} />`
        ).join("");

        return `
        <div class="card" id="rover-images">
        <div class="card-body" >
        <h4>Senaste bilder tagna av ${data.roverName}</h4>

        ${imageArray}

        </div>
        </div>`;
    } catch (e) {
        console.log(e, "There was a problem with loading most recent photos.")
    } 
    
}

const ShowImagesFromRandomSol = async (roverName, roverCamera, maxSol) => {
    try {
        let emptyImageArray = true;
        let imgData = [];
        let rndSol;

        while (emptyImageArray) {
            let randomSol = Math.floor(Math.random() * maxSol);
            const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${randomSol}&camera=${roverCamera}&api_key=${API_KEY}`;
            const response = await fetch(url);
            const imageData = await response.json();

            if (imageData.photos.length !== 0) {
                emptyImageArray = false;
                imgData = imageData;
                rndSol = randomSol;
            }
        }

        const imageArray = imgData.photos.map(photo =>
            `<img class="images" loading="lazy" src=${photo.img_src} />`
        ).join("");

        const imagesCard = document.getElementById("rover-images");
        imagesCard.innerHTML = "";
        imagesCard.innerHTML = `
        <div class="card-body" >
        <h4>Bilder från sol ${rndSol}</h4>

        ${imageArray}

        </div>`;
    } catch (e) {
        console.log(e, "There was a problem with loading photos from a random sol.");
    } 
    
}

const LoadPhotosFromSelectedDate = async (roverName,roverCamera) => {
    try {
        const date = document.querySelector("#date").value;
        console.log(date);

        if (date == null) {
            const imagesCard = document.getElementById("rover-images");
            imagesCard.innerHTML = "";
            imagesCard.innerHTML = `
                <div class="card-body" >
                <h5 style="color:red;">Välj en annan dag.</h5>
                </div>`;
        }

        const formattedDate = document.querySelector("#date").value.split("T")[0];

        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?camera=${roverCamera}&earth_date=${formattedDate}&api_key=${API_KEY}`;

        const response = await fetch(url);
        const imageData = await response.json();

        if (imageData.photos.length === 0) {
            const imagesCard = document.getElementById("rover-images");
            imagesCard.innerHTML = "";
            imagesCard.innerHTML = `
                <div class="card-body" >
                <h5 style="color:red;">Inga foton togs på ${formattedDate
                }. Välj en annan dag.</h5>
                </div>`;
        } else {
            const imageArray = imageData.photos.map(photo =>
                `<img class="images" loading="lazy" src=${photo.img_src} />`
            ).join("");

            const imagesCard = document.getElementById("rover-images");
            imagesCard.innerHTML = "";
            imagesCard.innerHTML = `
                <div class="card-body" >
                <h4>Bilder tagna på ${formattedDate} med ${roverCamera} kamera</h4 >

        ${imageArray}

        </div>`;
        }

    } catch (e)
        {
            console.log(e, "There was a problem with loading photos taken on the selected date.");
        }
    }
    

const CreateContentOfRoverPage = async (data) => {
    try {
        const mainPageDiv = document.getElementById("main-page");
        mainPageDiv.innerHTML = `
        <div class="row justify-content-center" >

        ${CreateDescriptionCard(data)}

        ${await CreateDatePickerAndRandomPhotoLoaderButton(data)}

        ${await ShowMostRecentImages(data)}

        </div>`;
    } catch (error) {
        console.log(error);
    }
    
}

const RoverStatus = (data) => {
    if (data.status == "complete") {
        return `It finished its mission on ${data.maxDate.split('T')[0]}`;
    } else {
        return `It is still active on Mars.`;
    }
}



