const username = document.getElementById('username');
const tag = document.getElementById('tag');
const role = document.getElementById('role');
const roleColor = document.getElementById('roleColor');
const message = document.getElementById('message');
const avatarFile = document.getElementById('avatarFile');
const timeInput = document.getElementById('timeInput');
const renderBtn = document.getElementById('renderBtn');
const exportBtn = document.getElementById('exportBtn');

const pvName = document.getElementById('pvName');
const pvTag = document.getElementById('pvTag');
const pvRole = document.getElementById('pvRole');
const pvMessage = document.getElementById('pvMessage');
const pvAvatar = document.getElementById('pvAvatar');
const pvTime = document.getElementById('pvTime');
const pvAttach = document.getElementById('pvAttach');

let avatarDataUrl = null;

function updatePreview(){
  pvName.textContent = username.value || 'Anon';
  pvTag.textContent = tag.value || '#0000';
  const r = role.value.trim();
  if(r){
    pvRole.style.display = 'inline-block';
    pvRole.textContent = r;
    pvRole.style.background = roleColor.value || '#7289da';
  } else {
    pvRole.style.display = 'none';
  }
  pvMessage.textContent = message.value || '';
  pvTime.textContent = timeInput.value || '';
  // avatar
  pvAvatar.innerHTML = '';
  if(avatarDataUrl){
    const img = document.createElement('img');
    img.src = avatarDataUrl;
    pvAvatar.appendChild(img);
  } else {
    // placeholder circle with initials
    const initials = (username.value||'A').trim()[0] || 'A';
    const placeholder = document.createElement('div');
    placeholder.style.width='100%';
    placeholder.style.height='100%';
    placeholder.style.display='flex';
    placeholder.style.alignItems='center';
    placeholder.style.justifyContent='center';
    placeholder.style.color='white';
    placeholder.style.fontWeight='700';
    placeholder.style.fontSize='18px';
    placeholder.style.background = 'linear-gradient(135deg,#4b5563,#2f3136)';
    placeholder.textContent = initials.toUpperCase();
    pvAvatar.appendChild(placeholder);
  }
}

// wczytywanie pliku awatara
avatarFile.addEventListener('change', e=>{
  const f = e.target.files && e.target.files[0];
  if(!f) { avatarDataUrl = null; updatePreview(); return; }
  const reader = new FileReader();
  reader.onload = () => {
    avatarDataUrl = reader.result;
    updatePreview();
  };
  reader.readAsDataURL(f);
});

renderBtn.addEventListener('click', ()=>{
  updatePreview();
});

/* EXPORT: rysowanie na canvasie */
function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  return y;
}

exportBtn.addEventListener('click', async ()=>{
  updatePreview();
  // ustawienia canvas
  const padding = 32;
  const canvasWidth = Math.min(900, Math.max(600, pvMessage.textContent.length*6 + 250));
  // estimate height: base + lines
  const linesEstimate = Math.ceil(pvMessage.textContent.length / 60) + 3;
  const canvasHeight = 120 + linesEstimate * 22;
  const c = document.createElement('canvas');
  c.width = canvasWidth;
  c.height = canvasHeight;
  const ctx = c.getContext('2d');

  // background
  ctx.fillStyle = '#2b2d31';
  ctx.fillRect(0,0,c.width,c.height);

  // avatar area
  const ax = padding, ay = 20, av = 64;
  // avatar circle background
  ctx.save();
  ctx.beginPath();
  ctx.arc(ax + av/2, ay + av/2, av/2, 0, Math.PI*2);
  ctx.closePath();
  ctx.clip();
  if(avatarDataUrl){
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = avatarDataUrl;
    await new Promise((res,rej)=>{
      img.onload = ()=> { ctx.drawImage(img, ax, ay, av, av); res(); }
      img.onerror = ()=> { ctx.fillStyle='#444'; ctx.fillRect(ax,ay,av,av); res(); }
    });
  } else {
    // placeholder
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(ax,ay,av,av);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((username.value||'A')[0].toUpperCase(), ax + av/2, ay + av/2);
  }
  ctx.restore();

  // Username + tag
  const textX = ax + av + 16;
  let textY = ay + 18;
  ctx.fillStyle = '#e6e6e6';
  ctx.font = '700 16px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(pvName.textContent, textX, textY);

  ctx.font = '13px Inter, sans-serif';
  ctx.fillStyle = '#b9bbbe';
  ctx.fillText(pvTag.textContent, textX + ctx.measureText(pvName.textContent).width + 8, textY);

  // role badge
  if(pvRole.style.display !== 'none'){
    const badgeText = pvRole.textContent;
    ctx.font = '12px Inter, sans-serif';
    const bw = ctx.measureText(badgeText).width + 14;
    const bh = 20;
    const bx = textX + ctx.measureText(pvName.textContent).width + ctx.measureText(pvTag.textContent).width + 24;
    const by = textY - 14;
    ctx.fillStyle = roleColor.value || '#7289da';
    roundRect(ctx, bx, by, bw, bh, 6, true, false);
    ctx.fillStyle = '#fff';
    ctx.fillText(badgeText, bx + 7, textY + 2);
  }

  // time (right aligned)
  ctx.font = '13px Inter, sans-serif';
  ctx.fillStyle = '#b9bbbe';
  ctx.textAlign = 'right';
  ctx.fillText(pvTime.textContent, c.width - padding, textY);

  // message text
  ctx.textAlign = 'left';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillStyle = '#e6e6e6';
  const msgX = textX;
  let msgY = ay + av + 12;
  const maxTextW = c.width - msgX - padding;
  const lh = 20;
  // wrap
  msgY = msgY + 2;
  wrapText(ctx, pvMessage.textContent, msgX, msgY, maxTextW, lh);

  // attachments (if any) - none in this simple example

  // finalize download
  c.toBlob(blob=>{
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(username.value||'user')}_message.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
});

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  if (typeof r === 'undefined') r = 5;
  if (typeof r === 'number') r = {tl: r, tr: r, br: r, bl: r};
  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
  ctx.lineTo(x + r.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

updatePreview();