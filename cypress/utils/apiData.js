// cypress/utils/apiData.js
import { faker } from '@faker-js/faker';

export function generateBookDetails() {
  const adjectives = ['Silent', 'Hidden', 'Forgotten', 'Eternal', 'Burning', 'Lost', 'Secret', 'Golden', 'Fallen', 'Sacred'];
  const nouns = ['Dreams', 'Voices', 'Kingdom', 'Journey', 'Forest', 'Empire', 'Storm', 'Oath', 'River', 'Chronicle'];

  const adjective = faker.helpers.arrayElement(adjectives);
  const noun = faker.helpers.arrayElement(nouns);

  const title = `The ${adjective} ${noun}`;

  // Generate a meaningful English-like description
  const heroName = faker.person.firstName();
  const place = faker.location.city();
  const emotion = faker.helpers.arrayElement(['hope', 'fear', 'betrayal', 'redemption', 'destiny']);
  const goal = faker.helpers.arrayElement([
    'discover the truth behind a hidden legacy',
    'uncover the secrets buried in time',
    'fight for survival against impossible odds',
    'reunite a world torn apart by lies',
    'embrace a destiny larger than life'
  ]);

  const description = `${title} is a story of ${emotion} and courage. When ${heroName} from ${place} sets out to ${goal}, a chain of events unfolds that will change everything forever.`;

  return { title, description };
}
