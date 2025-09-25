import { faker } from '@faker-js/faker';

class RegisterData {
    static fakerRegisterData(){
        const username =  faker.person.firstName();
            const password = faker.internet.password();
            const confirmPassword = password;
        return { username, password, confirmPassword };
    }
}
export default RegisterData;