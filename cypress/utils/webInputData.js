import { faker } from '@faker-js/faker';
class WebInputData {
  static  fakerData() {
        const positiveNumberData = faker.number.int({ min: 1000, max: 9999 });
        const firstName = faker.person.firstName();
        const password = faker.internet.password();
        const date = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
        return { positiveNumberData, firstName, password, date };
    }
}
export default WebInputData;