import Bubble from "./bubble.js"

const AMOUNT_OF_BUBBLES = 4
const parallaxImages = document.querySelectorAll(".parallax")
const parallaxSpeedMultiplier = 0.1
const bubbleSection = document.getElementById("bubble-section")
let bubbles = []


function _init() {
    // Removed the parallax effect for now. I will
    // keep it in the code in case I want to switch back
    //addEventListener("scroll", applyParallaxEffects)

    for (let i = 0; i < AMOUNT_OF_BUBBLES; i++) {
        _createBubble()
    } 
}

function applyParallaxEffects() {
    parallaxImages.forEach((image) => {
        const yPos = -window.scrollY * parallaxSpeedMultiplier
        image.style.backgroundPosition = `center ${yPos}px`
    })
}

function _createBubble() {
    const randomSeed = Math.random() * 20
    const randomSize = Math.max(Math.random() * 20, 10)
    const bubbleInstance = new Bubble(
        50,
        randomSize,
        `https://picsum.photos/seed/${randomSeed}/400/400`
    ).instantiate()
    bubbleSection.appendChild(bubbleInstance)
    bubbles.push(bubbleInstance)
}

_init()

