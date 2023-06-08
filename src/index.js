function changeDogStatus(e, dog) {
    let dogStatus = e.target.innerText;
    if(dogStatus === 'Good Dog!') {
        e.target.innerText = 'Bad Dog!'
    } else if (dogStatus === 'Bad Dog!') {
        e.target.innerText = 'Good Dog!'
    };
    console.log(e.target);
    console.log(dog);
}

function renderDogInfo(dog) {
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerHTML = '';
    const dogImg = document.createElement('img');
    dogImg.src = dog.image;
    dogImg.alt = dog.name;
    const dogName = document.createElement('h2');
    dogName.innerText = dog.name;
    const dogBtn = document.createElement('button');
    if (dog.isGoodDog === true) {
        dogBtn.innerText = 'Good Dog!';
    }else if (dog.isGoodDog === false) {
        dogBtn.innerText = 'Bad Dog!';
    };
    dogBtn.addEventListener('click', (e) => changeDogStatus(e, dog));
    dogInfo.append(dogImg, dogName, dogBtn);
};

function renderDogBar(onePup) {
    const dogBar = document.getElementById('dog-bar');
    const pup = document.createElement('span');
    pup.innerText = onePup.name;
    pup.addEventListener('click', () => renderDogInfo(onePup));
    dogBar.append(pup);
}

function iteratePups(arrayOfPups) {
    arrayOfPups.forEach(pup => {
        renderDogBar(pup);
    })
}

fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(arrayOfPups => {
        iteratePups(arrayOfPups);
    })