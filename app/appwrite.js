import { Client,Databases } from 'appwrite';
const client = new Client();
client.setProject('6720952900065f3320a5');

const databases = new Databases(client);

export { client, databases };