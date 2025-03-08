// ?target=2025-03-16T00:00:00Z&message=Happy+Day
const countdownMessage = document.getElementById("countdown-message");
const countdownTimer = document.getElementById("countdown-timer")
const countdown = document.getElementById("countdown")

const messageInput = document.getElementById("input-message")
const targetInput = document.getElementById("input-target")
const startBtn = document.getElementById("start-btn")
const countdownSetup = document.getElementById("countdown-setup")

startBtn.addEventListener("click", () => {
    const target = new Date(targetInput.value).toISOString();
    const message = messageInput.value || "";

    const url = new URL(window.location.href);

    url.searchParams.set("target", target);
    url.searchParams.set("message", message);

    window.location.href = url.toString();
})


function getParams() {
    const params = new URLSearchParams(window.location.search);

    return {
        target: params.get("target") ? new Date(params.get("target")).getTime() : null,
        message: params.get("message") || ""
    }
}

function startTimer(target, message) {
    countdownMessage.textContent = message;
    countdown.classList.remove("hidden")
    update(target)
    setInterval(()=> update(target), 1000);
}

function update(target) {
    const now = new Date().getTime();
    const diff = target - now;

    if(diff <= 0){
        countdownTimer.textContent = "00:00:00:00";
        countdownTimer.classList.remove("text-green-500")
        countdownTimer.classList.add("text-red-600")
        fireConfetti();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownTimer.textContent = 
        `${String(days).padStart(2,"0")}:${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function fireConfetti(){
    confetti({
        particleCount: 150,
        spread: 80,
        origin: {
            y: 0.6
        }
    })
}


window.onload = function () {
    const { target, message } = getParams();
    if (target) {
        startTimer(target, message)
    } else {
        countdownSetup.classList.remove("hidden")
    }
}