import buzz from 'buzz';

import '../public/audio/play.mp3';
import '../public/audio/winner.mp3';
import '../public/audio/lose.mp3';
import '../public/audio/number-stop.mp3';

const Sounds = {
  play: new buzz.sound("./audio/play.mp3"),
  numberStop: new buzz.sound("./audio/number-stop.mp3"),
  winner: new buzz.sound("./audio/winner.mp3"),
  lose: new buzz.sound("./audio/lose.mp3")
};

export default Sounds;