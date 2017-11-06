
addEventListener('message', (d) => {
    //TODO check how to pass parameter with Typed Array in worker.postMessage
    const redFactor = 1.1
    const greenFactor = 0.5
    const  blueFactor = 1.1
    const img = d.data
    const w = img.width
    const h = img.height
    console.log('...inside webworker ...', d)
    let t1 = performance.now()
    for (let y = 0; y < h; y++) { // for every row of pixel
        for (let x = 0; x < w; x++) { // for every pixel in column
            let index = (x + y * w) * 4 // RGBA bytes
            let red = img.data[index]
            let green = img.data[index + 1]
            let blue = img.data[index + 2]
            let alpha = img.data[index + 3]
            // let's say we remove 50% of blue and 50 % of green
            img.data[index] = img.data[index] * redFactor
            img.data[index + 1] = img.data[index + 1] * greenFactor
            img.data[index + 2] = img.data[index + 2] * blueFactor
            img.data[index + 3] = img.data[index + 3]
        }
    }
    let t2 = performance.now()
    console.log("---> double y,x loop to modifiy img took " + Math.round(t2 - t1) + " milliseconds.")
    console.log('<--sending back postMessage from webworker to mainthread')
    postMessage(img, [img.data.buffer])  // let send back result
})

//    console.log('### ERROR your browser does not support Web Workers API !')