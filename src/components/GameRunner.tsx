import { Box, Button, Input } from '@tannerjs/scheme-ui';
import { Label ,Slider } from '@rebass/forms'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { mean, standardDeviation } from 'simple-statistics';
import Game from '../classes/Game';
import Team from '../classes/Team';

type Props = {}

const ratCity = new Team({ name: 'Rat City', offenseEfficiency: 0.5, defenseEfficiency: 0.6 });
const fleet = new Team({ name: 'Fleet', offenseEfficiency: 0.5, defenseEfficiency: 0.3 });

type Results = {
  home: number;
  away: number;
}

const GameRunner = (props: Props) => {
  const [results, setResults] = useState<{ mean: number; std: number}>({ mean: 0, std: 0 })
  const [totalGames, setTotalGames] = useState(10000);
  const [defenseEfficiency, setDefenseEfficiency] = useState<number>(0.5)
  const [offenseEfficiency, setOffenseEfficiency] = useState<number>(0.5)

  const handleSetEfficiency = (type: 'offense' | 'defense', value: number) => {
    if (type === 'offense') {
      setOffenseEfficiency(value);
    } else {
      setDefenseEfficiency(value);
    }
  }

  const handleRunGame = () => {
    const scores = [];
    ratCity.offenseEfficiency = offenseEfficiency;
    ratCity.defenseEfficiency = defenseEfficiency;

    for(let i = 0; i < 10000; i += 1) {
      const game = new Game({ homeTeam: ratCity, awayTeam: fleet });
      game.play();
      scores.push({ ...game.score });
    }

    setResults({
      mean: mean(scores.map((s) => s.home - s.away)),
      std: standardDeviation(scores.map((s) => s.home - s.away))
    })
  }

  useEffect(() => {
    handleRunGame();
  }, [defenseEfficiency, offenseEfficiency])

  const didWin = results.mean > 0;

  return (
    <div>
      <Box>
        <Box>
          {/* <Box>
          <Input max={10000} type="number" value={totalGames} onChange={(e: React.FormEvent<HTMLInputElement>) => setTotalGames(parseFloat(e.currentTarget.value))} />
        </Box> */}
          <Box mb={4}>
            <Label htmlFor='offense'>Offense Efficiency ({offenseEfficiency * 100}%)</Label>
            <Slider
              id='offense'
              name='offense'
              max={1}
              min={0}
              step={0.1}
              value={offenseEfficiency}
              onChange={(e) => handleSetEfficiency('offense', parseFloat(e.currentTarget.value))}
            />
          </Box>
          <Box mb={4}>
            <Label htmlFor='defense'>Defense Efficiency ({defenseEfficiency * 100}%)</Label>
            <Slider
              id='defense'
              name='defense'
              defaultValue={0.5}
              max={1}
              min={0}
              step={0.1}
              value={defenseEfficiency}
              onChange={(e) => handleSetEfficiency('defense', parseFloat(e.currentTarget.value))}
            />
          </Box>
        </Box>
        <Button onClick={handleRunGame}>Simulate games</Button>
      </Box>
      
      {results && (
        <Box mt={3}>
          <Box p={3} bg={didWin ? 'green' : 'red'}>
            {didWin ? 'Win' : 'Loss'} {didWin ? '+' : ''}{results.mean} (standard dev. {Math.round(results.std * 100) / 100})
          </Box>
        </Box>
      )}
    </div>
  )
}

export default GameRunner