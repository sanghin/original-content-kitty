const { command } = require('./commands');
const { debug } = require('./utility/debug');
const { discordClient } = require('./client/discord');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') 
const dayjs = require('dayjs')

dayjs.extend(utc)
dayjs.extend(timezone)

function messageHandler(message) {  
  if (message.author.bot) {
    return;
  }

  debug('messageHandler', message)
  
  command.handle(message, 'post');
}

discordClient.on('messageUpdate', (message) => { messageHandler(message)} );
discordClient.on('messageCreate', (message) => { messageHandler(message) });

process.on('unhandledRejection', r => console.error(r));
