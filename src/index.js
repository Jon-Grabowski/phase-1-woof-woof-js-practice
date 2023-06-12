const filterBtn = document.getElementById('good-dog-filter');
filterBtn.addEventListener('click', (e) => filterDogs(e))

function filterDogs(e) {
    document.getElementById('dog-bar').innerHTML = '';
    if (e.target.innerText === 'Filter good dogs: OFF') {
        e.target.innerText = 'Filter good dogs: ON'
        filteredFetch();
    } else {
        e.target.innerText = 'Filter good dogs: OFF';
        initFetch();
    }
}

function patchDogStatus(dog, boolean) {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            isGoodDog: boolean
        })
    });
};

function changeDogStatus(e, dog) {
    let dogStatus = e.target.innerText;
    if(dogStatus === 'Good Dog!') {
        patchDogStatus(dog, false);
        e.target.innerText = 'Bad Dog!'

    } else if (dogStatus === 'Bad Dog!') {
        patchDogStatus(dog, true);
        e.target.innerText = 'Good Dog!'
    };
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
    pup.addEventListener('click', () => getFeatureDog(onePup));
    dogBar.append(pup);
}

function iteratePups(arrayOfPups) {
    arrayOfPups.forEach(pup => {
        renderDogBar(pup);
    })
}

function filteredFetch() {
    fetch(`http://localhost:3000/pups`)
    .then(res => res.json())
    .then(pupArray => {
        pupArray.forEach(pup => {
            if (pup.isGoodDog === true) {
                renderDogBar(pup);
            }
        });
    })
};

function initFetch() {
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(arrayOfPups => {
            iteratePups(arrayOfPups);
        })
};

function getFeatureDog(dog) {
    fetch(`http://localhost:3000/pups/${dog.id}`)
    .then(res => res.json())
    .then(featureDog => {
        renderDogInfo(featureDog);
    }) 
};

initFetch()