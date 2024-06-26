import { FalloutCharacter } from "../utils/CharacterManager";
import { Perk } from "../utils/CharacterHelper";

export default function FalloutCharacterPage() {
    var character = new FalloutCharacter("Win", "Human", {
        strength: 8,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    });
    var testPerk = new Perk("Test Perk", (mod) => ({...mod, intelligence: mod.intelligence + 1}), ["modifier"]);
    character.addPerk(testPerk);

    return (
        <div>
            <h1>Fallout Character</h1>
            <p>{character.name}</p>
            {Object.keys(character.perks).map((key, index) => (
                <p key={index}>{character.perks[key].name}</p>
            ))}
            {Object.keys(character.modifier).map((key, index) => (
                <p key={index}>{key}: {character[key]}({character.modifier[key]})</p>
            ))}
        </div>
    );
}