const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
    client.user.setStatus('dnd')
    client.user.setPresence({
        game: {
            name: 'Praying to Adonai | ברכת אדוני',
            type: "PLAYING",
        }
    });
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === 'help') {
		message.channel.send('```asciidoc\n[Bot Commands]\nrabbi help - Shows this help menu.\nrabbi ping - Pong.\nrabbi summon - Summons the bot.\nrabbi o - o!\nrabbi torah - Gives you some prayer material from the comfort of your own home!\nrabbi react - Reacts with some jewish emojis.\nrabbi pray - Starts a guided prayer session with the bot.```');
    } else if (command === 'ping') {
		message.channel.send('Pong.');
    } else if (command === 'summon') {
		message.channel.send('Rabbi is at your service! ברוך הבא!');
    }
      else if (command === 'o') {
		message.reply('o my');
    }
      else if (command === 'torah') {
		message.author.send('```asciidoc\n[Genesis: Book 1]```\n**1:1** In the beginning God created the heaven and the earth.\n**1:2** And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.\n**1:3** And God said, Let there be light: and there was light.\n**1:4** And God saw the light, that it was good: and God divided the light from the darkness.\n**1:5** And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.\n**1:6** And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.\n**1:7** And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.\n**1:8** And God called the firmament Heaven. And the evening and the morning were the second day.\n**1:9** And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.\n**1:10** And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.');
        message.author.send('**1:11** And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.\n**1:12** And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.\n**1:13** And the evening and the morning were the third day.\n**1:14** And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:\n**1:15** And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.\n**1:16** And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.\n**1:17** And God set them in the firmament of the heaven to give light upon the earth,\n**1:18** And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.\n**1:19** And the evening and the morning were the fourth day.\n**1:20** And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.');
        message.author.send('**1:21** And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.\n**1:22** And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.\n**1:23** And the evening and the morning were the fifth day.\n**1:24** And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and \n**1:25** And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.\n**1:26** And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.\n**1:27** So God created man in his own image, in the image of God created he him; male and female created he them.\n**1:28** And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.\n**1:29** And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.\n**1:30** And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.\n**1:31** And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.');
        message.reply('check your DMs.');
      } else if (command === 'react') {
		message.react('✡');
        message.react('🇮🇱');
      } else if (command === 'pray') {
        const quiz = require('./pray.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
	       return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
          
        message.channel.send(item.question).then(() => {
	    message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
        .then(collected => {
        message.channel.send(`${collected.first().author}, great job! You are a devout jew!`);
		})
        .catch(collected => {
        message.channel.send('You took too long!');
		});
});
    }
});

client.login(token);