import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from './utils/translations.json';
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(`\r${gradient(["purple", "pink"])(`Connecting${'.'.repeat(ponto)}`)}`);
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang('pt');
  } else {
    setlang('en');
  }

  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId('1146949248617828455')
    .setType('PLAYING')
    .setName('☣ Selfbot')
    .setState('🛠 Running...')
    .setDetails('Custom Discord Selfbot')
    .setAssetsLargeImage('https://via.placeholder.com/500') // Substitua por imagem desejada
    .setAssetsLargeText('Custom Selfbot')
    .setAssetsSmallImage('https://via.placeholder.com/100') // Substitua por imagem desejada
    .setAssetsSmallText('Running')
    .setStartTimestamp(new Date(1677642874 * 1000));
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(gradient(["purple", "pink"])("Your token (Not a bot token)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("this token is empty"));
      process.kill(1);
    } else {
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["red", "orange"])("Invalid token"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(error.message));
      }
    });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;