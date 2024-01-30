const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: contactsData,
            user: {
                name: "Alessandro",
                propic: "img/propic.png"
            },
            activeChat: 2,
            searchString: "",
            newMessage: {
                date: '',
                message: '',
                status: 'sent'
            },
            responseMessage: {
                date: '',
                message: this.getRandomString(),
                status: 'received'
            }
        }
    },
    methods: {
        changeChat(index) {
            this.activeChat = index
        },
        sendMessage() {
            let newMessageObj = { ...this.newMessage }
            let currentTime = getCurrentDateTimeString()
            newMessageObj.date = currentTime
            newMessageObj.message = this.newMessage.message
            this.contacts[this.activeChat].messages.push(newMessageObj)
            this.newMessage.message = ""
            setTimeout(() => {
                let responseMessageObj = { ...this.responseMessage }
                responseMessageObj.date = getCurrentDateTimeString()
                if (this.contacts[this.activeChat].name !== "Miriam") {
                    responseMessageObj.message = this.getRandomString()
                } else {
                    responseMessageObj.message = ""
                    responseMessageObj.media = "./img/guy.png"
                }

                this.contacts[this.activeChat].messages.push(responseMessageObj)
            }, randomResponseTime())

        },
        getRandomString() {
            const automaticResponsesItalian = [
                "Capito",
                "Va bene",
                "Ok",
                "Sicuro",
                "D'accordo",
                "Certamente",
                "Giusto",
                "Perfetto",
                "Va bene così",
                "Accettato"
            ]
            let randomIndex = Math.floor(Math.random() * automaticResponsesItalian.length)
            console.log(randomIndex)
            return automaticResponsesItalian[randomIndex]
        },
        deleteMessage(index) {
            this.contacts[this.activeChat].messages.splice(index, 1)
        }
    }
}).mount('#app')

function getCurrentDateTimeString() {
    // Get current date
    let currentDate = new Date();

    // Get individual date components
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    let day = currentDate.getDate().toString().padStart(2, '0');
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Create the string representation of the current date and time
    let currentDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return currentDateTimeString;
}

function randomResponseTime() {
    return Math.floor(Math.random() * 5000 + 1000)
}