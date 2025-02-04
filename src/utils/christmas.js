const embedimSnowId = 'embedim--snow';

const embRand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const isDecember = () => {
  const date = new Date();
  const month = date.getMonth();
  return month === 11;
};

const letItSnow = () => {
  let embedimSnow = document.getElementById('embedim--snow');
  if (!embedimSnow) {
    let embCSS = '.embedim-snow{position: absolute;width: 10px;height: 10px;background: white;border-radius: 50%;margin-top:-10px}';
    let embHTML = '';
    for (let i = 1; i < 200; i += 1) {
      embHTML += '<i class="embedim-snow"></i>';
      const rndX = embRand(0, 1000000) * 0.0001;
      const rndO = embRand(-100000, 100000) * 0.0001;
      const rndT = (embRand(3, 8) * 10).toFixed(2);
      const rndS = (embRand(0, 10000) * 0.0001).toFixed(2);
      embCSS
        += `.embedim-snow:nth-child(${i}){`
        + `opacity:${(embRand(1, 10000) * 0.0001).toFixed(2)};`
        + `transform:translate(${rndX.toFixed(2)}vw,-10px) scale(${rndS});`
        + `animation:fall-${i} ${embRand(10, 30)}s -${embRand(0, 30)}s linear infinite`
        + '}'
        + `@keyframes fall-${i}{${rndT}%{`
        + `transform:translate(${(rndX + rndO).toFixed(2)}vw,${rndT}vh) scale(${rndS})`
        + '}'
        + 'to{'
        + `transform:translate(${(rndX + rndO / 2).toFixed(2)}vw, 105vh) scale(${rndS})`
        + '}'
        + '}';
    }
    embedimSnow = document.createElement('div');
    embedimSnow.id = embedimSnowId;
    embedimSnow.innerHTML = `<style>#embedim--snow{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none}${embCSS}</style>${embHTML}`;
    document.body.appendChild(embedimSnow);
  }
};

const stopSnow = () => document.getElementById(embedimSnowId).remove();

export { isDecember, letItSnow, stopSnow };
