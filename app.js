const audio = document.querySelector('audio'),
    btnPlay = document.querySelector('.btn-big'),
    btnNext = document.querySelector('.next'),
    btnPrev = document.querySelector('.prev'),
    container = document.querySelector('.container'),
    cover = document.querySelector('.cover'),
    title = document.querySelector('.title'),
    start = document.querySelector('#start'),
    end = document.querySelector('#end'),
    progressSong = document.querySelector('.progress'),
    mute = document.querySelector('#mute'),
    volume = document.querySelector('#volume'),
    songs = [
        'Billie Eilish - Goldwing',
        'FreeFlowFlava - 014',
        'Izzamusic - Shootout',
        'Konsta - Astrum'
    ];

let songIndex = 0;

document.body.style.backgroundImage = `url('./album/${songs[songIndex]}BG.jpg')`
title.textContent = songs[songIndex]


btnPlay.addEventListener('click', (e) => {
    audio.src = `./musics/${songs[songIndex]}.mp3`
    const isPlay = container.classList.contains('play')
    if (isPlay) {
        pause()
    } else {
        play()
    }

})


btnNext.addEventListener('click', (e) => {
    nextSong()
})

audio.addEventListener('timeupdate', (e) => {
    let percent = Math.trunc(audio.currentTime);
    progressSong.value = percent;

    let duration = audio.duration
    let current = Math.trunc(audio.currentTime)

    let endM = Math.trunc(duration / 60)
    let endS = Math.trunc(duration - endM * 60)
    endS = endS < 10 ? "0" + endS : endS;
    endM = endM < 10 ? "0" + endM : endM;
    end.textContent = `${endM}:${endS}`


    var startM = Math.floor(audio.currentTime / 60);
    var startS = Math.floor(audio.currentTime % 60);
    startS = startS < 10 ? "0" + startS : startS;
    startM = startM < 10 ? "0" + startM : startM;
    start.textContent = `${startM}:${startS}`

    if (percent == Math.trunc(audio.duration)) {
        nextSong()
    }


})

progressSong.addEventListener('input', (e) => {
    e.target.max = Math.trunc(audio.duration);
    audio.currentTime = e.target.value
    progressSong.value = Math.trunc(audio.currentTime)
})

btnPrev.addEventListener('click', (e) => {
    prevSong()
})

mute.addEventListener('click', muteVolume);

volume.addEventListener('input', (e) => {
    audio.volume = e.target.value / 10
    if (e.target.value == 0) {
        mute.innerHTML = `<i id="volumez-icon" class="fa-solid fa-volume-xmark"></i>`
    } else {
        mute.innerHTML = `<i id="volumez-icon" class="fa-solid fa-volume-high"></i>`

    }
});


// Functions
function play() {
    audio.play()
    container.classList.add('play')
    btnPlay.innerHTML = `<i class="fas fa-pause"></i>`
}

function pause() {
    audio.pause()
    container.classList.remove('play')
    btnPlay.innerHTML = `<i class="fas fa-play"></i>`
    let percent = audio.currentTime / audio.duration * 100;
}

function updateSong() {
    document.body.style.backgroundImage = `url('./album/${songs[songIndex]}BG.jpg')`
    audio.src = `./musics/${songs[songIndex]}.mp3`

    if (container.classList.contains('play')) {
        play()
    }
    title.textContent = songs[songIndex]
    cover.src = `./album/${songs[songIndex]}.jpg`
    title.classList.toggle('animate__backInDown')
    setTimeout(() => {
        title.classList.toggle('animate__backInDown')
    }, 1000)
}
function nextSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    updateSong()
}
function prevSong() {
    songIndex++
    if (songIndex == songs.length) {
        songIndex = 0
    }
    updateSong()

}
function muteVolume() {
    const ch = document.querySelector('#volumez-icon')
    if (audio.volume > 0) {
        mute.innerHTML = `<i id="volumez-icon" class="fa-solid fa-volume-xmark"></i>`
        audio.volume = 0
    } else {
        mute.innerHTML = `<i id="volumez-icon" class="fa-solid fas fa-volume-high"></i>`
        audio.volume = volume.value / 1
    }
}