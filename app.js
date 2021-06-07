const dotenv = require("dotenv")
dotenv.config()

const _ = require("lodash")

const discord = require("discord.js")
const { isNull } = require("lodash")
const client = new discord.Client()

const prefix = '~'

let voiceChannelList = []
let textChannelList = []
let textChannel = null
let oldChannel = ""
let newChannel = ""
let moveTime = null
let moveTimeHour = null
let moveTimeMinute = null

client.on('ready', () => {

    textChannel = client.channels.cache.get("849627304421228584")
    
    setInterval(() => {
        
        const channels = client.channels.cache.filter(c => {
            return c.parentID == "816349849346900008" && c.type == "voice" 
        })

        let date = new Date()
        
        if(date.getUTCHours() == 11 && date.getMinutes() >= 00){
            for (const [channelId, channel] of channels){
                for(const [memberId, member] of channel.members){
                    member.voice.setChannel("690909536671891457")
                    textChannel.send(`${member.user.username} has been moved!`)
                }
            }
        }

    }, 10000)
    
})

// client.on('message', (msg) => {
//     if(!msg.content.startsWith(prefix)){
//         return
//     }

//     const args = msg.content.slice(prefix.length).trim().split(' ');
//     const command = args.shift().toLowerCase();

//     if(command === "channellist"){
        
//         if(args[0] === "voice" && voiceChannelList[0] == null){
//             const channels = client.channels.cache.filter(c => {
//                 return c.type == "voice"
//             })
//             for (const [channelId, channel] of channels){
//                 voiceChannelList.push({
//                     "name": channel.name,
//                     "id": channel.id
//                 })
//                 msg.channel.send(`${channel.name} - ${channel.id}`)
//             }
//         }
//         if(args[0] === "text" && textChannelList[0] == null){
//             const channels = client.channels.cache.filter(c => {
//                 return c.type == "text"
//             })
//             for (const [channelId, channel] of channels){
//                 textChannelList.push({
//                     "name": channel.name,
//                     "id": channel.id
//                 })
//                 msg.channel.send(`${channel.name} - ${channel.id}`)
//             }
//         }
//     }
//     if(command === "setchannels"){
//         voiceChannelList.map(item => {
//             if(item.name == args[0]){
//                 oldChannel = item.id
//             }
//             if(item.name == args[1]){
//                 newChannel = item.id
//             }
//         })
//         textChannel.send(`channels changed, ${oldChannel} -> ${newChannel}`)
//     }
//     if(command === "settime"){
//         moveTime = args[0]
//         textChannel.send(`Time changed ${moveTime}`)
//     }
//     if(command === "settings"){
//         textChannel.send(`${oldChannel} -> ${newChannel}`)
//         textChannel.send(`${moveTimeHour} : ${moveTimeMinute}`)
//     }
// })

client.login(process.env.TOKEN)

