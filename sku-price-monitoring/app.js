'use strict';

/* ══════════════════ GEO & BU DATA ══════════════════ */
const GEO = {
  continents: {
    all:{name:'전체',countries:['KR','US','GB','DE','FR','JP','AU','IN','AE','VN','SG']},
    asia:{name:'아시아태평양',countries:['KR','JP','AU','IN','SG']},
    sea:{name:'동남아',countries:['VN','SG']},
    americas:{name:'미주',countries:['US']},
    europe:{name:'유럽',countries:['GB','DE','FR']},
    mea:{name:'MEA',countries:['AE']},
  },
  countries:{
    KR:{name:'대한민국',flag:'🇰🇷',currency:'KRW',sym:'₩',continent:'asia',
      retailers:[{id:'coupang',name:'쿠팡',logo:'CP',color:'#EE2029'},{id:'naver',name:'네이버쇼핑',logo:'NV',color:'#03C75A'},{id:'ssg11',name:'11번가',logo:'11',color:'#FF5000'},{id:'gmarket',name:'G마켓',logo:'GM',color:'#D4A017'},{id:'lotteon',name:'롯데ON',logo:'LO',color:'#E60012'}]},
    US:{name:'United States',flag:'🇺🇸',currency:'USD',sym:'$',continent:'americas',
      retailers:[{id:'amazon',name:'Amazon',logo:'AZ',color:'#FF9900'},{id:'bestbuy',name:'Best Buy',logo:'BB',color:'#0046BE'},{id:'walmart',name:'Walmart',logo:'WM',color:'#0071CE'},{id:'target',name:'Target',logo:'TG',color:'#CC0000'},{id:'bh',name:'B&H',logo:'BH',color:'#333'}]},
    GB:{name:'United Kingdom',flag:'🇬🇧',currency:'GBP',sym:'£',continent:'europe',
      retailers:[{id:'amazon_uk',name:'Amazon UK',logo:'AZ',color:'#FF9900'},{id:'currys',name:'Currys',logo:'CU',color:'#4B0082'},{id:'argos',name:'Argos',logo:'AR',color:'#CC0000'},{id:'johnlewis',name:'John Lewis',logo:'JL',color:'#333'},{id:'ao',name:'AO.com',logo:'AO',color:'#00A0D2'}]},
    DE:{name:'Germany',flag:'🇩🇪',currency:'EUR',sym:'€',continent:'europe',
      retailers:[{id:'amazon_de',name:'Amazon.de',logo:'AZ',color:'#FF9900'},{id:'mediamarkt',name:'MediaMarkt',logo:'MM',color:'#CC0000'},{id:'saturn',name:'Saturn',logo:'SA',color:'#001489'},{id:'expert',name:'Expert',logo:'EX',color:'#E30613'},{id:'cyberport',name:'Cyberport',logo:'CP',color:'#0066CC'}]},
    FR:{name:'France',flag:'🇫🇷',currency:'EUR',sym:'€',continent:'europe',
      retailers:[{id:'amazon_fr',name:'Amazon.fr',logo:'AZ',color:'#FF9900'},{id:'fnac',name:'Fnac',logo:'FN',color:'#F3A000'},{id:'darty',name:'Darty',logo:'DT',color:'#CC0000'},{id:'boulanger',name:'Boulanger',logo:'BL',color:'#003087'},{id:'ldlc',name:'LDLC',logo:'LD',color:'#E30613'}]},
    JP:{name:'Japan',flag:'🇯🇵',currency:'JPY',sym:'¥',continent:'asia',
      retailers:[{id:'amazon_jp',name:'Amazon.co.jp',logo:'AZ',color:'#FF9900'},{id:'yodobashi',name:'Yodobashi',logo:'YD',color:'#CC0000'},{id:'biccamera',name:'Bic Camera',logo:'BC',color:'#0052A5'},{id:'rakuten',name:'Rakuten',logo:'RK',color:'#BF0000'},{id:'kakaku',name:'Kakaku',logo:'KK',color:'#0066CC'}]},
    AU:{name:'Australia',flag:'🇦🇺',currency:'AUD',sym:'A$',continent:'asia',
      retailers:[{id:'jbhifi',name:'JB Hi-Fi',logo:'JB',color:'#FFD700'},{id:'harvey',name:'Harvey Norman',logo:'HN',color:'#CC0000'},{id:'officeworks',name:'Officeworks',logo:'OW',color:'#E30613'},{id:'amazon_au',name:'Amazon AU',logo:'AZ',color:'#FF9900'},{id:'bigw',name:'Big W',logo:'BW',color:'#0066CC'}]},
    IN:{name:'India',flag:'🇮🇳',currency:'INR',sym:'₹',continent:'asia',
      retailers:[{id:'flipkart',name:'Flipkart',logo:'FK',color:'#F74F00'},{id:'amazon_in',name:'Amazon India',logo:'AZ',color:'#FF9900'},{id:'reliance',name:'Reliance Digital',logo:'RD',color:'#1B4F9A'},{id:'croma',name:'Croma',logo:'CR',color:'#CC0000'},{id:'vijay',name:'Vijay Sales',logo:'VS',color:'#003087'}]},
    AE:{name:'UAE',flag:'🇦🇪',currency:'AED',sym:'AED',continent:'mea',
      retailers:[{id:'amazon_ae',name:'Amazon.ae',logo:'AZ',color:'#FF9900'},{id:'noon',name:'Noon',logo:'NN',color:'#FEEE00'},{id:'sharafdg',name:'Sharaf DG',logo:'SD',color:'#E30613'},{id:'emax',name:'eMax',logo:'EM',color:'#003087'},{id:'carrefour',name:'Carrefour',logo:'CF',color:'#0046BE'}]},
    VN:{name:'Vietnam',flag:'🇻🇳',currency:'VND',sym:'₫',continent:'sea',
      retailers:[{id:'tgdd',name:'Thế Giới Di Động',logo:'TG',color:'#CC0000'},{id:'cells',name:'CellphoneS',logo:'CS',color:'#003087'},{id:'shopee_vn',name:'Shopee VN',logo:'SP',color:'#FF5722'},{id:'tiki',name:'Tiki',logo:'TK',color:'#1A73E8'},{id:'lazada_vn',name:'Lazada VN',logo:'LZ',color:'#0F3B9A'}]},
    SG:{name:'Singapore',flag:'🇸🇬',currency:'SGD',sym:'S$',continent:'sea',
      retailers:[{id:'shopee_sg',name:'Shopee SG',logo:'SP',color:'#FF5722'},{id:'lazada_sg',name:'Lazada SG',logo:'LZ',color:'#0F3B9A'},{id:'harvey_sg',name:'Harvey Norman',logo:'HN',color:'#CC0000'},{id:'courts',name:'Courts',logo:'CO',color:'#003087'},{id:'amazon_sg',name:'Amazon SG',logo:'AZ',color:'#FF9900'}]},
  }
};

const BU = {
  MX:{name:'MX (모바일)',color:'#7c3aed',subcats:{smartphone:'Galaxy S/A/Z 스마트폰',tablet:'Galaxy Tab 태블릿',pc:'Galaxy Book PC',wearable:'Galaxy Watch/Buds/Ring'}},
  VD:{name:'VD (영상디스플레이)',color:'#1428A0',subcats:{tv:'QLED/OLED/Neo QLED TV',monitor:'Odyssey/ViewFinity 모니터',audio:'Soundbar/오디오'}},
  DA:{name:'DA (생활가전)',color:'#059669',subcats:{refrigerator:'냉장고 (Bespoke)',washer:'세탁기/건조기',aircon:'에어컨',cooking:'오븐/전자레인지',dishwasher:'식기세척기',vacuum:'청소기'}},
};

/* mock RRP ranges by BU/subcat in KRW (other currencies scaled) */
const RRP_RANGE = {
  smartphone:[800000,2000000],tablet:[600000,1600000],pc:[1200000,3500000],wearable:[200000,800000],
  tv:[800000,8000000],monitor:[400000,2500000],audio:[150000,1800000],
  refrigerator:[800000,4000000],washer:[500000,2500000],aircon:[600000,3000000],cooking:[100000,800000],dishwasher:[300000,1200000],vacuum:[100000,800000],
};

/* ══════════════════ AUTH ══════════════════ */
const Auth = {
  _users(){ return JSON.parse(localStorage.getItem('spm_users')||'[]'); },
  _setUsers(u){ localStorage.setItem('spm_users',JSON.stringify(u)); },
  current(){ return JSON.parse(localStorage.getItem('spm_user')||'null'); },
  register(name,email,password,bu){
    if(!email.toLowerCase().endsWith('@samsung.com')) throw new Error('@samsung.com 이메일만 가입 가능합니다');
    if(password.length<8) throw new Error('비밀번호는 8자 이상이어야 합니다');
    const users=this._users();
    if(users.find(u=>u.email===email)) throw new Error('이미 가입된 이메일입니다');
    const user={id:Date.now(),name,email,bu,joinedAt:new Date().toISOString(),pw:btoa(password)};
    users.push(user); this._setUsers(users);
    localStorage.setItem('spm_user',JSON.stringify(user));
    return user;
  },
  login(email,password){
    const users=this._users();
    const user=users.find(u=>u.email===email&&u.pw===btoa(password));
    if(!user) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
    localStorage.setItem('spm_user',JSON.stringify(user));
    return user;
  },
  logout(){ localStorage.removeItem('spm_user'); },
  isLoggedIn(){ return !!this.current(); }
};

/* ══════════════════ SKU STORE ══════════════════ */
const Store = {
  _key:'spm_skus',
  all(){ return JSON.parse(localStorage.getItem(this._key)||'[]'); },
  save(list){ localStorage.setItem(this._key,JSON.stringify(list)); },
  add(sku){ const l=this.all(); l.push(sku); this.save(l); return sku; },
  update(id,patch){ const l=this.all(); const i=l.findIndex(s=>s.id===id); if(i>=0){l[i]={...l[i],...patch};this.save(l);} },
  remove(id){ const l=this.all().filter(s=>s.id!==id); this.save(l); },
};

/* ══════════════════ STATE ══════════════════ */
const S = {
  page:'dashboard', buFilter:'all', subcatFilter:'all',
  contFilter:'all', countryFilter:'all', statusFilter:'all', query:'',
};

/* ══════════════════ UTILS ══════════════════ */
const $=id=>document.getElementById(id);
const fmt=(n,sym)=>n?`${sym}${Number(n).toLocaleString()}`:'─';
const pct=(v,b)=>b?((v-b)/b*100).toFixed(1):null;
function showToast(msg,type='info'){
  const c=$('toast-container'),t=document.createElement('div');
  t.className=`toast toast-${type}`;
  t.innerHTML=`<span class="toast-icon">${{success:'✅',error:'❌',info:'ℹ️'}[type]}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(20px)';t.style.transition='all 0.3s';setTimeout(()=>t.remove(),300);},3000);
}
function openOverlay(id){ $(id).classList.add('open'); }
function closeOverlay(id){ $(id).classList.remove('open'); }

/* generate mock prices around RRP */
function mockPrice(rrp, jitter=0.08){
  const d=(Math.random()*2-1)*jitter;
  return Math.round(rrp*(1+d)/100)*100;
}
function genRetailerPrices(country, rrp){
  const prices={};
  GEO.countries[country]?.retailers.forEach(r=>{
    prices[r.id]= Math.random()>0.1 ? mockPrice(rrp,0.07) : 0;
  });
  return prices;
}
function genRRP(subcat){
  const [lo,hi]=RRP_RANGE[subcat]||[500000,2000000];
  return Math.round((lo+Math.random()*(hi-lo))/10000)*10000;
}

/* ══════════════════ VIEW MANAGER ══════════════════ */
function showView(name){
  ['landing','auth','app'].forEach(v=>{
    const el=$(`view-${v}`);
    if(el) el.classList.toggle('active',v===name);
  });
}

/* ══════════════════ AUTH UI ══════════════════ */
function initAuth(){
  /* landing buttons */
  $('landing-login-btn')?.addEventListener('click',()=>{ showView('auth'); switchTab('login'); });
  $('landing-register-btn')?.addEventListener('click',()=>{ showView('auth'); switchTab('register'); });
  $('hero-register-btn')?.addEventListener('click',()=>{ showView('auth'); switchTab('register'); });
  $('hero-login-btn')?.addEventListener('click',()=>{ showView('auth'); switchTab('login'); });
  $('auth-back-btn')?.addEventListener('click',()=>showView('landing'));
  $('switch-to-register')?.addEventListener('click',e=>{e.preventDefault();switchTab('register');});
  $('switch-to-login')?.addEventListener('click',e=>{e.preventDefault();switchTab('login');});
  document.querySelectorAll('.auth-tab').forEach(t=>t.addEventListener('click',()=>switchTab(t.dataset.tab)));

  /* email domain badge */
  $('reg-email')?.addEventListener('input',e=>{
    const v=e.target.value; const b=$('email-domain-badge');
    if(!v){b.style.display='none';return;}
    b.style.display='block';
    if(v.endsWith('@samsung.com')){b.className='input-suffix-badge valid';b.textContent='✓ 삼성';}
    else if(v.includes('@')){b.className='input-suffix-badge invalid';b.textContent='✗ 불가';}
    else{b.style.display='none';}
  });

  /* login */
  $('form-login')?.addEventListener('submit',e=>{
    e.preventDefault();
    const err=$('login-error'); err.classList.remove('visible');
    try{
      Auth.login($('login-email').value.trim(),$('login-password').value);
      enterApp();
    }catch(ex){err.textContent=ex.message;err.classList.add('visible');}
  });

  /* register */
  $('form-register')?.addEventListener('submit',e=>{
    e.preventDefault();
    const err=$('register-error'); err.classList.remove('visible');
    const p=$('reg-password').value, p2=$('reg-password2').value;
    if(p!==p2){err.textContent='비밀번호가 일치하지 않습니다';err.classList.add('visible');return;}
    try{
      Auth.register($('reg-name').value.trim(),$('reg-email').value.trim(),p,$('reg-bu').value);
      enterApp();
    }catch(ex){err.textContent=ex.message;err.classList.add('visible');}
  });
}

function switchTab(tab){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.toggle('active',f.id===`form-${tab}`));
}

function enterApp(){
  const user=Auth.current(); if(!user) return;
  $('sidebar-name').textContent=user.name;
  $('sidebar-role').textContent=user.bu||'Samsung Electronics';
  $('sidebar-avatar').textContent=user.name.slice(0,2).toUpperCase();
  if($('account-settings-body')){
    $('account-settings-body').innerHTML=`
      <div class="account-row"><div class="account-label">성명</div><div class="account-value">${user.name}</div></div>
      <div class="account-row"><div class="account-label">이메일</div><div class="account-value">${user.email}</div></div>
      <div class="account-row"><div class="account-label">사업부</div><div class="account-value">${user.bu||'-'}</div></div>
      <div class="account-row"><div class="account-label">가입일</div><div class="account-value">${new Date(user.joinedAt).toLocaleDateString('ko-KR')}</div></div>`;
  }
  populateCountrySelect();
  populateTrendSelect();
  showView('app');
  renderAll();
}

/* ══════════════════ COUNTRY SELECTS ══════════════════ */
function populateCountrySelect(){
  const sel=$('geo-country-select'); if(!sel) return;
  sel.innerHTML='<option value="all">모든 국가</option>';
  const cont=S.contFilter==='all'?null:GEO.continents[S.contFilter]?.countries;
  Object.entries(GEO.countries).forEach(([code,c])=>{
    if(cont&&!cont.includes(code)) return;
    const o=document.createElement('option');
    o.value=code; o.text=`${c.flag} ${c.name}`;
    sel.appendChild(o);
  });
  const formSel=$('form-country'); if(!formSel) return;
  formSel.innerHTML='<option value="">국가 선택…</option>';
  Object.entries(GEO.countries).forEach(([code,c])=>{
    const o=document.createElement('option');
    o.value=code; o.text=`${c.flag} ${c.name} (${c.currency})`;
    formSel.appendChild(o);
  });
}

function populateTrendSelect(){
  const sel=$('trend-sku-select'); if(!sel) return;
  sel.innerHTML='<option value="">SKU 선택…</option>';
  Store.all().forEach(s=>{
    const o=document.createElement('option');
    o.value=s.id; o.text=`${s.name} (${s.sku})`;
    sel.appendChild(o);
  });
}

/* ══════════════════ BU / SUBCAT FILTER ══════════════════ */
function renderSubcatChips(){
  const wrap=$('subcat-chips'); if(!wrap) return;
  wrap.innerHTML='';
  if(S.buFilter==='all') return;
  Object.entries(BU[S.buFilter]?.subcats||{}).forEach(([id,label])=>{
    const b=document.createElement('button');
    b.className='subcat-chip'+(S.subcatFilter===id?' active':'');
    b.textContent=label; b.dataset.subcat=id;
    b.addEventListener('click',()=>{
      S.subcatFilter=S.subcatFilter===id?'all':id;
      renderSubcatChips(); renderTable();
    });
    wrap.appendChild(b);
  });
}

/* ══════════════════ KPI ══════════════════ */
function renderKPIs(){
  const all=filteredSKUs();
  const alert=all.filter(s=>s.status==='alert');
  const comp=all.length?Math.round((all.length-alert.length)/all.length*100):0;
  const countries=[...new Set(all.map(s=>s.country))];
  $('kpi-total-sku').textContent=all.length;
  $('kpi-alert-sku').textContent=alert.length;
  $('kpi-compliance').textContent=comp+'%';
  $('kpi-countries').textContent=countries.length;
  $('kpi-comp-sub').className='kpi-change '+(comp>=80?'positive':comp>=60?'neutral':'negative');
  $('alert-badge').textContent=alert.length;
  $('alert-count').textContent=alert.length;
}

/* ══════════════════ FILTER LOGIC ══════════════════ */
function filteredSKUs(){
  return Store.all().filter(s=>{
    if(S.buFilter!=='all'&&s.bu!==S.buFilter) return false;
    if(S.subcatFilter!=='all'&&s.subcat!==S.subcatFilter) return false;
    if(S.countryFilter!=='all'&&s.country!==S.countryFilter) return false;
    if(S.contFilter!=='all'){
      const c=GEO.continents[S.contFilter]?.countries||[];
      if(!c.includes(s.country)) return false;
    }
    if(S.statusFilter!=='all'&&s.status!==S.statusFilter) return false;
    if(S.query&&!s.name.toLowerCase().includes(S.query)&&!s.sku.toLowerCase().includes(S.query)) return false;
    return true;
  });
}

/* ══════════════════ PRICE TABLE ══════════════════ */
function renderTable(){
  const rows=filteredSKUs();
  const thead=$('price-table-head');
  const tbody=$('price-table-body');
  if(!thead||!tbody) return;

  /* Determine which country's retailers to show in columns */
  const showCountry=S.countryFilter!=='all'?S.countryFilter:(rows[0]?.country||'KR');
  const retailers=GEO.countries[showCountry]?.retailers||[];
  const cInfo=GEO.countries[showCountry];

  thead.innerHTML=`<tr>
    <th class="th-sticky">제품명 / SKU</th>
    <th>BU</th><th>제품군</th>
    <th>국가</th>
    <th class="th-ref"><span class="ref-badge">RRP</span>Samsung.com</th>
    <th class="th-sam"><span class="sam-badge">현재가</span>Samsung.com</th>
    ${retailers.map(r=>`<th><div class="retailer-header"><div class="rh-logo" style="background:${r.color}">${r.logo}</div><span>${r.name}</span></div></th>`).join('')}
    <th>상태</th><th>업데이트</th>
  </tr>`;

  if(!rows.length){
    tbody.innerHTML=`<tr><td colspan="${9+retailers.length}" class="empty-table">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
      <p>등록된 SKU가 없습니다. SKU를 추가하거나 Excel로 가져오세요.</p></td></tr>`;
    return;
  }

  tbody.innerHTML='';
  rows.forEach(sku=>{
    const coun=GEO.countries[sku.country]||{sym:'₩',flag:'',name:sku.country,retailers:[]};
    const skuRetailers=sku.country===showCountry?retailers:(GEO.countries[sku.country]?.retailers||[]);
    const usedRetailers=S.countryFilter!=='all'?retailers:skuRetailers;
    const sym=coun.sym;
    const statusMap={ok:'정상',alert:'이탈',warn:'확인필요',crawling:'조회중'};
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td class="td-sticky"><div class="product-info">
        <span class="product-name">${sku.name}</span>
        <span class="product-sku">${sku.sku}</span>
        <span class="bu-badge bu-${sku.bu}">${sku.bu}</span>
      </div></td>
      <td><span class="bu-badge bu-${sku.bu}">${BU[sku.bu]?.name.split(' ')[0]||sku.bu}</span></td>
      <td><span class="cat-chip cat-${sku.subcat}">${BU[sku.bu]?.subcats[sku.subcat]||sku.subcat}</span></td>
      <td><span class="country-cell">${coun.flag} ${coun.name}</span></td>
      <td><span class="price-base">${fmt(sku.rrp,sym)}</span></td>
      <td><span class="price-sam">${fmt(sku.currentPrice,sym)}</span>${diffBadge(sku.currentPrice,sku.rrp)}</td>
      ${usedRetailers.map(r=>{
        const p=(sku.retailerPrices||{})[r.id]||0;
        return `<td>${p?`${priceCls(p,sku.rrp,sku.threshold,sym)}${diffBadge(p,sku.rrp)}`:'<span class="price-na">─</span>'}</td>`;
      }).join('')}
      <td><span class="status-chip status-${sku.status}">${statusMap[sku.status]||'─'}</span></td>
      <td><span class="update-time">${sku.crawledAt||'─'}</span></td>`;
    tr.addEventListener('click',()=>openEditModal(sku.id));
    tbody.appendChild(tr);
  });
}

function diffBadge(v,b){
  if(!v||!b) return '';
  const d=parseFloat(pct(v,b));
  const cls=d>0?'diff-up':d<0?'diff-down':'diff-eq';
  const arr=d>0?'▲':d<0?'▼':'─';
  return `<span class="diff-badge ${cls}">${arr}${Math.abs(d)}%</span>`;
}
function priceCls(p,rrp,thr,sym){
  const d=Math.abs(parseFloat(pct(p,rrp)));
  const cls=d>thr?(parseFloat(pct(p,rrp))>0?'price-high':'price-low'):'price-ok';
  return `<span class="price-cell ${cls}">${fmt(p,sym)}</span>`;
}

/* ══════════════════ BAR CHART ══════════════════ */
function renderBarChart(){
  const c=$('bar-chart-container'); if(!c) return;
  const skus=filteredSKUs(); c.innerHTML='';
  const counts={};
  skus.forEach(s=>{
    const retailers=GEO.countries[s.country]?.retailers||[];
    retailers.forEach(r=>{
      const p=(s.retailerPrices||{})[r.id];
      if(p&&Math.abs(parseFloat(pct(p,s.rrp)))>(s.threshold||5)){
        if(!counts[r.name]) counts[r.name]={count:0,color:r.color};
        counts[r.name].count++;
      }
    });
  });
  const sorted=Object.entries(counts).sort((a,b)=>b[1].count-a[1].count).slice(0,6);
  if(!sorted.length){c.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted);font-size:0.85rem">이탈 데이터 없음</div>';return;}
  const max=Math.max(...sorted.map(([,v])=>v.count),1);
  sorted.forEach(([name,{count,color}])=>{
    const row=document.createElement('div'); row.className='chart-bar-row';
    row.innerHTML=`<span class="chart-label">${name}</span>
      <div class="chart-bar-track"><div class="chart-bar-fill" data-w="${count/max*100}" style="background:${color}"></div></div>
      <span class="chart-count">${count}</span>`;
    c.appendChild(row);
  });
  requestAnimationFrame(()=>{ document.querySelectorAll('.chart-bar-fill').forEach(el=>{el.style.width=el.dataset.w+'%';}); });
}

/* ══════════════════ ALERT LIST ══════════════════ */
function renderAlertList(){
  const list=$('alert-list'); if(!list) return;
  const alerts=Store.all().filter(s=>s.status==='alert').slice(0,8);
  if(!alerts.length){list.innerHTML='<div class="alert-item"><div class="alert-body"><div class="alert-title" style="color:var(--text-muted)">현재 이탈 알림이 없습니다</div></div></div>';return;}
  list.innerHTML=alerts.map(s=>{
    const coun=GEO.countries[s.country]||{sym:'₩',flag:'',name:s.country};
    const maxDev=Object.entries(s.retailerPrices||{}).reduce((mx,[,p])=>{
      if(!p) return mx; const d=Math.abs(parseFloat(pct(p,s.rrp))); return d>mx?d:mx;
    },0);
    return `<div class="alert-item">
      <div class="alert-dot alert-dot--red"></div>
      <div class="alert-body">
        <div class="alert-title">${coun.flag} ${s.name} — 최대 ${maxDev.toFixed(1)}% 이탈</div>
        <div class="alert-meta">${s.sku} · ${coun.name} · ${s.crawledAt||'─'}</div>
      </div></div>`;
  }).join('');
}

/* ══════════════════ ALERTS PAGE ══════════════════ */
function renderAlertsPage(){
  const rules=$('alert-rules'); if(rules) rules.innerHTML=`
    <div class="alert-rule-item"><div><div class="rule-name">고가 이탈 알림</div><div class="rule-desc">거래선 가격이 Samsung.com RRP보다 높을 때</div></div><span class="rule-threshold">+5%</span></div>
    <div class="alert-rule-item"><div><div class="rule-name">저가 이탈 알림</div><div class="rule-desc">거래선 가격이 Samsung.com RRP보다 낮을 때</div></div><span class="rule-threshold">-5%</span></div>
    <div class="alert-rule-item"><div><div class="rule-name">가격 미등록</div><div class="rule-desc">거래선에 가격 정보가 없을 때</div></div><span class="rule-threshold">N/A</span></div>`;
  const hist=$('alert-history'); if(!hist) return;
  const alerts=Store.all().filter(s=>s.status==='alert');
  if(!alerts.length){hist.innerHTML='<div style="padding:24px;text-align:center;color:var(--text-muted)">알림 히스토리 없음</div>';return;}
  hist.innerHTML=alerts.map(s=>{
    const coun=GEO.countries[s.country]||{flag:'',name:s.country};
    return `<div class="history-item">
      <div class="history-icon history-icon--red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg></div>
      <div><div class="history-title">${coun.flag} ${s.name} 가격 이탈</div><div class="history-time">${s.sku} · ${coun.name} · ${s.crawledAt||'─'}</div></div>
    </div>`;
  }).join('');
}

/* ══════════════════ CHANNELS PAGE ══════════════════ */
function renderChannels(){
  const grid=$('channel-grid'); if(!grid) return;
  grid.innerHTML='';
  Object.entries(GEO.countries).forEach(([code,c])=>{
    const skus=Store.all().filter(s=>s.country===code);
    const alertCount=skus.filter(s=>s.status==='alert').length;
    const card=document.createElement('div'); card.className='channel-card';
    card.innerHTML=`<div class="channel-card-top">
        <div style="font-size:2rem">${c.flag}</div>
        <div><div class="channel-name">${c.name}</div><div class="channel-country">${c.currency} · ${c.continent}</div></div>
      </div>
      <div class="channel-stats">
        <div class="channel-stat"><div class="channel-stat-label">모니터링 SKU</div><div class="channel-stat-value">${skus.length}</div></div>
        <div class="channel-stat"><div class="channel-stat-label">이탈 건수</div><div class="channel-stat-value" style="${alertCount?'color:var(--accent-red)':''}">${alertCount}</div></div>
      </div>
      <div style="margin-top:12px;font-size:0.75rem;color:var(--text-muted);font-weight:600">거래선 (매출 순)</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">
        ${c.retailers.map((r,i)=>`<span style="font-size:0.7rem;font-weight:700;padding:2px 8px;border-radius:999px;background:${r.color}22;color:${r.color};border:1px solid ${r.color}44">${i+1}. ${r.name}</span>`).join('')}
      </div>`;
    grid.appendChild(card);
  });
}

/* ══════════════════ TREND CHART ══════════════════ */
function renderTrendChart(skuId){
  const area=$('trend-chart-area'); if(!area) return;
  if(!skuId){area.innerHTML='<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><p>SKU를 선택하면 가격 추이가 표시됩니다</p></div>';return;}
  const sku=Store.all().find(s=>s.id==skuId); if(!sku) return;
  const retailers=GEO.countries[sku.country]?.retailers||[];
  const W=700,H=240,PAD=44;
  const DAYS=Array.from({length:14},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(13-i));return`${d.getMonth()+1}/${d.getDate()}`;});
  const series=retailers.map(r=>{
    const base=(sku.retailerPrices||{})[r.id]||sku.rrp;
    return DAYS.map((_,i)=>Math.round(base*(1+(Math.sin(i*0.8+Math.random())*0.04))));
  });
  series.unshift(DAYS.map(()=>sku.rrp)); // Samsung.com RRP line
  const allP=series.flat();
  const minP=Math.min(...allP)*0.97, maxP=Math.max(...allP)*1.03;
  const xPos=i=>PAD+i*((W-PAD*2)/(DAYS.length-1));
  const yPos=p=>H-PAD-(p-minP)/(maxP-minP)*(H-PAD*2);
  const colors=['#1428A0',...retailers.map(r=>r.color)];
  let paths='',dots='';
  series.forEach((pts,ci)=>{
    const d=pts.map((p,i)=>`${i?'L':'M'}${xPos(i)},${yPos(p)}`).join(' ');
    const dashed=ci===0?'stroke-dasharray="6,4"':'';
    paths+=`<path d="${d}" fill="none" stroke="${colors[ci]}" stroke-width="${ci===0?1.5:2}" ${dashed} opacity="0.9"/>`;
    dots+=`<circle cx="${xPos(pts.length-1)}" cy="${yPos(pts[pts.length-1])}" r="4" fill="${colors[ci]}"/>`;
  });
  let yLabels='',xLabels='';
  for(let i=0;i<=4;i++){const p=minP+(maxP-minP)*i/4;const y=yPos(p);yLabels+=`<text x="${PAD-4}" y="${y+4}" text-anchor="end" fill="#8694b8" font-size="10">${sku.country==='KR'?`₩${Math.round(p/10000)}만`:`${GEO.countries[sku.country]?.sym||''}${Math.round(p/100)*100}`}</text><line x1="${PAD}" y1="${y}" x2="${W-PAD}" y2="${y}" stroke="rgba(20,40,160,0.07)" stroke-width="1"/>`;}
  DAYS.forEach((d,i)=>{if(i%2===0||i===DAYS.length-1)xLabels+=`<text x="${xPos(i)}" y="${H-6}" text-anchor="middle" fill="#8694b8" font-size="10">${d}</text>`;});
  const legend=[{name:'Samsung.com RRP',color:'#1428A0'},...retailers].map(r=>`<div class="legend-item"><div class="legend-dot" style="background:${r.color}"></div>${r.name}</div>`).join('');
  area.innerHTML=`<div style="width:100%"><div class="trend-legend">${legend}</div><svg viewBox="0 0 ${W} ${H}" style="width:100%;overflow:visible">${yLabels}${paths}${dots}${xLabels}</svg></div>`;
}

/* ══════════════════ REAL CRAWL VIA NETLIFY FUNCTIONS ══════════════════
   Netlify Functions가 배포되어 있으면 실제 API 호출,
   없으면(로컬/파일 직접 열기) mock 시뮬레이션으로 자동 폴백
   ════════════════════════════════════════════════════════════════════ */

/** Netlify Functions 사용 가능 여부 확인 */
const IS_NETLIFY = window.location.hostname !== '' &&
                   !window.location.protocol.startsWith('file');

/** API 호출 래퍼 — 실패 시 null 반환 */
async function callFunction(name, payload) {
  try {
    const res = await fetch(`/.netlify/functions/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[crawl] ${name} 호출 실패:`, err.message);
    return null;
  }
}

/** 진행 단계 UI 업데이트 */
function setCrawlStep(steps, index, status) {
  const el = document.getElementById(`cs-${index}`);
  if (!el) return;
  const label = steps[index].label;
  if (status === 'active') {
    el.className = 'crawl-step active';
    el.innerHTML = `<div class="cs-spin"></div><span class="cs-label">${label}</span>`;
  } else if (status === 'done') {
    el.className = 'crawl-step done';
    el.innerHTML = `<span class="cs-icon">✅</span><span class="cs-label">${label}</span>`;
  } else if (status === 'error') {
    el.className = 'crawl-step warn';
    el.innerHTML = `<span class="cs-icon">⚠️</span><span class="cs-label">${label} (폴백 사용)</span>`;
  }
}

async function runCrawl(skuList) {
  openOverlay('crawl-overlay');

  for (const sku of skuList) {
    const coun = GEO.countries[sku.country] || { sym: '₩', flag: '', retailers: [] };
    $('crawl-product-info').innerHTML =
      `<strong>${sku.name}</strong> (${sku.sku}) · ${coun.flag} ${sku.country}`;

    /* ── 단계 목록 렌더링 ── */
    const steps = [
      { label: 'Samsung.com 현재 판매가 조회 중…' },
      ...coun.retailers.map(r => ({ label: `${r.name} 가격 수집 중…` })),
      { label: '가격 이탈 분석 및 저장 완료 ✓' },
    ];
    const stepsEl = $('crawl-steps');
    stepsEl.innerHTML = '';
    steps.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'crawl-step pending'; d.id = `cs-${i}`;
      d.innerHTML = `<span class="cs-icon"></span><span class="cs-label">${s.label}</span>`;
      stepsEl.appendChild(d);
    });

    let newCurrentPrice = null;
    let newRetailerPrices = { ...(sku.retailerPrices || {}) };

    /* ── STEP 0: Samsung.com 가격 조회 ── */
    setCrawlStep(steps, 0, 'active');

    if (IS_NETLIFY) {
      const samRes = await callFunction('crawl-samsung', { sku: sku.sku, country: sku.country });
      if (samRes && samRes.currentPrice) {
        newCurrentPrice = samRes.currentPrice;
        setCrawlStep(steps, 0, 'done');
        // 반환된 제품명으로 거래선 검색 시 더 정확함
        sku._fetchedName = samRes.productName || sku.name;
      } else {
        setCrawlStep(steps, 0, 'error');
        newCurrentPrice = mockPrice(sku.rrp, 0.02); // 폴백
      }
    } else {
      // 파일 직접 열기 / 로컬: mock 시뮬레이션
      await new Promise(r => setTimeout(r, 900));
      newCurrentPrice = mockPrice(sku.rrp, 0.02);
      setCrawlStep(steps, 0, 'done');
    }

    /* ── STEP 1~N: 거래선 가격 수집 ── */
    // 거래선은 한 번의 API 호출로 모두 받아온 뒤 단계별로 UI 업데이트
    let retailerResult = null;

    if (IS_NETLIFY) {
      // 비동기로 API 호출 (UI는 단계별로 표시)
      const retailerPromise = callFunction('crawl-retailer', {
        sku: sku.sku,
        country: sku.country,
        productName: sku._fetchedName || sku.name,
      });

      // 각 거래선 단계 UI 애니메이션 (API 응답 기다리는 동안 표시)
      for (let i = 1; i < steps.length - 1; i++) {
        setCrawlStep(steps, i, 'active');
        await new Promise(r => setTimeout(r, 500));
      }

      retailerResult = await retailerPromise;
    } else {
      // 로컬 mock
      for (let i = 1; i < steps.length - 1; i++) {
        setCrawlStep(steps, i, 'active');
        await new Promise(r => setTimeout(r, 400));
      }
    }

    /* ── 거래선 가격 병합 ── */
    if (retailerResult && retailerResult.prices) {
      coun.retailers.forEach((r, idx) => {
        const mallData = retailerResult.prices[r.id];
        if (mallData && mallData.price) {
          newRetailerPrices[r.id] = mallData.price;
          setCrawlStep(steps, idx + 1, 'done');
        } else {
          // API에서 해당 거래선 미발견 → mock 유지
          if (!newRetailerPrices[r.id]) newRetailerPrices[r.id] = mockPrice(sku.rrp, 0.07);
          setCrawlStep(steps, idx + 1, retailerResult.prices._status === 'not_configured' ? 'error' : 'done');
        }
      });
    } else {
      // API 전체 실패 → 모두 mock
      coun.retailers.forEach((r, idx) => {
        if (!newRetailerPrices[r.id]) newRetailerPrices[r.id] = mockPrice(sku.rrp, 0.07);
        setCrawlStep(steps, idx + 1, 'error');
      });
    }

    /* ── 마지막 단계: 상태 판정 및 저장 ── */
    const lastIdx = steps.length - 1;
    setCrawlStep(steps, lastIdx, 'active');

    const allPrices = Object.values(newRetailerPrices).filter(Boolean);
    const status = allPrices.some(p => Math.abs(parseFloat(pct(p, sku.rrp))) > (sku.threshold || 5))
      ? 'alert' : 'ok';

    Store.update(sku.id, {
      currentPrice:   newCurrentPrice,
      retailerPrices: newRetailerPrices,
      status,
      crawledAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    });

    await new Promise(r => setTimeout(r, 300));
    setCrawlStep(steps, lastIdx, 'done');
    await new Promise(r => setTimeout(r, 500));
  }

  closeOverlay('crawl-overlay');
  renderAll();
  showToast(`${skuList.length}개 SKU 가격 조회 완료`, 'success');
}


/* ══════════════════ SKU MODAL ══════════════════ */
function openAddModal(){
  $('modal-title').textContent='SKU 추가';
  ['form-name','form-sku','form-url'].forEach(id=>$(id)&&($(id).value=''));
  $('form-bu').value=''; $('form-subcat').value=''; $('form-country').value=''; $('form-threshold').value=5;
  $('crawl-preview').style.display='none';
  openOverlay('modal-overlay');
}
function openEditModal(id){
  const sku=Store.all().find(s=>s.id===id); if(!sku) return;
  $('modal-title').textContent='SKU 수정';
  $('form-name').value=sku.name; $('form-sku').value=sku.sku;
  $('form-bu').value=sku.bu; updateSubcatOptions(); $('form-subcat').value=sku.subcat;
  $('form-country').value=sku.country; $('form-threshold').value=sku.threshold||5;
  $('form-url').value=sku.url||'';
  updateCrawlPreview();
  openOverlay('modal-overlay');
}
window.updateSubcatOptions=function(){
  const bu=$('form-bu').value; const sel=$('form-subcat'); if(!sel) return;
  sel.innerHTML='<option value="">제품군 선택…</option>';
  Object.entries(BU[bu]?.subcats||{}).forEach(([id,label])=>{const o=document.createElement('option');o.value=id;o.text=label;sel.appendChild(o);});
  updateCrawlPreview();
};
function updateCrawlPreview(){
  const country=$('form-country').value, subcat=$('form-subcat').value;
  const preview=$('crawl-preview'); if(!preview) return;
  if(!country||!subcat){preview.style.display='none';return;}
  const c=GEO.countries[country]||{sym:'₩',retailers:[]};
  const rrp=genRRP(subcat);
  preview.style.display='block';
  $('cp-rrp').textContent=`${c.sym}${rrp.toLocaleString()} (자동 조회 예정)`;
  $('cp-current').textContent=`${c.sym}${mockPrice(rrp,0.02).toLocaleString()} (자동 조회 예정)`;
  $('cp-retailers').textContent=c.retailers.map((r,i)=>`${i+1}.${r.name}`).join(', ');
}
function saveModal(){
  const name=$('form-name').value.trim(), sku=$('form-sku').value.trim();
  const bu=$('form-bu').value, subcat=$('form-subcat').value, country=$('form-country').value;
  if(!name||!sku||!bu||!subcat||!country){showToast('필수 항목을 모두 입력하세요','error');return;}
  const rrp=genRRP(subcat);
  const retailerPrices=genRetailerPrices(country,rrp);
  const newSku={id:Date.now(),name,sku,bu,subcat,country,threshold:parseInt($('form-threshold').value)||5,
    rrp,currentPrice:mockPrice(rrp,0.02),retailerPrices,url:$('form-url').value,
    status:'crawling',crawledAt:'─'};
  Store.add(newSku);
  closeOverlay('modal-overlay');
  populateTrendSelect();
  runCrawl([newSku]);
}

/* ══════════════════ IMPORT ══════════════════ */
let importRows=[];
function parseCSV(text){
  importRows=[];
  text.split('\n').map(l=>l.trim()).filter(Boolean).forEach(line=>{
    const [skuCode,pName,pBu,pSubcat,pCountry]= line.split(/,|\t/).map(s=>s.trim());
    if(!skuCode||skuCode.toLowerCase()==='sku코드') return;
    const valid=!!(pName&&BU[pBu]&&BU[pBu].subcats[pSubcat]&&GEO.countries[pCountry]);
    importRows.push({skuCode,pName,pBu,pSubcat,pCountry,valid});
  });
  renderImportPreview();
}
function renderImportPreview(){
  const tbody=$('import-preview-body'); if(!tbody) return;
  if(!importRows.length){$('import-preview').style.display='none';$('btn-import-confirm').disabled=true;return;}
  $('import-preview').style.display='block';
  $('import-preview-count').textContent=`${importRows.length}개 행 감지 (유효: ${importRows.filter(r=>r.valid).length}개)`;
  tbody.innerHTML=importRows.map(r=>`<tr>
    <td><code>${r.skuCode}</code></td><td>${r.pName||'-'}</td><td>${r.pBu||'-'}</td>
    <td>${r.pSubcat||'-'}</td><td>${GEO.countries[r.pCountry]?.flag||''} ${r.pCountry||'-'}</td>
    <td class="${r.valid?'import-row-ok':'import-row-err'}">${r.valid?'✓ 유효':'✗ 오류'}</td>
  </tr>`).join('');
  $('btn-import-confirm').disabled=!importRows.some(r=>r.valid);
}
function confirmImport(){
  const valid=importRows.filter(r=>r.valid);
  const newSkus=valid.map(r=>{
    const rrp=genRRP(r.pSubcat);
    return {id:Date.now()+Math.random(),name:r.pName,sku:r.skuCode,bu:r.pBu,subcat:r.pSubcat,
      country:r.pCountry,threshold:5,rrp,currentPrice:mockPrice(rrp,0.02),
      retailerPrices:genRetailerPrices(r.pCountry,rrp),status:'crawling',crawledAt:'─'};
  });
  newSkus.forEach(s=>Store.add(s));
  closeOverlay('import-overlay');
  populateTrendSelect(); importRows=[];
  runCrawl(newSkus);
}

/* ══════════════════ MASTER RENDER ══════════════════ */
function renderAll(){
  renderKPIs(); renderTable(); renderBarChart(); renderAlertList(); renderSubcatChips();
  if(S.page==='alerts') renderAlertsPage();
  if(S.page==='channels') renderChannels();
}

/* ══════════════════ NAVIGATION ══════════════════ */
function navigateTo(page){
  S.page=page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  $(`page-${page}`)?.classList.add('active');
  $(`nav-${page}`)?.classList.add('active');
  const labels={dashboard:'대시보드','sku-list':'SKU 목록',alerts:'가격 알림',trend:'가격 추이',channels:'거래선 관리',settings:'설정'};
  $('breadcrumb').textContent=labels[page]||page;
  if(page==='alerts') renderAlertsPage();
  if(page==='channels') renderChannels();
}

/* ══════════════════ INIT ══════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  /* seed demo data if empty */
  if(!Store.all().length) seedDemoData();

  /* check auth */
  if(Auth.isLoggedIn()) enterApp(); else showView('landing');
  initAuth();

  /* nav */
  document.querySelectorAll('.nav-item').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();navigateTo(el.dataset.page);}));

  /* sidebar toggle */
  $('sidebar-toggle')?.addEventListener('click',()=>{
    const sb=$('sidebar');
    window.innerWidth<=768?sb.classList.toggle('mobile-open'):sb.classList.toggle('collapsed');
  });

  /* BU tabs */
  $('bu-tabs')?.addEventListener('click',e=>{
    const btn=e.target.closest('.bu-tab'); if(!btn) return;
    document.querySelectorAll('.bu-tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active'); S.buFilter=btn.dataset.bu; S.subcatFilter='all';
    renderSubcatChips(); renderTable(); renderKPIs();
  });

  /* continent tabs */
  $('continent-tabs')?.addEventListener('click',e=>{
    const btn=e.target.closest('.cont-tab'); if(!btn) return;
    document.querySelectorAll('.cont-tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active'); S.contFilter=btn.dataset.cont; S.countryFilter='all';
    populateCountrySelect(); $('geo-country-select').value='all';
    renderTable(); renderKPIs();
  });
  $('geo-country-select')?.addEventListener('change',e=>{S.countryFilter=e.target.value;renderTable();renderKPIs();});

  /* filter tabs */
  document.querySelectorAll('.filter-tab').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.filter-tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active'); S.statusFilter=t.dataset.filter; renderTable();
  }));

  /* search */
  $('search-input')?.addEventListener('input',e=>{S.query=e.target.value.toLowerCase();renderTable();});

  /* SKU modal */
  $('btn-add-sku')?.addEventListener('click',openAddModal);
  $('modal-close')?.addEventListener('click',()=>closeOverlay('modal-overlay'));
  $('btn-cancel')?.addEventListener('click',()=>closeOverlay('modal-overlay'));
  $('btn-save')?.addEventListener('click',saveModal);
  $('modal-overlay')?.addEventListener('click',e=>{if(e.target===$('modal-overlay'))closeOverlay('modal-overlay');});
  $('form-country')?.addEventListener('change',updateCrawlPreview);
  $('form-subcat')?.addEventListener('change',updateCrawlPreview);

  /* import */
  $('btn-import')?.addEventListener('click',()=>openOverlay('import-overlay'));
  $('import-close')?.addEventListener('click',()=>closeOverlay('import-overlay'));
  $('btn-import-cancel')?.addEventListener('click',()=>closeOverlay('import-overlay'));
  $('btn-import-confirm')?.addEventListener('click',()=>confirmImport());
  $('import-drop-zone')?.addEventListener('click',()=>$('import-file-input')?.click());
  $('import-file-input')?.addEventListener('change',e=>{
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader(); r.onload=ev=>parseCSV(ev.target.result); r.readAsText(f,'UTF-8');
  });
  ['dragover','dragleave','drop'].forEach(ev=>{
    $('import-drop-zone')?.addEventListener(ev,e=>{
      e.preventDefault();
      if(ev==='dragover') $('import-drop-zone').classList.add('dragover');
      else if(ev==='dragleave') $('import-drop-zone').classList.remove('dragover');
      else{$('import-drop-zone').classList.remove('dragover');const f=e.dataTransfer.files[0];if(f){const r=new FileReader();r.onload=ev2=>parseCSV(ev2.target.result);r.readAsText(f,'UTF-8');}}
    });
  });
  $('import-textarea')?.addEventListener('input',e=>{ if(e.target.value.trim()) parseCSV(e.target.value); });
  $('btn-download-template')?.addEventListener('click',()=>{
    const csv='\uFEFFSKU코드,제품명,사업부,제품군,국가코드\nSM-S938N,Galaxy S25 Ultra,MX,smartphone,KR\nSM-S938U,Galaxy S25 Ultra,MX,smartphone,US\nQN65QN90D,QLED 4K 65inch,VD,tv,KR\n';
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
    a.download='samsung_sku_template.csv'; a.click();
  });
  $('btn-clear-import')?.addEventListener('click',()=>{importRows=[];$('import-textarea').value='';renderImportPreview();});

  /* refresh */
  $('btn-refresh')?.addEventListener('click',()=>{
    const skus=filteredSKUs(); if(!skus.length){showToast('조회할 SKU가 없습니다','info');return;}
    const btn=$('btn-refresh'); btn.classList.add('spinning');
    showToast('가격 데이터 새로고침 시작…','info');
    skus.forEach(s=>{
      const rrp=s.rrp||genRRP(s.subcat);
      const retailerPrices=genRetailerPrices(s.country,rrp);
      const prices=Object.values(retailerPrices).filter(Boolean);
      const status=prices.some(p=>Math.abs(parseFloat(pct(p,rrp)))>(s.threshold||5))?'alert':'ok';
      Store.update(s.id,{retailerPrices,currentPrice:mockPrice(rrp,0.02),status,crawledAt:'방금'});
    });
    setTimeout(()=>{btn.classList.remove('spinning');renderAll();showToast('가격 데이터 업데이트 완료','success');},1800);
  });

  /* export */
  $('btn-export')?.addEventListener('click',()=>{
    const rows=filteredSKUs();
    const hdr='제품명,SKU,BU,제품군,국가,RRP,현재가,상태';
    const csv='\uFEFF'+hdr+'\n'+rows.map(s=>`${s.name},${s.sku},${s.bu},${s.subcat},${s.country},${s.rrp},${s.currentPrice},${s.status}`).join('\n');
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
    a.download=`samsung_price_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    showToast('CSV 내보내기 완료','success');
  });

  /* logout */
  $('logout-btn')?.addEventListener('click',()=>{Auth.logout();showView('landing');showToast('로그아웃 되었습니다','info');});

  /* trend */
  $('trend-sku-select')?.addEventListener('change',e=>renderTrendChart(e.target.value));

  /* toggles */
  document.querySelectorAll('.toggle').forEach(t=>t.addEventListener('click',()=>t.classList.toggle('active')));

  /* clock */
  function tick(){ const el=$('update-time'); if(el) el.textContent=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',second:'2-digit'})+' 기준'; }
  tick(); setInterval(tick,1000);
});

/* ══════════════════ DEMO SEED ══════════════════ */
function seedDemoData(){
  const demos=[
    {name:'Galaxy S25 Ultra',sku:'SM-S938N',bu:'MX',subcat:'smartphone',country:'KR'},
    {name:'Galaxy S25 Ultra',sku:'SM-S938U',bu:'MX',subcat:'smartphone',country:'US'},
    {name:'Galaxy S25+',sku:'SM-S936N',bu:'MX',subcat:'smartphone',country:'KR'},
    {name:'Galaxy Book 4 Ultra',sku:'NP960XMA',bu:'MX',subcat:'pc',country:'KR'},
    {name:'Galaxy Watch Ultra',sku:'SM-L705N',bu:'MX',subcat:'wearable',country:'KR'},
    {name:'Galaxy Tab S10 Ultra',sku:'SM-X926N',bu:'MX',subcat:'tablet',country:'KR'},
    {name:'Neo QLED 8K 85" QN800D',sku:'QN85QN800D',bu:'VD',subcat:'tv',country:'KR'},
    {name:'QLED 4K 65" QN90D',sku:'QN65QN90D',bu:'VD',subcat:'tv',country:'US'},
    {name:'Odyssey OLED G9 49"',sku:'LS49CG950S',bu:'VD',subcat:'monitor',country:'KR'},
    {name:'Soundbar HW-Q990D',sku:'HW-Q990D',bu:'VD',subcat:'audio',country:'KR'},
    {name:'Bespoke 냉장고 RF60DB',sku:'RF60DB9500',bu:'DA',subcat:'refrigerator',country:'KR'},
    {name:'Bespoke AI 세탁기',sku:'WF24CB6900',bu:'DA',subcat:'washer',country:'KR'},
  ];
  demos.forEach(d=>{
    const rrp=genRRP(d.subcat);
    const retailerPrices=genRetailerPrices(d.country,rrp);
    const prices=Object.values(retailerPrices).filter(Boolean);
    const status=prices.some(p=>Math.abs(parseFloat(pct(p,rrp)))>(5))?'alert':'ok';
    Store.add({id:Date.now()+Math.random(),...d,threshold:5,rrp,currentPrice:mockPrice(rrp,0.02),retailerPrices,status,crawledAt:'시범 데이터'});
  });
}
