function luckyDraw (player){
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  }); 
}; 

luckyDraw('Joe')
.then(value => console.log(value))
.catch(error=> console.log(error));

luckyDraw('Caroline')
.then(value => console.log(value))
.catch(error=> console.log(error));

luckyDraw('Sabrina')
.then(value => console.log(value))
.catch(error=> console.log(error));
