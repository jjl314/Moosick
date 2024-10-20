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
const songs = ['44phantom - freak (Official Video)',
'93FEETOFSMOKE - conversations (official video)',
'A Day To Remember - All Signs Point To Lauderdale (Official Audio)',
'A Day To Remember - Re-Entry (Official Audio)',
'Against the Current - Weapon (Lyrics)',
'All Time Low - Sleepwalking (Lyrics)',
'American Teeth - Tongue (Official Music Video)',
'Aries - KIDS ON MOLLY (Lyrics)',
'Arrows in Action - Put You Through Me (Official Music Video)',
'Arrows in Action - The Credits (feat. Loveless & Magnolia Park) [OFFICIAL MUSIC VIDEO]',
"Blue Water Blue Sky (Guilty Gear XX Cover) on guitar [Versus Video Games 3 - 2015 Mix]",
'Boys Like Girls - The Great Escape',
'Breathe Carolina & Streex - Up All Night (Original Mix)',
'Broadside - Foolish Believer (Lyrics)',
'CVBZ - Love Better',
'Charlie Puth - Light Switch [Official Music Video]',
'Chri$tian Gate$ - NUMB (Official Lyric Video)',
'Coldfront Float Around',
'Dearly Departed (Acoustic)',
'Fall Out Boy - Alone Together',
'Fall Out Boy - Heartbreak Feels So Good (Audio)',
'Fall Out Boy - The Phoenix (Lyrics)',
'Featherweight',
'First and Forever - CHICAGO (Lyric Video)',
'First and Forever - In Loving Memory',
'Gold Route - Happier (Music Video)',
'Grayscale - Forever Yours',
'JVKE - moon and back (Lyrics)',
'Just so You Know',
"Knox - Sneakers (Official Audio)",
'Knuckle Puck - Want Me Around',
'Livingston - Fairytale (Lyric Video)',
'Loveless Heart-Shaped Soul (Official Music Video)',
'Marshmello - Silence (Lyrics) ft. Khalid',
'Mr. Brightside HQ (The Killers)',
'Neck Deep - December (Full Band Version)',
'Neck Deep - Gold Steps',
'Neck Deep - Serpents (Official Music Video)',
'Oh, Weatherly - Chasing California (Visual)',
'Oh, Weatherly - Here Tonight',
'Open Water',
'RILEY - SUMMERTIME (feat. lil aaron) [Official Audio Stream]',
'RYYZN - MIND FxCK [Official Lyric Video]'
'Red Light Kisser (with Jordan Pundik of New Found Glory)',
'Rex Orange County - Sunflower (Official Audio)',
'See You Around (Lyrics)',
'Silverstein - The Afterglow (Official Music Video)',
'Simple Creatures - Adrenaline (Audio)',
'Sleep On It Fireworks (ft. Derek Discanio)',
'Stand Atlantic - pity party ft. Royal & The Serpent [Official Music Video]',
'Story Untold - Drown In My Mind (with lyrics)',
'The Chainsmokers - High (Lyrics)',
'The Chainsmokers - Riptide (Official Lyric Video)',
"Tommy's Face (feat. Spencer Chamberlain of Underoath)",
'Trash Boat - Strangers [Feat Dan Campbell] Lyric Video',
'Unspoken (Lyric Video)',
'VEGETA X YOU SAY RUN',
'Waterparks - FUNERAL GREY (Official Audio)',
'We The Kings - Check Yes Juliet (Official Video)',
'We The Kings - On My Love (Lyric Video)',
'With Confidence - Here For Nothing (Static Image Video)',
'etxrnall - your love is my drug (8bit slowed)',
'girlfriends - (e)motion sickness',
'girlfriends- Jessica',
'nothing,nowhere. - hammer Lyrics',
'stupid for you waterparks lyrics'
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
  cover.src = `images/cathuh.png`;
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
