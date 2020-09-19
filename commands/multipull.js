const { settings } = require("cluster");
const bot_config = require('../bot.config.json');
const weapA = require('../assets/json/weaponA.json');
const weapS = require('../assets/json/weaponS.json');
const prefix = bot_config.bot_config.prefix;
var uuid = require('uuid');
var jimp = require('jimp');
// var _ = require('lodash');
const Chance = require('chance');
let chance = new Chance();
const Discord = require('discord.js');
const util = require('../util/util');

let roll = function() {
    return chance.integer({ min: 1, max: 100 })
}

let pull = function(rateup) {
    const weapSR = require(rateup);

    let result = roll();

    if(result >= 1 && result <= 3 ) {
        var animalArray  = Object.keys(weapSR);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapSR[randomKey]; 
        return randomValue;

    }

    if(result >= 4 && result <= 20) {
        var animalArray  = Object.keys(weapS);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapS[randomKey]; 
        return randomValue;
    }

    if(result >= 21 && result <= 100) {
        var animalArray  = Object.keys(weapA);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapA[randomKey]; 
        return randomValue;
    }

        var animalArray  = Object.keys(weapA);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapA[randomKey]; 
        return randomValue;
}

let pullSpec = function(rateup) {
    const weapSR = require(rateup);
    let result = roll();

    if(result >= 1 && result <= 25 ) {
        var animalArray  = Object.keys(weapSR);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapSR[randomKey]; 
        return randomValue;

    }

    if(result >= 26 && result <= 100 ) {
        var animalArray  = Object.keys(weapS);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapS[randomKey]; 
        return randomValue;

    }

        var animalArray  = Object.keys(weapS);
        var randomNumber = Math.random();
        var animalIndex  = Math.floor(randomNumber * animalArray.length);
        var randomKey    = animalArray[animalIndex];
        var randomValue  = weapS[randomKey]; 
        return randomValue;
}


let pullGuaranteed = function(rateup, guaranteed) {
    const weapSR = require(rateup);
    var animalArray  = Object.keys(weapSR);
    var randomNumber = Math.random();
    var animalIndex  = Math.floor(randomNumber * guaranteed.length);
    var randomKey    = animalArray[animalIndex];
    var randomValue  = weapSR[randomKey]; 
    return randomValue;
}



module.exports = {
    name: 'multipull',
    description: 'tes hoky anda dengan multipull',
    execute(message, args, client) {

        if(args.length === 0) {
            Object.keys(bot_config.event).forEach((key, index) => {
                const embed = new Discord.MessageEmbed()
                            .setTitle(bot_config.event[key].name)
                            .setDescription('**!s multipull ' + bot_config.event[key].args + '** to pull this banner')
                            .addField('Info :', bot_config.event[key].info)
                            .setColor(12745742)
                            .setImage(bot_config.event[key].url);

                        message.channel.send({embed});
            });
            return;
        }
    else {
    if(!bot_config.event[args[0]]) {
        const embed = new Discord.MessageEmbed()
                            .setTitle('Banner not available')
                            .setDescription('**!s multipull** for available banner list')
                            .setColor(12745742)
                        message.channel.send({embed});
        return;
    }
    let poolRate = bot_config.event[args[0]].rateup;
    let images = ['./assets/img/gambargacha.png']
    let textE = [];
    for(let i = 0; i < 11; i++){
    

        if(i == 10){
            if(bot_config.event[args[0]].guaranteed){
                a = pullGuaranteed(poolRate, bot_config.event[args[0]].guaranteed);
                    textE.push(util.evalRarity(a.rarity,client) + a.name);
                    images.push(a.url);
            }
            else{
                a = pullSpec(poolRate);
                if(a.rarity == 'SR'){
                    textE.push(util.evalRarity(a.rarity,client) + a.name);
                }
                images.push(a.url);
            }
          
            
        }
        else{
            a = pull(poolRate);
            if(a.rarity == 'SR'){
                textE.push(util.evalRarity(a.rarity,client) + a.name);
            }
            images.push(a.url);
           
  
        }
        // console.log(i);
    }
    
    textE = (textE.length > 0 ? textE : 'n/a')

    var jimps = [];
    let theUrl = '';
    for(let i = 0; i < images.length; i++){
        jimps.push(jimp.read(images[i])); 
    }
   

    Promise.all(jimps).then(function(data){
        return Promise.all(jimps);
    }).then(function(data){
        data[0].composite(data[1],30,30);
        data[0].composite(data[2],186,30);
        data[0].composite(data[3],342,30);

        data[0].composite(data[4],30,186);
        data[0].composite(data[5],186,186);
        data[0].composite(data[6],342,186);

        data[0].composite(data[7],30,342);
        data[0].composite(data[8],186,342);
        data[0].composite(data[9],342,342);

        data[0].composite(data[10],113,498);
        data[0].composite(data[11],269,498);

        imgName = uuid.v1() + '.png';
        theUrl = './assets/img/your/yourgacha' + imgName;

        data[0].write(theUrl, function(){
            // console.log(message.guild.members.cache.get(message.author.id));
            const user = message.guild.members.cache.get(message.author.id);
            let URLgambar = 'https://cdn.discordapp.com/avatars/'+ user.user.id + '/' + user.user.avatar + '.png?size=64';
            let nickname = user.nickname ? user.nickname : user.user.username;
            const attachment = new Discord
              .MessageAttachment(theUrl, imgName);
                const embed = new Discord.MessageEmbed()
                    .setTitle(bot_config.event[args[0]].name + ' Pull')
                    .setAuthor(nickname + ' Gacha Results', URLgambar)
                    .setTimestamp()
                    .setColor(12745742)
                    .addField('SR GET', textE)
                    .attachFiles(attachment)
                    .setImage('attachment://' + imgName);

                message.channel.send({embed});
            // message.channel.send(message.guild.members.cache.get(message.author.id).nickname + ' gacha results : ', {files: [theUrl]});
        })
    })
            
        }

 
        // const emoji = client.emojis.cache.get('753083854239039498');
        

        
     


        
        }   

    }
