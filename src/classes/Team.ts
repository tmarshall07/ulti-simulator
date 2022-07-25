import { v4 as uuidv4 } from 'uuid';

class Team {
  name: string;
  id: string;
  offenseEfficiency: number;
  defenseEfficiency: number;

  constructor(args: { name: string, offenseEfficiency: number, defenseEfficiency: number }) {
    const { name, offenseEfficiency, defenseEfficiency } = args;
    this.name = name;
    this.id = uuidv4();

    this.defenseEfficiency = defenseEfficiency;
    this.offenseEfficiency = offenseEfficiency;
  }
}

export default Team;