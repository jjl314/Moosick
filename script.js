const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['Armand Van Helden - My My My (DJ KUBA & NEITAN Remix)',
'Bassjackers ft. Luciana - Fireflies (Official Music Video)',
'Catiso - Zanobi',
'Cazzette - Blind Heart (Broiler Remix)',
'David Guetta, Martin Garrix & Brooks - Like I Do (Lyric Video)',
'Dax - !Homicide! Freestyle [One Take Video]',
'Doja Cat - Boss B!tch (from Birds of Prey! The Album) [Official Music Video]',
'Dropgun - Drought ft. Nevve (Official Audio)',
'Dropgun - Tomorrow Never Comes (feat. Bryan Finlay)',
'Every Little Thing (Bazzflow Remix Radio)',
"Florian Picasso - Final Call (Mesto & Justin Mylo Remix)",
'Jay Eskar - Awakening',
'Jay Eskar - Chakra',
'Logic - Everybody (Lyrics)',
'Masked Wolf - Astronaut In The Ocean (Ozlig Remix)',
'Metrik - Gravity',
'Mike Williams - Konnichiwa (Original Mix)',
'MR BLACK & Offer Nissim - Mucho Bien (MR.BLACK Remix)',
'Netsky - Rio',
'NF - When I Grow Up',
'Phoebe Ryan - Mine (Elephante Remix)',
'Queen Of A Lonely Heart (feat. Lourdiz) (Dastic x Robbie Mendez Club Mix)',
'RIVERO & Triangle - WICKD (feat. Dean) [Official Audio]',
'RYLLZ - I Gotta Know',
'SHAHMEN - MARK (EMR3YGUL Remix)',
'Shahmen - Mark',
'SHAHMEN - MARK EMR3YGUL Remix INFINITY BASS',
'Steve Aoki - Back to Earth feat. Fall Out Boy (LA Riots Remix)',
"The Black Eyed Peas - Let's Get It Started (Galwaro Remix)",
'Timmy Trumpet Freaks (Radio Edit)',
'Tupac  - Changes (Dax Remix) [One Take]',
'WATEVA - Ber Zer Ker (Rob Gasser Remix) [NCS Release]'
];

shuffle(songs);

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

//randomize array elements function
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/workout.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	}

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){

			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	}

	// define seconds duration

	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;

};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
