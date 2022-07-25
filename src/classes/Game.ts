import Team from "./Team";

class Game {
  maxPoints: number;
  homeTeam: Team;
  awayTeam: Team;
  onOffense: Team;
  score: {
    home: number;
    away: number;
  }

  constructor(args: { homeTeam: Team, awayTeam: Team, maxPoints?: number }) {
    const { homeTeam, awayTeam, maxPoints = 13 } = args;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.score = {
      home: 0, away: 0
    }
    this.maxPoints = maxPoints;

    this.onOffense = this.homeTeam;
  }

  isOnOffense() {
    return this.homeTeam.id === this.onOffense.id
  }

  checkScored() {
    // Get current line efficiency
    const efficiency = this.isOnOffense() ? this.homeTeam.offenseEfficiency : this.homeTeam.defenseEfficiency;
    return Math.random() <= efficiency;
  }

  playPoint() {
    const didScore = this.checkScored();

    if (didScore) {
      this.score.home += 1;
      if (this.isOnOffense()) {
        // Switch to D if currently an O point
        this.onOffense = this.awayTeam;
      } 
    } else {
      this.score.away += 1;
      if (!this.isOnOffense()) {
        // Switch to O if currently a D point
        this.onOffense = this.homeTeam;
      }
    }
  }

  play() {
    this.reset();

    while (this.score.home < this.maxPoints && this.score.away < this.maxPoints) {
      this.playPoint();
    }
  }

  reset() {
    this.score.home = 0;
    this.score.away = 0;
    this.onOffense = this.homeTeam;
  }
}

export default Game