window.onload = function () {
    const span = document.querySelector("#timeout")
    let time = 5
    setInterval(() => {
        span.innerText = ` ${time -= 1}`
    }, 1000)
    setTimeout(() => {
        clearInterval()
        window.location.href = "/posts"
    }, 5000)
}