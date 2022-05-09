const p = [];
for (let i = 0;i<10;i++) {
  p.push(() => new Promise((resolve) => {
    console.log('start--', i);
    setTimeout(() => {resolve(i)}, Math.random() * 1000);
  }))
}

async function request(requests, limit = 3) {
  return new Promise((resolve, reject) => {
    const len = requests.length;
    let count = 0;

    const start = () => {
      let req = requests.shift();
      if (req) {
        req().then(data => {
          console.log(data);
          if (count === len - 1) {
            resolve();
          } else {
            count++;
            start();
          }
        })
      }
    }

    while(limit > 0) {
      start();
      limit--;
    }
  })
}
request(p, 3)
