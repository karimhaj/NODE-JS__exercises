function luckyDraw(player) {
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
}

async function getResults(){
  try{
    const data = await luckyDraw('Tina');
    console.log(data)
  } catch(error){
    console.error(error)
  }

  try{
    const data = await luckyDraw('Jorgen');
    console.log(data)
  } catch(error){
    console.error(error)
  }

  try{
    const data = await luckyDraw('Julien');
    console.log(data)
  } catch(error){
    console.error(error)
  }
}

getResults();