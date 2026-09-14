import { lerp } from "./math.js"

export default class Bubble {
    static MAX_SPEED = 0.1
    static PLACEHOLDER_COLOR = "#fdfdfd"
    static CONTAINER_HEIGHT_VH = 100
    static CONTAINER_WIDTH_VW = 100

    constructor(speed, diameter = 10, backgroundImagePath = null) {
        this.speed = speed || Math.max(0.05, Math.random() * Bubble.MAX_SPEED)
        this.diameter = diameter
        this.backgroundImagePath = backgroundImagePath
        this.currentSpeed = 0.1
        this.maxSpeed = 0.02
        this.acceleration = 0.001
        this.position = this._getRandomSpawnPos() // Percentage. Defaults to middle.
        this.velocity = {x: 0, y: 0}
        this.direction = this._getRandomDirection() // Normalized direction.
        this.instance = null

        setInterval(() => {this._setRandomDirection()}, 2000)
    }

    instantiate() {
        const div = this._createDiv()

        if (this.backgroundImagePath) {
            div.style.backgroundImage = `url(${this.backgroundImagePath})`
        }

        else {
            div.style.backgroundColor = `${Bubble.PLACEHOLDER_COLOR}`
        }
        
        this.instance = div
        this.move()
        return this.instance
    }

    _createDiv() {
        const div = document.createElement("div")

        div.style.borderRadius = "50%"
        div.style.width = `${this.diameter}vw`
        div.style.height = `${this.diameter}vw`
        div.style.backgroundSize = "cover"
        div.style.backgroundAttachment = "fixed"
        div.style.position = "absolute"

        this.position = this._getRandomSpawnPos()
        return div
    }

    _getRandomSpawnPos() {
        return {
            x: Math.max(20, Math.random() * 80),
            y: Math.max(20, Math.random() * 80)
        }
    }

    _getRandomDirection() {
        return {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        }
    }

    _setRandomDirection() {
        this.direction = this._getRandomDirection()
    }

    _updateTransform() {
        const newVw = (this.position.x / 100) * Bubble.CONTAINER_WIDTH_VW
        const newVh = (this.position.y / 100) * Bubble.CONTAINER_HEIGHT_VH
        this.instance.style.transform = `translate(${newVw}vw, ${newVh}vh) translate(-50%, -50%)`
    }

    _checkWalls() {
        // A little bit of margin to make sure it doesn't go out of the screen
        const margin = 0
        const topMargin = 0
        
        // Position is the percentage of how far it is in the container.
        const min = this.diameter / 2
        const max = (100 - this.diameter / 2) - margin

        if (this.position.x < min || this.position.x > max) {
            this.velocity.x *= -1
            this.direction.x *= -1
        }

        if (this.position.y < min + topMargin || this.position.y > max) {
            this.velocity.y *= -1
            this.direction.y *= -1
        }
    }

    move = () => {
        const targetVelocity = {
            x: this.direction.x * this.maxSpeed,
            y: this.direction.y * this.maxSpeed
        }

        this.velocity.x = lerp(this.velocity.x, targetVelocity.x, this.acceleration)
        this.velocity.y = lerp(this.velocity.y, targetVelocity.y, this.acceleration)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this._checkWalls()
        this._updateTransform()
        requestAnimationFrame(this.move)
    }
}
