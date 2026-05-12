/* WorldPulse static MVP — Netlify-ready */
const state = {
  page: 'home',
  currentCountry: null,
  focusedCountry: null,
  search: '',
  category: 'All',
  layer: { cities: true, ports: true, routes: false },
  countriesGeo: null,
  compareA: 'Singapore',
  compareB: 'Germany',
  story: null,
  storyLayer: 'quick',
  globeStory: null,
  globeStep: 0,
  tooltip: null,
  selectedItem: null
};

const categories = ['All','Development','Macro','Energy','Geopolitics','Logistics','Fintech','Industry'];
const globeTimers = {};
const remoteImageCache = new Map();
const remoteImagePending = new Map();
const cityTitleOverrides = {
  'Madrid':'Madrid',
  'Berlin':'Berlin',
  'Amsterdam':'Amsterdam',
  'Istanbul':'Istanbul',
  'Jakarta':'Jakarta',
  'Bangkok':'Bangkok',
  'Ho Chi Minh City':'Ho Chi Minh City',
  'Kuala Lumpur':'Kuala Lumpur',
  'Manila':'Manila',
  'Dhaka':'Dhaka',
  'Karachi':'Karachi',
  'Cairo':'Cairo',
  'Cape Town':'Cape Town',
  'Casablanca':'Casablanca',
  'Santiago':'Santiago',
  'Buenos Aires':'Buenos Aires',
  'Bogotá':'Bogotá',
  'Doha':'Doha',
  'Tehran':'Tehran',
  'Warsaw':'Warsaw',
  'Vienna':'Vienna',
  'Copenhagen':'Copenhagen',
  'Helsinki':'Helsinki',
  'Auckland':'Auckland',
  'Accra':'Accra',
  'New York':'New York City',
  'London':'London',
  'Paris':'Paris',
  'Singapore':'Singapore',
  'Shanghai':'Shanghai',
  'Shenzhen':'Shenzhen',
  'Tokyo':'Tokyo',
  'Seoul':'Seoul',
  'Dubai':'Dubai',
  'Riyadh':'Riyadh',
  'Mumbai':'Mumbai',
  'São Paulo':'São Paulo',
  'Lagos':'Lagos',
  'Nairobi':'Nairobi',
  'Mexico City':'Mexico City'
};
const portTitleOverrides = {
  'New York/New Jersey':'Port of New York and New Jersey',
  'Ho Chi Minh/Cat Lai':'Cat Lai Port',
  'Lagos/Apapa':'Apapa Port',
  'Tanger Med':'Tanger Med',
  'Ningbo-Zhoushan':'Port of Ningbo-Zhoushan',
  'Tanjung Pelepas':'Port of Tanjung Pelepas',
  'Port Klang':'Port Klang',
  'Laem Chabang':'Laem Chabang Port',
  'Manila Port':'Port of Manila',
  'Colombo':'Port of Colombo',
  'Mundra':'Mundra Port',
  'Chittagong':'Port of Chittagong',
  'Alexandria':'Port of Alexandria',
  'Mombasa':'Port of Mombasa',
  'Tema':'Tema Harbour',
  'Le Havre':'Port of Le Havre',
  'Valencia':'Port of Valencia',
  'Gioia Tauro':'Port of Gioia Tauro',
  'Algeciras':'Port of Algeciras',
  'Felixstowe':'Port of Felixstowe',
  'Vancouver':'Port of Vancouver',
  'Hong Kong':'Port of Hong Kong',
  'Qingdao':'Port of Qingdao',
  'Tianjin':'Port of Tianjin',
  'Kaohsiung':'Port of Kaohsiung',
  'Shanghai Port':'Port of Shanghai',
  'Singapore Port':'Port of Singapore',
  'Rotterdam':'Port of Rotterdam',
  'Los Angeles/Long Beach':'Port of Los Angeles',
  'Jebel Ali':'Jebel Ali Port',
  'Hamburg':'Port of Hamburg',
  'Busan':'Port of Busan',
  'Shenzhen/Yantian':'Yantian International Container Terminals',
  'Santos':'Port of Santos',
  'Durban':'Port of Durban',
  'Suez/Port Said':'Port Said',
  'Panama Canal':'Panama Canal',
  'Mumbai/JNPT':'Jawaharlal Nehru Port',
  'Piraeus':'Port of Piraeus',
  'Antwerp-Bruges':'Port of Antwerp-Bruges'
};
const countryPhotoQueries = {
  'United States':'New York skyline',
  'China':'Shanghai skyline',
  'Japan':'Tokyo skyline',
  'Germany':'Berlin skyline',
  'India':'Mumbai skyline',
  'United Kingdom':'London skyline',
  'France':'Paris skyline',
  'Italy':'Rome skyline',
  'Brazil':'Rio de Janeiro skyline',
  'Canada':'Toronto skyline',
  'Russia':'Moscow skyline',
  'Mexico':'Mexico City skyline',
  'South Korea':'Seoul skyline',
  'Australia':'Sydney skyline',
  'Spain':'Madrid skyline',
  'Indonesia':'Jakarta skyline',
  'Netherlands':'Amsterdam canals',
  'Saudi Arabia':'Riyadh skyline',
  'Turkey':'Istanbul skyline',
  'Switzerland':'Swiss Alps',
  'Taiwan':'Taipei skyline',
  'Poland':'Warsaw skyline',
  'Argentina':'Buenos Aires skyline',
  'Belgium':'Brussels skyline',
  'Sweden':'Stockholm skyline',
  'Ireland':'Dublin skyline',
  'Norway':'Oslo fjord',
  'Singapore':'Singapore skyline',
  'UAE':'Dubai skyline',
  'Israel':'Tel Aviv skyline',
  'Thailand':'Bangkok skyline',
  'Vietnam':'Ho Chi Minh City skyline',
  'Malaysia':'Kuala Lumpur skyline',
  'Philippines':'Manila skyline',
  'Bangladesh':'Dhaka skyline',
  'Pakistan':'Karachi skyline',
  'Egypt':'Cairo skyline',
  'South Africa':'Cape Town skyline',
  'Nigeria':'Lagos skyline',
  'Kenya':'Nairobi skyline',
  'Ethiopia':'Addis Ababa skyline',
  'Morocco':'Casablanca skyline',
  'Algeria':'Algiers skyline',
  'Chile':'Santiago skyline',
  'Peru':'Lima skyline',
  'Colombia':'Bogotá skyline',
  'Uruguay':'Montevideo skyline',
  'Qatar':'Doha skyline',
  'Iran':'Tehran skyline',
  'Iraq':'Baghdad skyline',
  'Greece':'Athens skyline',
  'Portugal':'Lisbon skyline',
  'Austria':'Vienna skyline',
  'Czechia':'Prague skyline',
  'Denmark':'Copenhagen skyline',
  'Romania':'Bucharest skyline',
  'Hungary':'Budapest skyline',
  'Finland':'Helsinki skyline',
  'New Zealand':'Auckland skyline',
  'Kazakhstan':'Astana skyline',
  'Ghana':'Accra skyline'
};

const countries = [
  ['United States','Americas','USD','$27.4T','$82,700','335M','Innovation-led services and industry','Low','Treasuries, Tech, Aircraft','Capital depth','Fiscal polarization','Debt politics',[-98,39]],
  ['China','Asia','CNY','$17.8T','$12,600','1.41B','State-led industrial capitalism','Medium','Electronics, Machinery, Solar','Industrial scale','Demographic decline','Property stress',[104,35]],
  ['Japan','Asia','JPY','$4.2T','$33,800','124M','Advanced export economy','Very High imports','Cars, Machinery, Chips tools','Technology base','Aging','Debt paradox',[138,37]],
  ['Germany','Europe','EUR','$4.4T','$53,000','84M','Social market economy','High post-Russia shock','Cars, Machinery, Chemicals','Industrial depth','Energy costs','Export slowdown',[10,51]],
  ['India','Asia','INR','$3.7T','$2,600','1.43B','Services-led emerging giant','Medium imports','IT services, Pharma, Textiles','Demographics','Infrastructure gaps','Jobs pressure',[78,22]],
  ['United Kingdom','Europe','GBP','$3.3T','$49,000','68M','Services and finance hub','Medium','Finance, Pharma, Cars','Global finance','Low investment','Productivity',[-2,54]],
  ['France','Europe','EUR','$3.0T','$46,000','68M','Diversified mixed economy','Low-medium nuclear','Aircraft, Luxury, Agri-food','Nuclear base','Public debt','Competitiveness',[2,46]],
  ['Italy','Europe','EUR','$2.3T','$39,000','59M','Industrial SMEs and tourism','High imports','Machinery, Fashion, Food','Northern industry','Debt level','Aging',[12,43]],
  ['Brazil','Americas','BRL','$2.1T','$10,300','215M','Mixed, commodity-driven','Low energy exporter','Soybeans, Iron Ore, Crude Oil','Resource abundance','Fiscal deficits','Deforestation sanctions',[-52,-10]],
  ['Canada','Americas','CAD','$2.1T','$53,000','40M','Resource-rich advanced economy','Low exporter','Oil, Cars, Wheat','Resources','Housing strain','Commodity cycles',[-106,56]],
  ['Russia','Europe/Asia','RUB','$2.0T','$14,000','144M','Resource and war economy','Low exporter','Oil, Gas, Metals','Energy leverage','Sanctions','Military spending',[90,60]],
  ['Mexico','Americas','MXN','$1.8T','$14,000','129M','Nearshoring industrial hub','Medium','Cars, Electronics, Oil','US access','Security issues','Water stress',[-102,23]],
  ['South Korea','Asia','KRW','$1.7T','$34,000','52M','Export industrial tech','High imports','Chips, Cars, Ships','Chaebols and tech','Demographics','China exposure',[128,36]],
  ['Australia','Oceania','AUD','$1.7T','$64,000','26M','Resource services economy','Low exporter','Iron Ore, Coal, LNG','Resources','China dependence','Climate risk',[134,-25]],
  ['Spain','Europe','EUR','$1.6T','$34,000','48M','Services, tourism, industry','Medium','Cars, Food, Tourism','Renewables','Unemployment','Tourism shocks',[-4,40]],
  ['Indonesia','Asia','IDR','$1.4T','$5,000','278M','Archipelago commodity industry','Medium','Coal, Palm Oil, Nickel','Nickel leverage','Logistics gaps','Climate exposure',[118,-2]],
  ['Netherlands','Europe','EUR','$1.1T','$63,000','18M','Trade, finance and logistics hub','Medium','Machinery, Chemicals, Food','Ports','Housing','Export exposure',[5,52]],
  ['Saudi Arabia','Middle East','SAR','$1.1T','$32,000','36M','Oil and sovereign wealth','Low exporter','Crude Oil, Petrochemicals','Energy reserves','Oil dependence','Transition risk',[45,24]],
  ['Turkey','Europe/Asia','TRY','$1.1T','$13,000','85M','Manufacturing bridge economy','High imports','Cars, Textiles, Steel','Strategic geography','Inflation','Currency risk',[35,39]],
  ['Switzerland','Europe','CHF','$900B','$100,000','9M','Finance, pharma, precision','Low','Pharma, Watches, Finance','Stability','High costs','Safe-haven pressure',[8,47]],
  ['Taiwan','Asia','TWD','$760B','$33,000','23M','Semiconductor-centered economy','High imports','Chips, Electronics','TSMC ecosystem','Geopolitical risk','Strait crisis',[121,24]],
  ['Poland','Europe','PLN','$750B','$20,000','38M','Manufacturing convergence economy','Medium','Machinery, Food, Cars','EU integration','Labor shortages','Security costs',[20,52]],
  ['Argentina','Americas','ARS','$640B','$14,000','46M','Agriculture and crisis-prone macro','Medium','Soy, Corn, Lithium','Food and minerals','Inflation','Debt crises',[-64,-34]],
  ['Belgium','Europe','EUR','$630B','$54,000','12M','Open trade economy','High imports','Chemicals, Pharma, Diamonds','EU location','Debt','Fragmented politics',[4.5,50.5]],
  ['Sweden','Europe','SEK','$590B','$56,000','10.5M','High-tech welfare capitalism','Low-medium','Machinery, Vehicles, Tech','Innovation','Housing debt','Export demand',[15,62]],
  ['Ireland','Europe','EUR','$550B','$104,000','5.2M','FDI and services hub','Medium','Pharma, Software, Finance','Tax ecosystem','Housing','Tax pressure',[-8,53]],
  ['Norway','Europe','NOK','$520B','$96,000','5.5M','Oil fund social economy','Low exporter','Oil, Gas, Fish','Sovereign wealth','Oil transition','Currency swings',[8,61]],
  ['Singapore','Asia','SGD','$501B','$84,700','5.9M','Open trade, state-led capitalism','Very High imports','Finance, Chips, Logistics','Port-finance hub','Land scarcity','Trade shocks',[104,1.35]],
  ['UAE','Middle East','AED','$500B','$53,000','10M','Oil, logistics and finance hub','Low exporter','Oil, Gold, Services','Dubai logistics','Labor model','Oil cycles',[54,24]],
  ['Israel','Middle East','ILS','$510B','$55,000','10M','High-tech security economy','Medium','Tech, Diamonds, Pharma','Startup ecosystem','Security risk','Regional war',[35,31]],
  ['Thailand','Asia','THB','$520B','$7,300','72M','Tourism and manufacturing','High imports','Cars, Electronics, Food','Tourism and industry','Aging','Political risk',[101,15]],
  ['Vietnam','Asia','VND','$430B','$4,300','99M','Manufacturing export riser','Medium','Electronics, Textiles, Coffee','China+1 shift','Infrastructure','External demand',[108,16]],
  ['Malaysia','Asia','MYR','$430B','$13,000','34M','Electronics and commodities','Medium','Chips, Palm Oil, LNG','Semiconductor assembly','Middle-income trap','Commodity exposure',[102,4]],
  ['Philippines','Asia','PHP','$440B','$3,900','115M','Services and remittance economy','Medium','Electronics, BPO, Labor','Young population','Infrastructure gaps','Climate risk',[122,13]],
  ['Bangladesh','Asia','BDT','$460B','$2,700','173M','Garment-led development','High imports','Garments, Textiles','Labor scale','Energy stress','Climate exposure',[90,24]],
  ['Pakistan','Asia','PKR','$340B','$1,600','240M','Agriculture and textiles','High imports','Textiles, Rice','Demographics','Debt stress','FX shortages',[70,30]],
  ['Egypt','Africa/Middle East','EGP','$400B','$3,800','112M','Suez, tourism, gas and state projects','Medium','Gas, Fertilizer, Tourism','Suez Canal','Debt and FX','Food import risk',[30,27]],
  ['South Africa','Africa','ZAR','$380B','$6,400','60M','Mining, finance and industry','Medium','Gold, Platinum, Cars','Minerals and finance','Power shortages','Logistics failures',[24,-29]],
  ['Nigeria','Africa','NGN','$360B','$1,600','225M','Oil, services and informal scale','Medium exporter','Crude Oil, LNG','Population and energy','FX shortages','Oil theft',[8,9]],
  ['Kenya','Africa','KES','$115B','$2,100','55M','Services, agriculture and fintech','Medium imports','Tea, Flowers, Services','Mobile money','Debt pressure','Climate shocks',[38,0]],
  ['Ethiopia','Africa','ETB','$160B','$1,500','126M','Agriculture and industrialization push','Low hydro','Coffee, Textiles','Hydropower','FX shortages','Conflict risk',[40,9]],
  ['Morocco','Africa','MAD','$150B','$4,100','38M','Manufacturing and phosphates','High imports','Cars, Phosphates, Agri-food','EU proximity','Water stress','Energy imports',[-6,32]],
  ['Algeria','Africa','DZD','$240B','$5,300','45M','Hydrocarbon state economy','Low exporter','Gas, Oil','Gas reserves','Diversification gap','Price swings',[2,28]],
  ['Chile','Americas','CLP','$330B','$17,000','20M','Mining and services economy','Medium','Copper, Lithium, Fruit','Copper/lithium','Inequality','China demand',[-71,-30]],
  ['Peru','Americas','PEN','$270B','$7,900','34M','Mining and agriculture','Medium','Copper, Gold, Fishmeal','Minerals','Political instability','Social conflict',[-75,-9]],
  ['Colombia','Americas','COP','$360B','$7,000','52M','Oil, services and agriculture','Medium exporter','Oil, Coffee, Coal','Resources','Security gaps','Oil transition',[-74,4]],
  ['Uruguay','Americas','UYU','$80B','$23,000','3.5M','Stable agri-services economy','Low renewables','Beef, Soy, Pulp','Stability','Small market','Commodity cycles',[-56,-33]],
  ['Qatar','Middle East','QAR','$240B','$82,000','3M','Gas wealth and investment state','Low exporter','LNG, Petrochemicals','Gas reserves','Blockade risk','Energy transition',[51,25]],
  ['Iran','Middle East','IRR','$400B','$4,700','89M','Sanctioned energy-industrial economy','Low exporter constrained','Oil, Gas, Petrochemicals','Energy base','Sanctions','Strait tensions',[53,32]],
  ['Iraq','Middle East','IQD','$260B','$6,000','45M','Oil state rebuilding economy','Low exporter','Crude Oil','Oil reserves','Institutions','Security risk',[44,33]],
  ['Greece','Europe','EUR','$240B','$23,000','10M','Tourism, shipping and services','High imports','Tourism, Shipping, Food','Shipping fleet','Debt legacy','Tourism shock',[22,39]],
  ['Portugal','Europe','EUR','$290B','$28,000','10M','Services, tourism and manufacturing','Medium imports','Tourism, Cars, Textiles','Renewables','Low productivity','Housing pressure',[-8,39]],
  ['Czechia','Europe','CZK','$330B','$31,000','11M','Central European industry','Medium','Cars, Machinery','Industrial base','Energy costs','Auto transition',[15,49]],
  ['Ukraine','Europe','UAH','$180B','$5,000','37M','Wartime agriculture and industry','High wartime','Grain, Steel, IT','Land and skills','War damage','Energy attacks',[31,49]],
  ['Romania','Europe','RON','$350B','$18,000','19M','Manufacturing and services convergence','Medium','Cars, IT, Grain','EU integration','Infrastructure','Brain drain',[25,46]],
  ['Denmark','Europe','DKK','$400B','$68,000','6M','High-value welfare economy','Low','Pharma, Wind, Food','Green industry','Small market','Trade exposure',[10,56]],
  ['Finland','Europe','EUR','$300B','$54,000','5.6M','Tech, forestry and welfare economy','Medium','Machinery, Paper, Tech','Education','Russia exposure','Demographics',[26,64]],
  ['New Zealand','Oceania','NZD','$250B','$49,000','5.2M','Agriculture and services economy','Medium','Dairy, Meat, Tourism','Food exports','Distance','Housing',[172,-41]],
  ['Kazakhstan','Asia','KZT','$260B','$13,000','20M','Energy and minerals corridor','Low exporter','Oil, Uranium, Metals','Resources','Landlocked logistics','Russia/China balance',[67,48]],
  ['Ghana','Africa','GHS','$76B','$2,300','34M','Gold, cocoa and oil economy','Medium','Gold, Cocoa, Oil','Resource mix','Debt stress','FX pressure',[-1,8]],
  ['Ukraine','Europe','UAH','$180B','$5,200','37M','War-resilient agriculture and tech economy','Medium imports','Grain, Steel, IT services','Agriculture and tech talent','War damage','Security and reconstruction',[31, 49]],
  ['Belarus','Europe','BYN','$72B','$7,700','9.2M','State-led industrial economy','High imports','Potash, Machinery, Refined oil','Industrial base','Sanctions','Russia dependence',[28, 53]],
  ['Slovakia','Europe','EUR','$130B','$24,000','5.4M','Automotive export economy','Medium imports','Cars, Electronics, Machinery','Car manufacturing','Export concentration','Eurozone slowdown',[19, 48.7]],
  ['Slovenia','Europe','EUR','$70B','$33,000','2.1M','Small high-income manufacturing economy','Medium imports','Pharma, Cars, Machinery','EU integration','Small market','External demand',[14.8, 46.1]],
  ['Croatia','Europe','EUR','$80B','$20,000','3.9M','Tourism and services economy','Medium imports','Tourism, Ships, Food','Adriatic tourism','Seasonality','Tourism shock',[16, 45]],
  ['Serbia','Europe','RSD','$75B','$11,000','6.7M','Manufacturing and services convergence economy','High imports','Cars, Metals, Food','Regional industry','Institutional gaps','EU/Russia balance',[21, 44]],
  ['Bulgaria','Europe','BGN','$100B','$15,000','6.5M','Low-cost EU manufacturing and services','Medium imports','Machinery, Copper, IT services','EU access','Demographics','Energy politics',[25, 43]],
  ['Lithuania','Europe','EUR','$78B','$28,000','2.8M','Baltic logistics and tech economy','Medium imports','Chemicals, Machinery, Food','Digital services','Small market','Security costs',[24, 55]],
  ['Latvia','Europe','EUR','$43B','$23,000','1.9M','Baltic services and logistics economy','Medium imports','Wood, Food, Machinery','EU integration','Demographics','Regional security',[25, 57]],
  ['Estonia','Europe','EUR','$41B','$31,000','1.3M','Digital state and services economy','Medium imports','Tech services, Wood, Machinery','Digital governance','Small scale','Security costs',[26, 59]],
  ['Luxembourg','Europe','EUR','$90B','$130,000','0.7M','Finance-centered microstate economy','Medium imports','Finance, Funds, Steel','Financial hub','Regulatory pressure','Tax scrutiny',[6, 49.8]],
  ['Iceland','Europe','ISK','$31B','$82,000','0.39M','Renewable energy and tourism economy','Low renewables','Fish, Aluminum, Tourism','Clean energy','Small market','Tourism volatility',[-19, 65]],
  ['Malta','Europe','EUR','$22B','$38,000','0.5M','Services, shipping and tourism economy','High imports','Tourism, Financial services, Shipping','Mediterranean services','Scale limits','Regulation risk',[14.4, 35.9]],
  ['Cyprus','Europe','EUR','$32B','$36,000','1.2M','Tourism and business services economy','High imports','Tourism, Shipping, Services','EU location','Energy imports','Regional tensions',[33, 35]],
  ['Georgia','Asia/Europe','GEL','$31B','$8,300','3.7M','Transit, tourism and services economy','High imports','Wine, Tourism, Metals','Caucasus corridor','Small market','Regional security',[44, 42]],
  ['Armenia','Asia/Europe','AMD','$24B','$8,200','3M','Services, mining and diaspora-linked economy','High imports','Copper, IT, Brandy','Diaspora networks','Landlocked logistics','Security risk',[45, 40]],
  ['Azerbaijan','Asia/Europe','AZN','$75B','$7,300','10M','Oil and gas corridor economy','Low exporter','Oil, Gas, Petrochemicals','Caspian energy','Diversification gap','Energy price swings',[48.5, 40.5]],
  ['Jordan','Middle East','JOD','$51B','$4,700','11M','Aid, services and logistics economy','High imports','Pharma, Potash, Services','Stability','Water scarcity','Regional shocks',[36, 31]],
  ['Lebanon','Middle East','LBP','$24B','$3,500','5.5M','Crisis-hit services economy','High imports','Services, Food, Jewelry','Human capital','Banking collapse','Political paralysis',[35.8, 33.8]],
  ['Oman','Middle East','OMR','$110B','$23,000','4.6M','Oil, gas and logistics economy','Low exporter','Oil, Gas, Metals','Indian Ocean access','Oil dependence','Fiscal transition',[57, 21]],
  ['Kuwait','Middle East','KWD','$160B','$34,000','4.3M','Oil rentier economy','Low exporter','Crude Oil, Refined products','Oil wealth','Public-sector dependence','Oil cycles',[47.5, 29.3]],
  ['Bahrain','Middle East','BHD','$45B','$29,000','1.5M','Finance and aluminum Gulf economy','High imports','Aluminum, Finance, Oil products','Financial services','Limited resources','Regional competition',[50.5, 26]],
  ['Nepal','Asia','NPR','$41B','$1,300','30M','Remittance and tourism economy','High imports','Remittances, Textiles, Tourism','Hydropower potential','Infrastructure gaps','Climate risk',[84, 28]],
  ['Sri Lanka','Asia','LKR','$84B','$3,800','22M','Tourism, tea and apparel economy','High imports','Tea, Apparel, Tourism','Indian Ocean location','Debt stress','FX shortages',[81, 7]],
  ['Myanmar','Asia','MMK','$65B','$1,200','55M','Resource and agriculture economy','Medium','Gas, Garments, Rice','Natural resources','Conflict','Sanctions and instability',[96, 21]],
  ['Cambodia','Asia','KHR','$31B','$1,900','17M','Garment, tourism and construction economy','High imports','Garments, Tourism, Rice','Low-cost manufacturing','External dependence','Political risk',[105, 12]],
  ['Laos','Asia','LAK','$15B','$2,000','7.5M','Hydropower and mining economy','Medium','Electricity, Copper, Tourism','Hydropower exports','Debt exposure','Currency stress',[103, 18]],
  ['Mongolia','Asia','MNT','$17B','$5,000','3.5M','Mining corridor economy','Medium imports','Coal, Copper, Gold','Mineral wealth','Landlocked logistics','China dependence',[103, 46]],
  ['Uzbekistan','Asia','UZS','$91B','$2,600','36M','Reforming resource and textile economy','Low-medium','Gold, Cotton, Gas','Demographics','State dominance','Water stress',[64, 41]],
  ['Tunisia','Africa','TND','$49B','$4,000','12M','Tourism, manufacturing and services economy','High imports','Textiles, Tourism, Olive oil','EU proximity','Fiscal stress','Political risk',[9, 34]],
  ['Senegal','Africa','XOF','$31B','$1,700','18M','Services, agriculture and emerging energy economy','Medium imports','Fish, Gold, Phosphates','Stability','Youth jobs','Debt pressure',[-14, 14]],
  ["Côte d'Ivoire",'Africa','XOF','$79B','$2,700','29M','Cocoa-led West African growth economy','Medium imports','Cocoa, Cashew, Gold','Agribusiness','Commodity dependence','Climate and price risk',[-5, 7.5]],
  ['Tanzania','Africa','TZS','$79B','$1,200','67M','Agriculture, mining and tourism economy','Medium imports','Gold, Tourism, Coffee','Natural resources','Infrastructure gaps','Climate risk',[35, -6]],
  ['Uganda','Africa','UGX','$52B','$1,100','49M','Agriculture and emerging oil economy','Medium imports','Coffee, Gold, Fish','Agriculture','Infrastructure gaps','Oil execution risk',[32, 1.5]],
  ['Rwanda','Africa','RWF','$14B','$1,000','14M','Services and reform-driven economy','High imports','Tourism, Coffee, Minerals','Governance capacity','Small market','Regional tensions',[30, -2]],
  ['Angola','Africa','AOA','$85B','$2,400','36M','Oil and reconstruction economy','Low exporter','Oil, Diamonds','Energy reserves','Oil dependence','FX volatility',[18, -12]],
  ['DR Congo','Africa','CDF','$67B','$650','105M','Mineral-rich frontier economy','Medium','Copper, Cobalt, Gold','Critical minerals','Institutions','Conflict risk',[23, -3]],
  ['Cameroon','Africa','XAF','$49B','$1,800','28M','Diversified Central African economy','Medium','Oil, Cocoa, Timber','Regional hub','Infrastructure','Security risk',[12, 6]],
  ['Zambia','Africa','ZMW','$29B','$1,400','20M','Copper and agriculture economy','Medium imports','Copper, Cobalt, Tobacco','Copper reserves','Debt pressure','Copper price swings',[28, -14]],
  ['Mozambique','Africa','MZN','$22B','$650','33M','Gas, minerals and agriculture economy','Medium','Coal, Aluminum, Gas','LNG potential','Debt and security','Insurgency risk',[35, -18]],
].map(([name,region,currency,gdp,gdppc,pop,model,energy,exports,strength,vulnerability,risk,coords])=>({name,region,currency,gdp,gdppc,pop,model,energy,exports,strength,vulnerability,risk,coords}));

const countryByName = Object.fromEntries(countries.map(c=>[c.name,c]));
function geoCountryMatches(geoName, c){
  if(!geoName || !c) return false;
  if(geoName===c.name) return true;
  if(geoName.includes(c.name) || c.name.includes(geoName)) return true;
  if(c.name==='United States' && (geoName==='United States of America' || geoName==='USA')) return true;
  if(c.name==='Russia' && geoName==='Russian Federation') return true;
  if(c.name==='UAE' && geoName==='United Arab Emirates') return true;
  return false;
}
function hashText(str){
  return [...String(str)].reduce((h,ch)=>((h<<5)-h+ch.charCodeAt(0))|0,0);
}
function entityVisual(kind, name, subtitle=''){
  const palettes={
    country:['#dfe7d6','#f6d59f','#7b8f6a'],
    city:['#dbeafe','#c7d2fe','#1d4ed8'],
    finance:['#ede9fe','#ddd6fe','#6d28d9'],
    port:['#ffedd5','#fed7aa','#c2410c'],
    route:['#e0f2fe','#bae6fd','#0369a1']
  };
  const key = kind==='finance' ? 'finance' : kind;
  const pal=palettes[key]||palettes.country;
  const h=Math.abs(hashText(name));
  const icon=kind==='port'?'⚓':kind==='route'?'↝':kind==='finance'?'◆':kind==='city'?'◉':'●';
  const lines=Array.from({length:8}).map((_,i)=>{
    const x=(h*(i+3))%900, y=80+((h>>i)%360), w=140+((h+i*37)%230);
    return `<rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="rgba(255,255,255,.34)"/>`;
  }).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset=".58" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[2]}"/></linearGradient><radialGradient id="r" cx="72%" cy="22%" r="60%"><stop offset="0" stop-color="rgba(255,255,255,.7)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>
    <rect width="900" height="520" fill="url(#g)"/> <rect width="900" height="520" fill="url(#r)"/> ${lines}
    <circle cx="735" cy="112" r="82" fill="rgba(255,255,255,.22)"/><circle cx="762" cy="133" r="116" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    <text x="58" y="112" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="900" fill="#172033">${escapeXml(icon)} ${escapeXml(name)}</text>
    <text x="62" y="164" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="3" fill="rgba(23,32,51,.68)">${escapeXml((subtitle||kind).toUpperCase())}</text>
    <path d="M60 430 C180 360, 310 470, 445 390 S710 380, 842 292" fill="none" stroke="rgba(23,32,51,.25)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="60" cy="430" r="9" fill="#172033"/><circle cx="445" cy="390" r="9" fill="#172033"/><circle cx="842" cy="292" r="9" fill="#172033"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function escapeXml(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
const countryFlagCodes = {
  'United States':'us','China':'cn','Japan':'jp','Germany':'de','India':'in','United Kingdom':'gb','France':'fr','Italy':'it','Brazil':'br','Canada':'ca','Russia':'ru','Mexico':'mx','South Korea':'kr','Australia':'au','Spain':'es','Indonesia':'id','Netherlands':'nl','Saudi Arabia':'sa','Turkey':'tr','Switzerland':'ch','Taiwan':'tw','Poland':'pl','Argentina':'ar','Belgium':'be','Sweden':'se','Ireland':'ie','Norway':'no','Singapore':'sg','UAE':'ae','Israel':'il','Thailand':'th','Vietnam':'vn','Malaysia':'my','Philippines':'ph','Bangladesh':'bd','Pakistan':'pk','Egypt':'eg','South Africa':'za','Nigeria':'ng','Kenya':'ke','Ethiopia':'et','Morocco':'ma','Algeria':'dz','Chile':'cl','Peru':'pe','Colombia':'co','Uruguay':'uy','Qatar':'qa','Iran':'ir','Iraq':'iq','Greece':'gr','Portugal':'pt','Austria':'at','Czechia':'cz','Denmark':'dk','Romania':'ro','Hungary':'hu','Finland':'fi','New Zealand':'nz','Kazakhstan':'kz','Ghana':'gh'
};
function flagImageUrl(name){
  const code = countryFlagCodes[name];
  return code ? `https://flagcdn.com/w640/${code}.png` : entityVisual('country', name, 'Flag');
}
function photoSeed(kind, name){
  return Math.abs(hashText(`${kind}:${name}`));
}
function wikipediaSummaryUrl(title){
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
}
function photoQuery(kind, name){
  const direct = kind==='country' ? (countryPhotoQueries[name] || `${name} skyline`) : name;
  if(kind==='port') return `${direct} port harbor containers ship`;
  if(kind==='finance' || kind==='city') return `${direct} skyline city downtown`;
  return `${direct} landscape city skyline travel`;
}
function fallbackPhotoUrl(kind, name){
  const query = photoQuery(kind, name).replace(/\//g,' ').replace(/\s+/g,',');
  return `https://loremflickr.com/1200/800/${encodeURIComponent(query)}?lock=${photoSeed(kind,name)}`;
}
function wikipediaTitleFor(kind, name){
  if(kind==='country') return null;
  if(kind==='port') return portTitleOverrides[name] || name;
  return cityTitleOverrides[name] || name;
}
async function fetchRemotePhoto(kind, name){
  const cacheKey = `${kind}:${name}`;
  if(kind==='country'){
    const url = flagImageUrl(name);
    remoteImageCache.set(cacheKey, url);
    return url;
  }
  if(remoteImageCache.has(cacheKey)) return remoteImageCache.get(cacheKey);
  if(remoteImagePending.has(cacheKey)) return remoteImagePending.get(cacheKey);
  const pending = (async()=>{
    let url = fallbackPhotoUrl(kind, name);
    try{
      const wikiTitle = wikipediaTitleFor(kind, name);
      if(wikiTitle){
        const res = await fetch(wikipediaSummaryUrl(wikiTitle));
        if(res.ok){
          const data = await res.json();
          url = data.originalimage?.source || data.thumbnail?.source || url;
        }
      }
    }catch(e){}
    remoteImageCache.set(cacheKey, url);
    remoteImagePending.delete(cacheKey);
    return url;
  })();
  remoteImagePending.set(cacheKey, pending);
  return pending;
}
function infoImage(kind, name, subtitle){
  if(kind==='country'){
    return `<div class="info-image country-flag-image is-photo" data-kind="country" data-name="${escapeXml(name)}" data-subtitle="${escapeXml(subtitle||'')}" style="background-image:url('${flagImageUrl(name)}')" aria-label="${escapeXml(name)} flag"></div>`;
  }
  return `<div class="info-image" data-kind="${escapeXml(kind)}" data-name="${escapeXml(name)}" data-subtitle="${escapeXml(subtitle||'')}" style="background-image:url('${entityVisual(kind,name,subtitle)}')" aria-label="${escapeXml(name)} visual"></div>`;
}
function hydratePanelImages(scope=document){
  scope.querySelectorAll?.('.info-image[data-kind][data-name]').forEach(el=>{
    if(el.dataset.loaded==='1') return;
    const kind = el.dataset.kind;
    const name = el.dataset.name;
    const cacheKey = `${kind}:${name}`;
    if(remoteImageCache.has(cacheKey)){
      el.style.backgroundImage = `url('${remoteImageCache.get(cacheKey)}')`;
      el.dataset.loaded='1';
      el.classList.add('is-photo');
      return;
    }
    fetchRemotePhoto(kind, name).then(url=>{
      if(!document.body.contains(el)) return;
      el.style.backgroundImage = `url('${url}')`;
      el.dataset.loaded='1';
      el.classList.add('is-photo');
    }).catch(()=>{});
  });
}
function lensForItem(item){
  const profile=getEntityProfile(item);
  if(profile?.lens) return profile.lens;
  if(item.kind==='route') return 'This corridor matters because it converts geography into prices: distance, fuel, insurance, canal capacity and security risk all shape the final cost of goods.';
  if(item.type==='port') return 'Ports are physical bottlenecks of globalization. They combine ships, containers, customs, warehouses, finance and insurance in one place.';
  return 'Cities concentrate decision-making, workers, capital, universities, firms and infrastructure. They often explain a country better than national averages do.';
}


const cities = [
  ['New York','financial hub',-74.0,40.7,'finance'],['London','financial hub',-0.1,51.5,'finance'],['Paris','capital',2.35,48.86,'city'],['Singapore','port-finance hub',103.85,1.29,'finance'],['Shanghai','industrial port',121.47,31.23,'city'],['Shenzhen','electronics cluster',114.06,22.54,'city'],['Tokyo','megacity',139.7,35.68,'city'],['Seoul','chips and industry',127,37.56,'city'],['Dubai','logistics hub',55.27,25.2,'finance'],['Riyadh','Vision 2030 hub',46.7,24.7,'city'],['Mumbai','finance',72.87,19.07,'finance'],['São Paulo','Latin America business hub',-46.63,-23.55,'finance'],['Lagos','Africa megacity',3.38,6.52,'city'],['Nairobi','fintech hub',36.82,-1.29,'finance'],['Mexico City','nearshoring command center',-99.13,19.43,'city'],['Madrid','political and services capital',-3.7,40.42,'city'],['Berlin','industrial-policy capital',13.4,52.52,'city'],['Amsterdam','trade and finance hub',4.9,52.37,'finance'],['Istanbul','Eurasian bridge city',28.98,41.01,'city'],['Jakarta','Southeast Asian megacity',106.85,-6.21,'city'],['Bangkok','tourism and manufacturing hub',100.5,13.76,'city'],['Ho Chi Minh City','Vietnam export engine',106.63,10.82,'city'],['Kuala Lumpur','finance and electronics node',101.69,3.14,'finance'],['Manila','services and remittance hub',120.98,14.6,'city'],['Dhaka','garment megacity',90.41,23.81,'city'],['Karachi','Pakistan port-finance hub',67.01,24.86,'finance'],['Cairo','Arab world megacity',31.24,30.04,'city'],['Cape Town','tourism and port city',18.42,-33.92,'city'],['Casablanca','Morocco business hub',-7.59,33.57,'finance'],['Santiago','copper-finance capital',-70.66,-33.45,'finance'],['Buenos Aires','macro and culture capital',-58.38,-34.6,'city'],['Bogotá','Andean services hub',-74.07,4.71,'city'],['Doha','gas wealth capital',51.53,25.29,'finance'],['Tehran','sanctioned industrial capital',51.39,35.69,'city'],['Warsaw','CEE growth hub',21.01,52.23,'city'],['Vienna','Central European services hub',16.37,48.21,'city'],['Copenhagen','green urban economy',12.57,55.68,'city'],['Helsinki','Nordic tech capital',24.94,60.17,'city'],['Auckland','Pacific services hub',174.76,-36.85,'city'],['Accra','West African services hub',-0.19,5.56,'city']
].map(([name,desc,lon,lat,type])=>({name,desc,lon,lat,type}));

const ports = [
  ['Shanghai Port','world-scale container gateway',121.8,31.2],['Singapore Port','global transshipment hub',103.75,1.25],['Rotterdam','Europe gateway',4.47,51.92],['Los Angeles/Long Beach','Pacific gateway',-118.24,33.74],['Jebel Ali','Gulf logistics hub',55.05,25.01],['Hamburg','German trade port',9.99,53.55],['Busan','Korea export hub',129.04,35.1],['Shenzhen/Yantian','electronics export port',114.27,22.59],['Santos','Brazil agribusiness port',-46.33,-23.96],['Durban','Southern Africa gateway',31.02,-29.87],['Suez/Port Said','canal chokepoint',32.3,31.25],['Panama Canal','inter-oceanic chokepoint',-79.55,9.08],['Mumbai/JNPT','India west gateway',72.94,18.95],['Piraeus','Mediterranean gateway',23.63,37.94],['Antwerp-Bruges','chemical/logistics hub',4.4,51.22],['Hong Kong','Asian container and finance gateway',114.16,22.3],['Ningbo-Zhoushan','Chinese mega-port complex',121.55,29.87],['Qingdao','North China manufacturing port',120.38,36.07],['Tianjin',"Beijing's maritime gateway",117.2,39.08],['Kaohsiung','Taiwan export port',120.3,22.62],['Tanjung Pelepas','Malacca transshipment hub',103.55,1.36],['Port Klang','Malaysia container gateway',101.39,3.0],['Laem Chabang','Thailand industrial port',100.89,13.08],['Ho Chi Minh/Cat Lai','Vietnam export port',106.79,10.76],['Manila Port','Philippines trade gateway',120.96,14.59],['Colombo','Indian Ocean transshipment hub',79.85,6.95],['Mundra','India private mega-port',69.7,22.75],['Chittagong','Bangladesh garment gateway',91.82,22.32],['Alexandria','Egypt Mediterranean gateway',29.91,31.2],['Tanger Med','Morocco Europe-Africa port',-5.5,35.89],['Lagos/Apapa','Nigeria container gateway',3.36,6.45],['Mombasa','East African corridor port',39.67,-4.04],['Tema','Ghana Gulf of Guinea port',0.01,5.64],['Le Havre','French Atlantic gateway',0.11,49.49],['Valencia','Spanish Mediterranean port',-0.32,39.45],['Gioia Tauro','Italy transshipment hub',15.9,38.43],['Algeciras','Strait of Gibraltar gateway',-5.45,36.14],['Felixstowe','UK container gateway',1.32,51.96],['Vancouver','Canadian Pacific gateway',-123.12,49.29],['New York/New Jersey','US Atlantic gateway',-74.05,40.67]
].map(([name,desc,lon,lat])=>({name,desc,lon,lat,type:'port'}));

const cityProfiles = {
  'New York': {tag:'Finance + media command center', lens:'New York turns capital markets, corporate HQs, media and immigrant labor into global influence.', watch:'Commercial real estate stress, Wall Street regulation, tech employment and port congestion.', matters:'It prices risk for the world while also acting as a consumer and logistics gateway.'},
  'London': {tag:'Global finance after Brexit', lens:'London remains a legal, banking, insurance and FX hub even as it renegotiates its role with Europe.', watch:'Financial regulation, City hiring, housing pressure and UK-EU services access.', matters:'It shows how institutions and trust can keep a city central even outside a large single market.'},
  'Paris': {tag:'State, luxury and innovation capital', lens:'Paris concentrates government power, luxury groups, tourism, transport and a growing AI/startup ecosystem.', watch:'Transit investment, housing costs, tourism flows and industrial policy around tech.', matters:'It links national strategy, culture exports and high-value services in one urban system.'},
  'Singapore': {tag:'Port-finance city-state', lens:'Singapore uses logistics, law, education and sovereign planning to turn a small island into a global connector.', watch:'Shipping cycles, wealth management rules, labor constraints and regional competition.', matters:'It is the clearest example of geography upgraded by institutions and infrastructure.'},
  'Shanghai': {tag:'China’s industrial-financial gateway', lens:'Shanghai connects Chinese manufacturing, finance, consumers and the Yangtze River Delta export machine.', watch:'Property confidence, export demand, port volumes and state support for finance.', matters:'It reveals how China links domestic scale to global trade.'},
  'Shenzhen': {tag:'Hardware and electronics cluster', lens:'Shenzhen compresses factories, suppliers, design teams and entrepreneurs into one fast industrial ecosystem.', watch:'US-China tech controls, electronics demand, labor costs and innovation policy.', matters:'It shows why industrial clusters can move faster than isolated firms.'},
  'Tokyo': {tag:'Megacity of capital and technology', lens:'Tokyo concentrates Japan’s finance, advanced services, corporate headquarters and high-end urban infrastructure.', watch:'Demographics, yen weakness, wages, productivity reform and real-estate resilience.', matters:'It shows how an aging economy can remain globally sophisticated.'},
  'Seoul': {tag:'Chaebol-tech command hub', lens:'Seoul links government, universities, finance and conglomerates behind Korea’s chips, batteries and entertainment exports.', watch:'Chip cycles, household debt, demographics and exposure to China.', matters:'It converts industrial policy and culture into global soft and hard power.'},
  'Dubai': {tag:'Logistics, tourism and capital hub', lens:'Dubai turns airport capacity, ports, real estate and business services into a Gulf gateway.', watch:'Property cycles, oil-linked liquidity, tourism, sanctions compliance and regional competition.', matters:'It shows how a city can monetize connectivity even without being a huge domestic market.'},
  'Riyadh': {tag:'Vision 2030 command center', lens:'Riyadh is being repositioned from administrative capital into finance, tourism and corporate headquarters hub.', watch:'Public spending, private-sector job creation, megaproject execution and oil revenue.', matters:'It is the test of whether oil rents can become diversified productivity.'},
  'Mumbai': {tag:'India’s finance and film metropolis', lens:'Mumbai concentrates banking, capital markets, entertainment and port access in India’s west coast economy.', watch:'Infrastructure delivery, housing pressure, monsoon risk and India’s credit cycle.', matters:'It links India’s domestic demand to global capital.'},
  'São Paulo': {tag:'Latin America business engine', lens:'São Paulo is Brazil’s finance, industry and services core, pulling talent and capital from across the region.', watch:'Interest rates, fiscal policy, logistics costs and consumer credit.', matters:'It shows the weight of Brazil’s internal market beyond commodities.'},
  'Lagos': {tag:'Africa megacity and informal powerhouse', lens:'Lagos combines ports, finance, entertainment, startups and informal trade in a fast-growing urban economy.', watch:'Power supply, transport, port clearance, naira stability and housing.', matters:'It shows the scale and friction of urban development in emerging markets.'},
  'Nairobi': {tag:'East African fintech hub', lens:'Nairobi links mobile money, logistics, NGOs, startups and regional services into East Africa’s main business node.', watch:'Debt pressure, digital regulation, climate shocks and regional trade.', matters:'It shows how financial inclusion can become urban economic power.'},
  'Mexico City': {tag:'Nearshoring command center', lens:'Mexico City coordinates finance, policy and corporate strategy behind Mexico’s manufacturing integration with the US.', watch:'Water stress, security, peso strength and industrial investment.', matters:'It connects North American supply chains with a huge domestic market.'}
};

const portProfiles = {
  'Shanghai Port': {tag:'World container scale', lens:'Shanghai is the maritime outlet of the Yangtze River Delta, one of the densest manufacturing regions on earth.', watch:'Export demand, inland river logistics, typhoon disruption and China-US trade policy.', matters:'When Shanghai slows, global retailers and factories feel it quickly.'},
  'Singapore Port': {tag:'Transshipment superhub', lens:'Singapore is less a final market than a switching station where Asian, European and Indian Ocean routes connect.', watch:'Malacca security, bunker fuel rules, port automation and regional competition.', matters:'It makes geography operational: ships save time because the port system is trusted and efficient.'},
  'Rotterdam': {tag:'Europe’s industrial gateway', lens:'Rotterdam connects ocean shipping to German and European industry through pipelines, barges, rail and warehouses.', watch:'Rhine water levels, energy transition, customs flow and chemical demand.', matters:'It is where global commodities become European industrial inputs.'},
  'Los Angeles/Long Beach': {tag:'US Pacific gateway', lens:'LA/Long Beach is the main US door for Asian manufactured goods and a barometer of American consumption.', watch:'Labor negotiations, rail capacity, warehouse stocks and Pacific shipping rates.', matters:'Congestion here can raise costs across the US retail system.'},
  'Jebel Ali': {tag:'Gulf logistics platform', lens:'Jebel Ali turns Dubai into a regional re-export, warehousing and free-zone hub between Asia, Africa and Europe.', watch:'Regional conflict risk, sanctions enforcement, air-sea logistics and Gulf investment cycles.', matters:'It shows how a port can create an economy around itself.'},
  'Hamburg': {tag:'Germany’s maritime door', lens:'Hamburg links German industry to container shipping, especially machinery, vehicles and high-value exports.', watch:'Elbe access, China exposure, rail links and German industrial demand.', matters:'It reflects the health of Europe’s export machine.'},
  'Busan': {tag:'Korean export outlet', lens:'Busan supports South Korea’s shipbuilding, autos, electronics and container transshipment networks.', watch:'Chip exports, shipping alliances, Korea-Japan-China trade and automation.', matters:'It connects Korea’s industrial depth to global markets.'},
  'Shenzhen/Yantian': {tag:'Electronics export valve', lens:'Yantian is a key release point for Pearl River Delta electronics, hardware and e-commerce shipments.', watch:'Tech controls, holiday backlogs, typhoons and US consumer demand.', matters:'Small disruptions can ripple through global electronics supply chains.'},
  'Santos': {tag:'Brazil agribusiness gateway', lens:'Santos moves soy, sugar, coffee and containers from Brazil’s interior to global markets.', watch:'Harvest size, road/rail bottlenecks, China demand and currency movements.', matters:'It turns Brazilian land and agriculture into export power.'},
  'Durban': {tag:'Southern Africa gateway', lens:'Durban links South African industry and regional trade to the Indian Ocean.', watch:'Rail reliability, port reform, power shortages and regional corridors.', matters:'It is a logistics constraint on Southern Africa’s growth.'},
  'Suez/Port Said': {tag:'Canal chokepoint', lens:'Suez compresses Asia-Europe shipping into a narrow Egyptian corridor where time, insurance and security meet.', watch:'Red Sea attacks, canal fees, rerouting around Africa and Egyptian FX needs.', matters:'A local shock here becomes a global shipping cost shock.'},
  'Panama Canal': {tag:'Two-ocean shortcut', lens:'Panama monetizes geography by letting ships avoid the long route around South America.', watch:'Drought, vessel restrictions, US-Asia flows and canal pricing.', matters:'It proves that water levels can become a macroeconomic variable.'},
  'Mumbai/JNPT': {tag:'India west-coast gateway', lens:'JNPT connects India’s industrial west with container shipping, energy imports and consumer demand.', watch:'Dedicated freight corridors, port expansion, rupee moves and manufacturing growth.', matters:'It is central to India’s attempt to become a larger export platform.'},
  'Piraeus': {tag:'Mediterranean bridge', lens:'Piraeus links Mediterranean shipping, Balkan corridors and Europe-Asia trade strategy.', watch:'Rail links into Europe, Greek tourism cycles and China-Europe politics.', matters:'It shows how ports can become geopolitical infrastructure.'},
  'Antwerp-Bruges': {tag:'Chemicals and logistics hub', lens:'Antwerp-Bruges combines container trade with one of Europe’s deepest petrochemical and industrial clusters.', watch:'Energy prices, chemical demand, customs security and North Sea competition.', matters:'It is not just a port: it is an industrial ecosystem.'}
};

function generatedEntityProfile(item){
  if(!item) return null;
  if(item.type==='port'){
    return {
      tag:item.desc || 'Port / chokepoint',
      lens:`${item.name} is a logistics node where maritime routes, customs, storage and inland transport meet.`,
      watch:'Container flows, terminal capacity, hinterland rail/roads, labor reliability, weather and geopolitical disruption.',
      matters:'Ports turn geography into economic power by deciding how fast goods, energy and inputs reach markets.'
    };
  }
  return {
    tag:item.desc || (item.type==='finance' ? 'Finance and services hub' : 'City / economic node'),
    lens:`${item.name} concentrates people, firms, infrastructure and decision-making into one urban economy.`,
    watch:'Investment flows, housing pressure, transport capacity, talent concentration and national policy choices.',
    matters:'Cities make national economies visible: they show where capital, workers and infrastructure actually meet.'
  };
}
function getEntityProfile(item){
  if(!item) return null;
  if(item.type==='port') return portProfiles[item.name] || generatedEntityProfile(item);
  return cityProfiles[item.name] || generatedEntityProfile(item);
}

const tradeRoutes = [
  {name:'Asia → Europe via Malacca, Suez and Rotterdam', type:'trade', desc:'The classic sea corridor from East Asian factories through the Taiwan Strait, South China Sea, Malacca, Indian Ocean, Bab el-Mandeb, Red Sea, Suez, Mediterranean and Northern Europe.', pts:[[121.8,31.2],[122,24],[118,18],[110,8],[103.75,1.25],[95,5],[83,7],[70,10],[58,12],[48,12],[43.3,12.6],[40,18],[37,23],[32.3,30.4],[28,33],[20,36],[12,40],[4.47,51.92]]},
  {name:'Pacific electronics route', type:'trade', desc:'A trans-Pacific sea lane linking East Asian electronics clusters with North American consumer and tech markets.', pts:[[121.8,31.2],[130,32],[145,35],[160,39],[178,42],[-170,43],[-155,42],[-140,40],[-126,36],[-118.24,33.74]]},
  {name:'Atlantic agribusiness and energy route', type:'route', desc:'A South Atlantic sea lane moving food, minerals and energy from Brazil and West Africa toward European ports.', pts:[[-46.33,-23.96],[-38,-25],[-28,-18],[-20,-8],[-18,5],[-17,18],[-12,28],[-9,36],[-5,44],[4.47,51.92]]},
  {name:'Panama inter-oceanic corridor', type:'route', desc:'A water route joining the Pacific and Atlantic systems through the Panama Canal, one of globalization’s narrow gates.', pts:[[-118.24,33.74],[-110,25],[-92,12],[-79.55,9.08],[-78,18],[-74,40.7]]},
  {name:'Gulf oil to Asia', type:'route', desc:'Energy flows from the Gulf across the Arabian Sea and Indian Ocean toward Asian industrial demand.', pts:[[51,25],[58,23],[68,16],[80,7],[103.75,1.25],[121.8,31.2]]}
];

const stories = [
  ['singapore-rich','🇸🇬','Why Singapore became rich','Singapore','Development','From a swampy port to a global financial hub in one generation.', [103.85,1.29]],
  ['pix-brazil','🇧🇷','How Pix changed Brazil','Brazil','Fintech','A free instant payment system rewired an entire economy in months.', [-47.88,-15.8]],
  ['argentina-currency','🇦🇷','Why Argentina keeps facing currency crises','Argentina','Macro','A century of inflation, defaults, and dollar shortages — explained simply.', [-58.38,-34.6]],
  ['ports-matter','⚓','Why ports matter more than you think','Global','Logistics','90% of global trade travels by sea — and a few chokepoints control it all.', [103.75,1.25]],
  ['gulf-oil','🛢️','How oil transformed Gulf economies','Middle East','Energy','Sand, sovereign wealth, and the race to a post-oil future.', [46.7,24.7]],
  ['africa-complex','🌍','Why African economies are more complex than people think','Africa','Development','54 countries, 1.4 billion people, and a story far beyond aid.', [20,2]],
  ['belt-road','🇨🇳','The Belt and Road, explained','China','Geopolitics',"Beijing's $1 trillion bet on infrastructure diplomacy.", [116.4,39.9]],
  ['germany-industry','🇩🇪',"Germany's industrial puzzle",'Germany','Industry',"Why Europe's powerhouse is suddenly looking fragile.", [10,51]],
  ['south-china-sea','🌊','The South China Sea: a global chokepoint','Asia','Geopolitics','One-third of global shipping flows through contested waters.', [114,15]],
  ['semiconductors','💾','Why semiconductors control modern power','Global','Industry','Chips are the new oil — and a few companies make them all.', [121,24]],
  ['future-energy','⚡','The future of global energy','Global','Energy',"Renewables are surging, but oil isn't going quietly.", [55,24]],
  ['supply-chains','📦','How supply chains are being reshaped','Global','Logistics','Friend-shoring, near-shoring, and the end of hyper-globalization.', [-102,23]],
  ['demographic-decline','👥','Why demographic decline matters','Japan & Europe','Macro','Shrinking populations are quietly rewriting the global economy.', [138,37]],
  ['india-rise','🇮🇳',"India's economic rise",'India','Development',"How the world's most populous nation is reshaping global growth.", [78,22]],
  ['rare-earth','🪨','The rare earth war','Global','Industry','Why a handful of metals decide the future of tech and defense.', [104,35]],
  ['dollar-system','💵','The dollar system, explained','Global','Macro','How one currency quietly anchors the entire world economy.', [-74,40]],
  ['arctic-frontier','🧊','The Arctic: the new frontier','Arctic','Geopolitics','Melting ice is opening trade routes — and a great-power race.', [50,72]],
  ['africa-fintech','📱',"Africa's fintech leapfrog",'Africa','Fintech','From M-Pesa to mobile-first banking for a billion people.', [36.82,-1.29]],
  ['taiwan-strait','🇹🇼','Why the Taiwan Strait matters','Taiwan','Geopolitics','A narrow waterway carries chips, ships and the future of global tech.', [121,24]],
  ['saudi-vision','🏗️','Saudi Vision 2030, decoded','Saudi Arabia','Development','Megaprojects, sovereign wealth, and a race to a post-oil identity.', [46.7,24.7]],
  ['mexico-nearshoring','🇲🇽',"Mexico's nearshoring boom",'Mexico','Industry','How geography turned Mexico into the new factory of North America.', [-99.13,19.43]],
  ['green-deal','🌱',"Europe's Green Deal gamble",'Europe','Energy','A continent betting industrial policy on decarbonisation.', [8,50]],
  ['russia-war-economy','🛡️',"Russia's war economy",'Russia','Macro',"How sanctions reshaped — but did not break — Russia's economy.", [37.6,55.75]],

  ['japan-debt','🇯🇵',"Japan's debt paradox",'Japan','Macro','Why a country can owe so much and still remain financially stable.', [138,37]],
  ['chaebols-korea','🏢','How chaebols built Korea','South Korea','Industry','How family-controlled conglomerates powered industrial catch-up and created new vulnerabilities.', [127,37.56]],
  ['lithium-triangle','🔋','The Lithium Triangle','Latin America','Energy','Why Argentina, Chile and Bolivia sit at the center of the battery economy.', [-68,-23]],
  ['ai-geography','🧠','The new AI compute geography','Global','Industry','Why data centers, chips, power grids and water are becoming strategic infrastructure.', [-122,37]],
  ['water-crunch','💧','The global water crunch','Global','Development','How water scarcity is becoming an economic and geopolitical constraint.', [35,31]],
  ['panama-drought','🚢','When the Panama Canal runs short of water','Panama','Logistics','How drought can slow ships, raise prices and expose the hidden fragility of trade.', [-79.55,9.08]],
  ['red-sea-shock','🌊','Why the Red Sea matters','Middle East','Logistics','A narrow maritime corridor shows how security shocks can reroute global commerce.', [43.3,12.6]],
  ['nigeria-oil','🛢️',"Nigeria's oil paradox",'Nigeria','Energy','Why huge oil reserves do not automatically create fiscal stability or development.', [8,9]],
  ['kenya-mobile-money','📱','Kenya and the mobile money leap','Kenya','Fintech','How mobile payments changed finance before traditional banking reached everyone.', [36.82,-1.29]],
  ['morocco-industrial','🚗',"Morocco's industrial bet",'Morocco','Industry','How cars, ports, renewables and EU proximity reshaped a North African economy.', [-6,32]],
  ['egypt-suez-fx','🛳️','Egypt, Suez and the dollar shortage','Egypt','Macro','Why canals, food imports, tourism and foreign currency all connect.', [32.3,30.4]],
  ['turkey-inflation','💱',"Turkey's inflation experiment",'Turkey','Macro','How currency pressure, interest rates and politics reshape household life.', [35,39]],
  ['indonesia-nickel','🪨',"Indonesia's nickel strategy",'Indonesia','Industry','How one resource became a lever in the electric vehicle supply chain.', [118,-2]],
  ['vietnam-china-plus-one','🏭','Vietnam and China+1','Vietnam','Industry','Why manufacturers use Vietnam to diversify Asian supply chains.', [108,16]],
  ['qatar-lng','⛽','Qatar and the LNG age','Qatar','Energy','How gas wealth turned a small state into a global energy player.', [51,25]],
  ['uae-logistics','✈️','The UAE logistics model','UAE','Logistics','How ports, airlines, free zones and finance created a Gulf platform economy.', [54,24]],
  ['swiss-safe-haven','🏦','Why Switzerland is a safe haven','Switzerland','Macro','How stability, finance, currency credibility and institutions reinforce each other.', [8,47]],
  ['poland-convergence','🇵🇱',"Poland's convergence story",'Poland','Development','How EU integration, manufacturing and institutions helped narrow the income gap.', [20,52]],
  ['ethiopia-hydro','⚡',"Ethiopia's hydropower gamble",'Ethiopia','Energy','Why dams can become development tools, diplomatic pressure points and financial risks.', [40,9]],
  ['south-africa-power','🔌',"South Africa's power crisis",'South Africa','Energy','How electricity shortages can limit growth in an industrial economy.', [24,-29]],
  ['mexico-border-factories','🏭','Mexico, borders and factories','Mexico','Industry','Why proximity to the US is becoming one of Mexico’s biggest economic assets.', [-102,23]],
  ['arctic-shipping','🧊','Arctic shipping and great power rivalry','Arctic','Geopolitics','How melting ice creates new routes, risks and strategic competition.', [50,72]],
  ['cocoa-west-africa','🍫','Cocoa and West Africa','Côte d\'Ivoire & Ghana','Development','Why the world’s chocolate supply depends on farmers with little pricing power.', [-3,7]],
  ['green-hydrogen','🟢','The green hydrogen race','Global','Energy','Why countries with sun, wind, ports and industry want to export clean molecules.', [10,25]],
  ['remittances-economy','💸','How remittances shape economies','Global','Macro','Why money sent by migrants can stabilize households and entire countries.', [72,19]],
].map(([id,icon,title,place,category,description,coords])=>({id,icon,title,place,category,description,coords,coming:false}));

const comingSoon = [
  ['food-security','🌾','Food security in a hotter world','Global','Development'],
  ['space-economy','🛰️','The space economy and national power','Global','Industry'],
  ['insurance-climate','☔','Climate insurance and fragile states','Global','Macro'],
  ['african-rail','🚆','Africa’s rail corridor race','Africa','Logistics'],
  ['digital-currencies','🪙','Central bank digital currencies','Global','Fintech']
].map(([id,icon,title,place,category])=>({id,icon,title,place,category,description:'Coming soon.',coming:true}));

const didYouKnow = [
  {text:'South Korea was once poorer than Ghana — today it builds some of the world’s most advanced chips.', story:'semiconductors'},
  {text:'Singapore has almost no natural resources, yet became one of the richest economies in the world.', story:'singapore-rich'},
  {text:'Brazil’s Pix payment system changed how millions of people use money in only a few years.', story:'pix-brazil'},
  {text:'The Suez Canal is a narrow artificial passage but a major artery of world trade.', story:'ports-matter'},
  {text:'Taiwan’s chip industry is one of the world economy’s biggest pressure points.', story:'taiwan-strait'},
  {text:'A country can be rich in resources and still struggle if institutions, logistics and currency stability are weak.', story:'africa-complex'}
];
let factIndex = Math.floor(Math.random()*didYouKnow.length);

const dailyBrief = [
  {cat:'Currency',place:'Japan',title:'Yen pressure shows the growth-versus-inflation trap',h:'The yen stays under pressure as markets expect gradual normalization rather than a sharp policy shock.',m:'Japan must support growth while defending households from imported energy and food inflation.',w:'Watch central-bank language, FX intervention signals, and spillovers into Asian currencies.'},
  {cat:'Macro',place:'China',title:'China’s property problem keeps shaping consumption',h:'Policy support is trying to stabilize confidence after a long property downturn.',m:'Housing wealth affects household spending, local government finance and commodity demand.',w:'Watch whether support reaches private buyers and smaller developers.'},
  {cat:'Energy',place:'Europe',title:'Energy security is now industrial policy',h:'European governments are treating power prices, grids and clean industry as strategic questions.',m:'Cheap, reliable energy determines whether factories stay competitive during decarbonisation.',w:'Watch grid investment, nuclear debates and subsidy disputes.'},
  {cat:'Logistics',place:'Global',title:'Chokepoints remain the weak links of globalization',h:'Canals, straits and ports concentrate enormous trade flows into narrow spaces.',m:'A local disruption can quickly become a global price and supply problem.',w:'Watch the Red Sea, Panama Canal water levels, and South China Sea tensions.'},
  {cat:'Industry',place:'Global',title:'Chip supply chains are becoming geopolitical infrastructure',h:'Semiconductors sit at the center of AI, defense, cars and consumer electronics.',m:'The world depends on a small number of firms, regions and machines.',w:'Watch export controls, Taiwan risk and new fabs in the US, Europe and Japan.'}
];

const modules = [
  ['📈','Inflation','Why prices rise — and why it matters.'],['🚢','Trade','How countries exchange goods, services, and IOUs.'],['💱','Currency','What gives money its value.'],['🏦','Debt','Why governments borrow — and when it becomes dangerous.'],['⚡','Energy','The hidden input behind every economy.'],['🏗️','Development',"How poor countries become rich — or don't."],['🌍','Geography','Why location still shapes power.'],['🧩','Institutions','The rules behind prosperity.'],['💾','Technology','How innovation changes national power.'],['🛡️','Sanctions','How finance becomes a weapon.']
].map(([icon,title,desc],i)=>({icon,title,desc,num:String(i+1).padStart(2,'0')}));

const storySteps = {
  'belt-road': [
    {title:'It starts in Beijing', place:'Beijing, China', coords:[116.4,39.9], text:"BRI is announced from Beijing in 2013 — Xi Jinping's signature foreign-policy project, framed as a modern Silk Road of ports, rail and digital infrastructure."},
    {title:'The route moves through Central Asia and the Gulf', place:'Riyadh / Gulf corridor', coords:[46.7,24.7], text:'Energy, finance and logistics pull the project westward. Gulf states become connectors between Asian capital, oil wealth and new infrastructure.'},
    {title:'Chokepoints decide the economics', place:'Suez and Red Sea', coords:[32.3,29.9], text:'The dream of connectivity still depends on narrow passages. Suez and the Red Sea show how geography can compress world trade into fragile corridors.'},
    {title:'Europe becomes the final test', place:'Piraeus / Rotterdam', coords:[23.6,37.9], text:'Ports and rail links into Europe are not just trade tools. They become questions of influence, dependency and political leverage.'}
  ],
  'ports-matter': [
    {title:'Trade begins at the port',place:'Singapore',coords:[103.75,1.25],text:'A port is not just a dock. It is where customs, finance, insurance, containers and shipping schedules meet.'},
    {title:'The canal compresses the world',place:'Suez Canal',coords:[32.3,30.4],text:'A narrow artificial passage can save thousands of kilometers and decide the price of goods in distant countries.'},
    {title:'The Atlantic has its own gate',place:'Panama Canal',coords:[-79.55,9.08],text:'Panama connects two oceans, but drought and congestion reveal the physical limits of globalization.'},
    {title:'Final demand pulls everything',place:'Rotterdam',coords:[4.47,51.92],text:'Europe’s ports turn ship movements into factories, supermarkets and energy flows.'}
  ],
  'taiwan-strait': [
    {title:'A narrow sea lane',place:'Taiwan Strait',coords:[121,24],text:'The Taiwan Strait is small on a map but enormous in economic importance.'},
    {title:'Chips concentrate power',place:'Hsinchu / Taiwan',coords:[121,24.8],text:'The semiconductor ecosystem turns local industrial capacity into global leverage.'},
    {title:'Shipping routes amplify risk',place:'South China Sea',coords:[114,15],text:'Regional tensions interact with global shipping flows, electronics supply chains and insurance costs.'},
    {title:'The impact is global',place:'California / Tech demand',coords:[-122,37],text:'A disruption would be felt not only in Asia but across AI, cars, phones, defense and cloud infrastructure.'}
  ],
  'saudi-vision': [
    {title:'Oil built the state',place:'Eastern Province',coords:[50,26],text:'Saudi Arabia’s modern economy was built on oil rents, energy exports and state-led development.'},
    {title:'Riyadh becomes the command center',place:'Riyadh',coords:[46.7,24.7],text:'Vision 2030 turns the capital into a hub for investment, tourism, finance and administrative reform.'},
    {title:'Megaprojects sell a new future',place:'NEOM',coords:[35.1,28.1],text:'Projects like NEOM are designed to signal a post-oil identity and attract global capital.'},
    {title:'The test is private productivity',place:'Gulf region',coords:[54,24],text:'The long-term challenge is whether spending can become a durable private-sector economy.'}
  ],

  'panama-drought': [
    {title:'The canal is a water machine',place:'Panama Canal',coords:[-79.55,9.08],text:'The Panama Canal is not only a shortcut. It depends on freshwater locks, rainfall and lake levels.'},
    {title:'Drought becomes a trade constraint',place:'Gatun Lake',coords:[-79.9,9.25],text:'When water levels fall, authorities can restrict ship draft or daily crossings, turning climate into logistics policy.'},
    {title:'Shippers reroute and prices adjust',place:'Pacific and Atlantic routes',coords:[-84,12],text:'Delays push companies to pay premiums, wait longer or reroute through other corridors.'},
    {title:'A local weather shock becomes global',place:'US and Asian markets',coords:[-118,34],text:'The effects spread into shipping schedules, inventories and consumer prices far beyond Panama.'}
  ],
  'red-sea-shock': [
    {title:'A narrow corridor carries global trade',place:'Bab el-Mandeb',coords:[43.3,12.6],text:'The Red Sea links the Indian Ocean to Suez, making it central to Asia-Europe trade.'},
    {title:'Security risk changes the route',place:'Red Sea',coords:[38,20],text:'Attacks, insurance costs and naval risk can make ships avoid the corridor.'},
    {title:'The long way is expensive',place:'Cape of Good Hope',coords:[18,-34],text:'Rerouting around Africa adds time, fuel and uncertainty.'},
    {title:'Europe feels the delay',place:'Rotterdam',coords:[4.47,51.92],text:'The shock arrives as delayed inputs, higher freight rates and pressure on inventories.'}
  ],
  'lithium-triangle': [
    {title:'Lithium starts in the salt flats',place:'Atacama / Andes',coords:[-68,-23],text:'Lithium brines in Argentina, Chile and Bolivia sit beneath some of the driest landscapes on earth.'},
    {title:'Batteries pull demand north',place:'North America',coords:[-100,38],text:'Electric vehicles and grid batteries turn mineral deposits into industrial strategy.'},
    {title:'Processing decides value',place:'China and Asia',coords:[104,35],text:'Mining is only one part of the chain. Refining and battery manufacturing decide who captures value.'},
    {title:'The local constraint is water',place:'Andean communities',coords:[-67,-22],text:'The economic opportunity collides with water use, environmental stress and local politics.'}
  ],
  'indonesia-nickel': [
    {title:'Nickel begins in the islands',place:'Sulawesi / Indonesia',coords:[121,-3],text:'Indonesia’s nickel deposits became strategically valuable as EV battery demand increased.'},
    {title:'Export bans force processing at home',place:'Jakarta',coords:[106.85,-6.21],text:'Policy pushed firms to build smelters and processing capacity inside Indonesia.'},
    {title:'Capital and technology connect to Asia',place:'China and Korea',coords:[120,30],text:'Battery supply chains link Indonesian resources to Asian industrial firms.'},
    {title:'The test is upgrading',place:'Global EV markets',coords:[10,50],text:'The challenge is moving from raw materials into higher-value industrial capability.'}
  ],
  'uae-logistics': [
    {title:'The model starts at the port',place:'Jebel Ali',coords:[55.05,25.01],text:'Jebel Ali turned Dubai into a regional re-export and warehousing platform.'},
    {title:'Air routes multiply the effect',place:'Dubai',coords:[55.27,25.2],text:'Airlines and airports connect high-value goods, tourism and business services.'},
    {title:'Free zones reduce friction',place:'Gulf corridors',coords:[54,24],text:'Rules, logistics and finance are packaged together to attract firms.'},
    {title:'The platform reaches three continents',place:'Asia, Africa and Europe',coords:[43,20],text:'The UAE model depends on being a connector between regions rather than a large domestic market.'}
  ],

};
const globeStoryIds = Object.keys(storySteps);

function estimateMinutes(text, layer, storyId=''){
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const hash = [...storyId].reduce((a,ch)=>a+ch.charCodeAt(0),0);
  let m;
  if(layer==='quick') m = Math.round(words/185) + (hash % 2);
  else if(layer==='medium') m = Math.round(words/175) + 4 + (hash % 4);
  else m = Math.round(words/170) + 11 + (hash % 6);
  if(layer==='quick') m = Math.min(3, Math.max(1, m));
  if(layer==='medium') m = Math.min(10, Math.max(5, m));
  if(layer==='deep') m = Math.min(20, Math.max(13, m));
  return `${m} min`;
}

function storyText(story, layer){
  const angle = story.category === 'Macro' ? 'currency, debt, inflation and policy credibility' : story.category === 'Logistics' ? 'ports, sea lanes, insurance and chokepoints' : story.category === 'Energy' ? 'energy, infrastructure, prices and political leverage' : story.category === 'Geopolitics' ? 'geography, security, influence and strategic dependency' : story.category === 'Industry' ? 'technology, production networks and industrial capacity' : story.category === 'Fintech' ? 'payments, trust, banking access and digital infrastructure' : 'institutions, development strategy and geography';
  if(layer==='quick'){
    return `${story.title} is not just a headline. It is a compact example of how ${angle} can change the balance of power. ${story.description}\n\nThe simple lesson is this: countries do not become powerful only because they are large or rich in resources. They become powerful when geography, institutions, capital and timing reinforce each other. WorldPulse reads the story through that mechanism, not through daily noise.`;
  }
  if(layer==='medium'){
    return `01 — The starting point\n${story.title} begins with a constraint: location, resources, debt, population, technology or access to markets. That constraint does not automatically decide the result, but it sets the field on which governments, firms and investors play. ${story.description}\n\n02 — The mechanism\nThe core mechanism is ${angle}. A port can become power if trade needs it. A payment system can change an economy if millions of people adopt it. An industrial cluster can become strategic if the world depends on its output. The story becomes important when a local structure connects to a global need.\n\n03 — The winners and losers\nEvery economic model creates advantages and vulnerabilities. The winners are usually the actors who control infrastructure, finance, technology, energy or access. The losers are those exposed to price shocks, currency pressure, supply-chain disruption, demographic decline or weak institutions.\n\n04 — Why it matters now\nThe reason this story matters is that the world economy is becoming less neutral. Trade routes, chips, ports, currencies, food, energy and data are increasingly treated as strategic assets. That means economic facts quickly become geopolitical facts.`;
  }
  return `01 — The structure behind the story\n${story.title} should be read as a system rather than a single event. ${story.description} The visible event is only the surface. Under it sits a structure made of geography, capital, infrastructure, institutions, technology and political risk.\n\n02 — Geography and infrastructure\nGeography still matters because every economy must move people, energy, goods, data or money through physical and institutional channels. Ports, straits, grids, pipelines, factories, data centers, rail corridors and payment networks are not neutral background details. They are the hardware of power.\n\n03 — Incentives and institutions\nThe next layer is institutional. States decide rules, investors price credibility, firms search for margins, households react to prices, and foreign powers look for leverage. A strong institution can turn a weak starting position into an advantage. A weak institution can waste natural resources, population size or strategic location.\n\n04 — Global transmission\nWhat makes the topic global is transmission. A local shock can travel through exchange rates, commodity prices, container shipping, sanctions, supply contracts, insurance premiums, bond markets or technology controls. That is why a canal, a chip factory, a currency decision or a resource deposit can matter far beyond its own region.\n\n05 — Strategic consequence\nThe deeper lesson is that modern power is no longer only military. It is the ability to control critical nodes: finance, logistics, energy, data, technology and standards. Countries compete to reduce dependency while making others depend on them.\n\n06 — The trade-off\nEvery model has a cost. Openness brings growth but exposure. Industrial policy brings capacity but waste risk. Energy wealth brings capital but dependence. Financial power brings influence but fragility. Development is the art of choosing which vulnerabilities to accept and which ones to eliminate.\n\n07 — What to keep in mind\nThe important question is not simply whether the story is good or bad. The question is: who controls the bottleneck, who absorbs the risk, who pays when the system breaks, and who gains leverage when everyone else needs access?`;
}

function navigate(page, opts={}){
  state.page = page;
  if(opts.story) state.story = opts.story;
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function layout(content){
  return `<div class="shell">
    <aside class="sidebar">
      <button class="brand side-brand" onclick="navigate('home')"><span class="brand-orb">🌍</span><span>WorldPulse<div class="brand-sub">Economics · Geopolitics</div></span></button>
      <div class="nav-label">Navigate</div>
      <nav class="nav">
        ${navButton('discover','◉','Discover')}
        ${navButton('stories','▰','Stories')}
        ${navButton('compare','⇄','Compare')}
        ${navButton('daily','▤','Daily Brief')}
        ${navButton('learn','◇','Learn')}
      </nav>
      <div class="side-footer">Static MVP · no accounts · built for Netlify. Content is editable in the code.</div>
    </aside>
    <main class="main">
      <header class="topbar"><button class="pill-btn" onclick="navigate('home')">← Home</button><div class="live">LIVE ATLAS</div></header>
      <section class="content fade-in">${content}</section>
    </main>
  </div>`;
}
function navButton(page,icon,label){return `<button class="${state.page===page?'active':''}" onclick="navigate('${page}')"><span class="nav-icon">${icon}</span>${label}</button>`}

function home(){
  return `<div class="home">
    <nav class="home-nav"><button class="brand" onclick="navigate('home')"><span class="brand-orb">🌍</span><span>WorldPulse<div class="brand-sub">Economics · Geopolitics</div></span></button><div class="home-actions"><button class="pill-btn" onclick="document.getElementById('tour').scrollIntoView({behavior:'smooth'})">How it works</button><button class="dark-btn" onclick="navigate('discover')">Enter WorldPulse →</button></div></nav>
    <section class="hero">
      <div><div class="kicker">Not a newspaper. Not a feed. Not doomscrolling.</div><h1>Understand the world as a system.</h1><p>WorldPulse is a smooth interactive atlas for economics and geopolitics. It connects countries, ports, cities, trade routes, currencies, energy and stories — so the world feels less like random headlines and more like a map you can read.</p><div class="hero-cta"><button class="dark-btn" onclick="navigate('discover')">Discover the atlas →</button><button class="ghost-btn" onclick="navigate('stories')">Browse stories</button></div><div class="hero-note">Atlas · story mode · country profiles · daily brief · learning modules</div></div>
      <div class="world-mosaic" aria-hidden="true"><div class="mosaic-card big"><span>🌊</span><b>Chokepoints</b><p>Suez, Malacca, Panama, Hormuz.</p></div><div class="mosaic-card"><span>🏙️</span><b>Cities</b><p>Finance, technology, industry.</p></div><div class="mosaic-card"><span>⚓</span><b>Ports</b><p>Where globalization becomes physical.</p></div><div class="mosaic-card dark"><span>⚡</span><b>Power</b><p>Energy, chips, money and leverage.</p></div></div>
    </section>
    <section id="tour" class="home-strip">
      <button class="strip-card" onclick="navigate('discover')"><h3>Discover</h3><p>Open the atlas. Activate cities, ports and sea routes. Click countries directly to understand their economy.</p></button>
      <button class="strip-card" onclick="navigate('stories')"><h3>Stories in 3 layers</h3><p>Choose quick insight, medium story or deep dive depending on how far you want to go.</p></button>
      <button class="strip-card" onclick="navigate('compare')"><h3>Compare countries</h3><p>See how two economies differ across GDP, population, currency, energy and model.</p></button>
    </section>
  </div>`
}

function discover(){
  const fact = didYouKnow[factIndex % didYouKnow.length];
  return layout(`
    <div class="row-head"><span>▤ Today's World</span><button class="link-line" onclick="navigate('daily')">Daily brief ↗</button></div>
    <div class="brief-row">${dailyBrief.slice(0,3).map(b=>`<button class="brief-card" onclick="navigate('daily')"><span class="tag ${b.cat}">${b.cat}</span><span class="meta">${b.place}</span><h3>${b.title}</h3></button>`).join('')}</div>
    <button class="fact-card" onclick="navigate('story',{story:'${fact.story}'})"><div class="spark">✦</div><div><div class="row-head" style="margin:0 0 4px"><span>Did you know?</span></div><h3>${fact.text}</h3><span class="link-line">Read the story ↗</span></div></button>
    <div class="atlas-head"><div><div class="section-kicker">WorldPulse · Atlas</div><h2>Scroll the world,<br>not a feed.</h2><p>Spin the globe. Tap a country, city, port or trade route to learn how money, power and geography shape it.</p></div></div>
    ${atlas('main')}
  `);
}

function atlas(id){
  return `<div class="atlas-wrap atlas-wrap-stacked">
    <div class="globe-panel"><div class="globe-toolbar"><div class="hint">Drag · scroll to zoom</div></div><svg id="globe-${id}" class="globe-svg"></svg></div>
    <section class="atlas-info-below">
      <div class="layer-controls">
        <h4>Layers</h4>
        <div class="layer-toggle-grid">${toggle('cities','Cities')}${toggle('ports','Ports')}${toggle('routes','Trade routes')}</div>
      </div>
      <div id="country-pop-${id}" class="country-pop country-pop-wide">${itemPanel(state.selectedItem)}</div>
    </section>
  </div>`;
}
function toggle(key,label){return `<div class="toggle-row"><span>${label}</span><button class="switch ${state.layer[key]?'on':''}" onclick="state.layer.${key}=!state.layer.${key}; render()"></button></div>`}
function itemPanel(item){
  if(!item) return countryPanel(state.currentCountry || countryByName.Brazil);
  const kind = item.kind==='route' ? 'route' : item.type==='port' ? 'port' : (item.type==='finance'?'finance':'city');
  const profile=getEntityProfile(item);
  const subtitle = item.kind==='route' ? 'Trade route · sea corridor' : item.type==='port' ? (profile?.tag || 'Port / chokepoint') : (profile?.tag || 'City / economic node');
  const watch = item.kind==='route'?'Canal congestion, naval risk, weather, insurance costs and rerouting.':(profile?.watch || (item.type==='port'?'Terminal capacity, hinterland rail/roads, strikes, customs delays and geopolitical shocks.':'Investment flows, talent concentration, infrastructure pressure and policy choices.'));
  const matters = item.kind==='route'?'Sea routes are the hidden map underneath prices and supply chains.':(profile?.matters || 'This node links local geography to the global economy.');
  return `${infoImage(kind,item.name,subtitle)}<h3>${item.name}</h3><p>${subtitle}</p><p>${item.desc || 'A maritime corridor connecting production, energy, ports and final demand.'}</p><div class="info-list"><b>WorldPulse lens</b><span>${lensForItem(item)}</span><b>What to watch</b><span>${watch}</span><b>Why it matters</b><span>${matters}</span></div>`;
}
function countryPanel(c){
  if(!c) return `<h3>World Atlas</h3><p>Click a country, city, port or route to inspect it.</p>`;
  const angle = `${c.name} is shaped by ${c.model.toLowerCase()}, with ${c.exports} linking it to global demand.`;
  const power = `${c.strength} is its main source of leverage; ${c.vulnerability.toLowerCase()} is the constraint that can weaken it.`;
  return `${infoImage('country',c.name,c.region)}<h3>${c.name}</h3><p>${c.region} · ${c.pop} · ${c.currency}</p><p>${c.model}. Main exports: ${c.exports}.</p><div class="metric-grid"><div class="metric-mini"><span>GDP</span><b>${c.gdp}</b></div><div class="metric-mini"><span>GDP / cap</span><b>${c.gdppc}</b></div><div class="metric-mini"><span>Energy</span><b>${c.energy}</b></div><div class="metric-mini"><span>Key risk</span><b>${c.risk}</b></div></div><div class="info-list"><b>Economic model</b><span>${angle}</span><b>Strengths</b><span>${power}</span><b>Vulnerabilities</b><span>${c.name}'s key pressure point is ${c.vulnerability.toLowerCase()}, especially if ${c.risk.toLowerCase()} becomes more severe.</span><b>WorldPulse reading</b><span>Read ${c.name} through four lenses: geography, exports, energy dependence and institutional capacity. That mix explains its room for maneuver.</span></div><button class="pill-btn" style="margin-top:12px" onclick="navigate('compare')">Compare ↗</button>`;
}


function storiesPage(){
  const q = state.search.toLowerCase();
  const filtered = stories.filter(s=>(state.category==='All'||s.category===state.category) && [s.title,s.place,s.category,s.description].join(' ').toLowerCase().includes(q));
  return layout(`
    <div class="section-kicker">Stories</div><h2 class="page-title">Country deep dives</h2><p class="page-sub">Long-form explainers — but never long-winded. Read each story in 3 layers: quick, medium or deep.</p>
    <input class="search" placeholder="Search by country, region or topic — e.g. Singapore, Africa, energy" value="${state.search}" oninput="state.search=this.value; render()" />
    <div class="chips">${categories.map(c=>`<button class="chip ${state.category===c?'active':''}" onclick="state.category='${c}'; render()">${c}</button>`).join('')}</div>
    <div class="story-grid">${filtered.map(storyCard).join('')}</div>
    <div class="coming"><div class="row-head"><span>Coming soon</span></div><div class="story-grid">${comingSoon.map(storyCard).join('')}</div></div>
  `);
}
function storyCard(s){
  return `<button class="story-card ${s.coming?'locked':''}" ${s.coming?'':'onclick="navigate(\'story\',{story:\''+s.id+'\'})"'}><div class="story-top"><span class="story-icon">${s.icon}</span><span class="tag ${s.category}">${s.category}</span>${s.coming?'<span class="lock">▢</span>':''}</div><h3>${s.title}</h3><div class="story-place">${s.place}</div><p class="story-desc">${s.description}</p><div class="story-bottom"><span>◷ 3 layers</span><span class="read-link">${s.coming?'Locked':'Read →'}</span></div></button>`;
}

function storyPage(){
  const s = stories.find(x=>x.id===state.story) || stories[0];
  const txt = storyText(s,state.storyLayer);
  const time = estimateMinutes(txt,state.storyLayer,s.id);
  const hasGlobe = globeStoryIds.includes(s.id);
  return layout(`<div class="story-detail"><button class="pill-btn" onclick="navigate('stories')">← Back to stories</button><div class="story-hero"><div class="story-top"><span class="story-icon">${s.icon}</span><span class="tag ${s.category}">${s.category}</span></div><div class="section-kicker">${s.place} · ${time}</div><h2>${s.title}</h2><p class="page-sub" style="margin-bottom:0">${s.description}</p><div class="story-actions">${hasGlobe?`<button class="dark-btn" onclick="openStoryGlobe('${s.id}')">View on globe →</button>`:''}</div></div><div class="layer-tabs">${['quick','medium','deep'].map(l=>`<button class="layer-tab ${state.storyLayer===l?'active':''}" onclick="state.storyLayer='${l}'; render()">${l==='quick'?'Quick Insight':l==='medium'?'Medium Story':'Deep Dive'} · ${estimateMinutes(storyText(s,l),l,s.id)}</button>`).join('')}</div><article class="article">${articleHTML(s,txt)}</article></div>`);
}

function storyVisual(s){
  const vals = [34,58,73,46,82].map((v,i)=>v + ((s.id.charCodeAt(i%s.id.length)||0)%12));
  if(s.category==='Macro') return `<div class="story-visual"><div><b>Macro pressure map</b><p>Currency, debt, inflation and confidence move together.</p></div><div class="bars">${vals.map((v,i)=>`<span style="height:${v}%"></span>`).join('')}</div></div>`;
  if(s.category==='Logistics') return `<div class="story-visual route-visual"><b>Supply chain logic</b><p>Production → port → chokepoint → market → price shock.</p><div class="flow"><span>Factory</span><i></i><span>Port</span><i></i><span>Canal</span><i></i><span>Consumer</span></div></div>`;
  if(s.category==='Energy') return `<div class="story-visual energy-visual"><b>Energy transition tension</b><p>Old fuels still power the system while new infrastructure is built.</p><div class="split"><span>Oil / gas rents</span><strong>↔</strong><span>Renewables / grids</span></div></div>`;
  if(s.category==='Industry') return `<div class="story-visual"><div><b>Industrial concentration</b><p>A few clusters can control global capacity.</p></div><div class="chip-grid">${Array.from({length:16}).map((_,i)=>`<span class="${i%5===0?'hot':''}"></span>`).join('')}</div></div>`;
  return `<div class="story-visual"><div><b>Timeline logic</b><p>The story is easier to read when you separate constraint, strategy, bottleneck and result.</p></div><div class="mini-timeline"><span>Constraint</span><span>Strategy</span><span>Bottleneck</span><span>Result</span></div></div>`;
}

function articleHTML(s,txt){
  const blocks = txt.split(/\n\n+/).filter(Boolean);
  return blocks.map(block=>{
    const m=block.match(/^(\d{2}\s[—-]\s[^\n]+)\n([\s\S]*)/);
    if(m) return `<section><h3>${m[1]}</h3><p>${m[2]}</p></section>`;
    return `<p>${block}</p>`;
  }).join('') + `<div class="takeaway"><b>Key takeaway</b><p>${s.title} matters because it turns an economic fact into a map of incentives, dependencies and power.</p></div>`;
}

function compare(){
  const a=countryByName[state.compareA], b=countryByName[state.compareB];
  const rows=[['GDP',a.gdp,b.gdp],['GDP per capita',a.gdppc,b.gdppc],['Population',a.pop,b.pop],['Currency',a.currency,b.currency],['Energy dependence',a.energy,b.energy],['Debt / risk lens',a.risk,b.risk],['Economic model',a.model,b.model],['Main exports',a.exports,b.exports]];
  return layout(`<div class="section-kicker">Compare</div><h2 class="page-title">Two countries, side by side</h2><p class="page-sub">A quick way to spot what makes economies different.</p><div class="compare-selectors"><div class="selector-card"><h3>${flag(a.name)} ${a.name}</h3>${selectCountry('compareA')}</div><div class="selector-card"><h3>${flag(b.name)} ${b.name}</h3>${selectCountry('compareB')}</div></div><div class="contrast"><b>Key contrast</b>${a.name} is shaped by ${a.model.toLowerCase()}, while ${b.name} is shaped by ${b.model.toLowerCase()}.</div><div class="compare-table">${rows.map(r=>`<div class="compare-row"><div class="left">${r[1]}</div><div class="label">${r[0]}</div><div class="right">${r[2]}</div></div>`).join('')}</div>`);
}
function selectCountry(key){const sorted=[...countries].sort((a,b)=>a.name.localeCompare(b.name));return `<select class="select" onchange="state.${key}=this.value; render()">${sorted.map(c=>`<option ${state[key]===c.name?'selected':''}>${c.name}</option>`).join('')}</select>`}
function flag(name){const code=countryCodeForFlag(name); if(!code) return '🌐'; return code.toUpperCase().replace(/./g,ch=>String.fromCodePoint(127397+ch.charCodeAt(0)));}

function daily(){
  return layout(`<div class="section-kicker">▣ Daily Brief · Demo edition</div><h2 class="page-title">5 things shaping the world today</h2><p class="page-sub">Read in 4 minutes. Sound smart at lunch.</p><div class="daily-list">${dailyBrief.map((d,i)=>`<div class="daily-card"><div class="daily-top"><span class="daily-num">${String(i+1).padStart(2,'0')}</span><span class="tag ${d.cat}">${d.cat}</span><span class="story-place">${d.place}</span></div><h3>${d.title}</h3><div class="brief-sections"><div class="brief-section"><b>What happened</b><p>${d.h}</p></div><div class="brief-section"><b>Why it matters</b><p>${d.m}</p></div><div class="brief-section"><b>What to watch</b><p>${d.w}</p></div></div></div>`).join('')}</div>`)
}
function learn(){return layout(`<div class="section-kicker">Learn</div><h2 class="page-title">10 modules to think like an economist</h2><p class="page-sub">Bite-sized lessons. Real examples. A short quiz later.</p><div class="module-grid">${modules.map(m=>`<button class="module-card"><span class="module-num">${m.num}</span><div class="module-icon">${m.icon}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="progress-line"><span></span></div></button>`).join('')}</div>`)}

function openStoryGlobe(id){
  state.globeStory = id;
  state.globeStep = 0;
  renderStoryGlobeOverlay();
}
function closeStoryGlobe(){const el=document.getElementById('story-globe-overlay'); if(el) el.remove(); state.globeStory=null;}
function continueGlobeStory(){const ids=globeStoryIds; const i=ids.indexOf(state.globeStory); state.globeStory=ids[(i+1+ids.length)%ids.length]; state.globeStep=0; renderStoryGlobeOverlay();}
function nextStep(){
  const steps = getSteps();
  if(state.globeStep < steps.length-1){state.globeStep++; renderStoryGlobeOverlay();}
}
function prevStep(){if(state.globeStep>0){state.globeStep--; renderStoryGlobeOverlay();}}
function getSteps(){
  const s=stories.find(x=>x.id===state.globeStory)||stories[0];
  return storySteps[s.id] || [
    {title:s.title,place:s.place,coords:s.coords,text:s.description},
    {title:'The economic layer',place:'Trade and finance',coords:s.coords,text:'The story connects production, capital, transport and policy incentives.'},
    {title:'The geopolitical layer',place:s.place,coords:s.coords,text:'The same facts can become leverage when states, firms and investors react to risk.'},
    {title:'The global consequence',place:'World system',coords:[0,20],text:'The lesson travels beyond one country: geography and institutions shape the whole system.'}
  ];
}
function renderStoryGlobeOverlay(){
  let el=document.getElementById('story-globe-overlay');
  const steps=getSteps(); const step=steps[state.globeStep];
  const s=stories.find(x=>x.id===state.globeStory)||stories[0];
  const html=`<div id="story-globe-overlay" class="story-globe"><button class="close" onclick="closeStoryGlobe()">×</button><div class="story-globe-map"><div class="globe-panel"><svg id="globe-story" class="globe-svg"></svg></div></div><aside class="story-globe-panel"><div class="step-kicker">Step ${state.globeStep+1} of ${steps.length} · ${s.title}</div><div class="location-chip">● ${step.place}</div><h2>${step.title}</h2><p>${step.text}</p><div class="globe-note"><b>Map logic</b><span>This location is a node in the wider system: follow the movement of money, goods, energy and leverage as the globe turns.</span></div><div class="progress">${steps.map((_,i)=>`<div class="bar ${i<=state.globeStep?'done':''}"><span></span></div>`).join('')}</div><div class="story-globe-actions"><button class="pill-btn" onclick="prevStep()">← Back</button>${state.globeStep===steps.length-1?`<button class="dark-btn" onclick="continueGlobeStory()">Continue with another story →</button><button class="ghost-btn" onclick="closeStoryGlobe(); navigate('stories')">Back to stories</button>`:`<button class="dark-btn" onclick="nextStep()">Continue →</button>`}</div></aside></div>`;
  if(!el){document.body.insertAdjacentHTML('beforeend',html)} else {el.outerHTML=html}
  setTimeout(()=>drawGlobe('story',{focus:step.coords, markers:steps.map((x,i)=>({name:x.place,desc:x.title,lon:x.coords[0],lat:x.coords[1],type:'story',active:i===state.globeStep})), storyMode:true}),40);
}

function render(){
  const app=document.getElementById('app');
  if(state.page==='home') app.innerHTML=home();
  if(state.page==='discover') app.innerHTML=discover();
  if(state.page==='stories') app.innerHTML=storiesPage();
  if(state.page==='story') app.innerHTML=storyPage();
  if(state.page==='compare') app.innerHTML=compare();
  if(state.page==='daily') app.innerHTML=daily();
  if(state.page==='learn') app.innerHTML=learn();
  setTimeout(()=>{
    if(document.getElementById('globe-main')) drawGlobe('main',{});
    hydratePanelImages(app);
  },50);
}

function loadGeo(){
  if(state.countriesGeo) return Promise.resolve(state.countriesGeo);
  return fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r=>r.json()).then(world=>{
    state.countriesGeo = topojson.feature(world, world.objects.countries).features;
    return state.countriesGeo;
  }).catch(()=>{ state.countriesGeo=[]; return []; });
}

function drawGlobe(id, opts={}){
  loadGeo().then(features=>{
    const svg=d3.select(`#globe-${id}`); if(svg.empty()) return;
    if(globeTimers[id]) globeTimers[id].stop();
    svg.selectAll('*').remove();
    const node=svg.node(); const width=node.clientWidth||900, height=node.clientHeight||630;
    const focus=opts.focus || (state.focusedCountry?.coords) || [0,20];
    const scale = opts.storyMode ? Math.min(width,height)*0.54 : Math.min(width,height)*0.46;
    const projection=d3.geoOrthographic().translate([width/2,height/2]).scale(scale).rotate([-focus[0],-focus[1],0]).clipAngle(90).precision(.3);
    const path=d3.geoPath(projection);
    svg.attr('viewBox',`0 0 ${width} ${height}`);
    const defs=svg.append('defs');
    const grad=defs.append('radialGradient').attr('id',`sea-${id}`).attr('cx','38%').attr('cy','30%');
    grad.append('stop').attr('offset','0%').attr('stop-color','#f8fbff');
    grad.append('stop').attr('offset','55%').attr('stop-color','#e2f2f7');
    grad.append('stop').attr('offset','100%').attr('stop-color','#cfe6f2');
    svg.append('circle').attr('class','sphere').attr('cx',width/2).attr('cy',height/2).attr('r',projection.scale()).attr('fill',`url(#sea-${id})`);
    const g=svg.append('g');
    g.append('path').datum(d3.geoGraticule10()).attr('class','graticule').attr('d',path);
    g.selectAll('path.country').data(features).join('path').attr('class',d=>`country ${state.focusedCountry && geoCountryMatches(d.properties?.name,state.focusedCountry)?'focused':''}`).attr('d',path).on('click',(e,d)=>{
      const name=d.properties?.name;
      const match = countryByName[name] || countries.find(c=>name && (name.includes(c.name)||c.name.includes(name)));
      if(match){ state.currentCountry=match; state.focusedCountry=match; state.selectedItem=null; render(); }
    });

    const markers=[];
    if(opts.markers) markers.push(...opts.markers);
    else {
      if(state.layer.cities) markers.push(...cities);
      if(state.layer.ports) markers.push(...ports);
    }
    if(!opts.storyMode && state.layer.routes) drawRoutes(svg, projection, path);
    if(opts.storyMode) drawRoutes(svg, projection, path, true);
    drawMarkers(svg, projection, markers, opts.storyMode);

    const repaintGlobe=()=>{
      g.selectAll('path').attr('d',path);
      svg.selectAll('.route').attr('d',d=>routePath(d.pts,projection));
      updateMarkers(svg, projection);
    };
    let resumeAt=0, lastTick=Date.now();
    const pauseAuto=(ms=2800)=>{ resumeAt=Date.now()+ms; };
    svg.on('pointerdown.autospin',()=>pauseAuto(3600)).on('wheel.autospin',()=>pauseAuto(3600)).on('touchstart.autospin',()=>pauseAuto(3600));

    const drag=d3.drag().on('start',()=>pauseAuto(4200)).on('drag', (event)=>{
      pauseAuto(4200);
      const r=projection.rotate();
      projection.rotate([r[0]+event.dx/3, r[1]-event.dy/3, r[2]]);
      repaintGlobe();
    });
    if(!opts.storyMode){ svg.call(drag); svg.call(d3.zoom().scaleExtent([.85,2.8]).on('zoom',(event)=>{pauseAuto(4200); projection.scale(scale*event.transform.k); svg.select('circle.sphere').attr('r',projection.scale()); repaintGlobe();})); }
    else { svg.call(drag); }

    globeTimers[id]=d3.timer(()=>{
      const now=Date.now();
      if(now<resumeAt){ lastTick=now; return; }
      const dt=Math.min(40, now-lastTick); lastTick=now;
      const r=projection.rotate();
      projection.rotate([r[0]+dt*0.006, r[1], r[2]]);
      repaintGlobe();
    });
  });
}
function drawRoutes(svg, projection, path, all=false){
  const data=all?tradeRoutes.slice(0,3):tradeRoutes;
  svg.append('g').selectAll('path.route').data(data).join('path')
    .attr('class',d=>`route ${d.type}`)
    .attr('d',d=>routePath(d.pts,projection))
    .on('mousemove',(e,d)=>showTip(e,`<b>${d.name}</b><br>${d.desc||'Sea trade corridor'}`))
    .on('mouseleave',hideTip)
    .on('click',(e,d)=>{state.selectedItem={kind:'route',...d}; updateInfoPanel();});
}
function frontVisible(lon,lat,projection){
  const r=projection.rotate();
  const center=[-r[0],-r[1]];
  return d3.geoDistance([lon,lat], center) < Math.PI/2 - 0.025;
}
function routePath(pts, projection){
  // Build curved maritime segments only on the visible hemisphere.
  // Each original route uses many sea waypoints, so the visual line bends around coasts instead of cutting across land.
  let d='';
  for(let i=0;i<pts.length-1;i++){
    const a=pts[i], b=pts[i+1];
    const interp=d3.geoInterpolate(a,b);
    const samples=[];
    for(let t=0;t<=1.0001;t+=0.18){
      const ll=interp(t);
      if(!frontVisible(ll[0],ll[1],projection)){ samples.length=0; break; }
      const p=projection(ll); if(p) samples.push(p);
    }
    if(samples.length<2) continue;
    d += `M ${samples[0][0].toFixed(1)} ${samples[0][1].toFixed(1)} `;
    for(let j=1;j<samples.length;j++){
      const prev=samples[j-1], cur=samples[j];
      const mx=(prev[0]+cur[0])/2, my=(prev[1]+cur[1])/2 - 10;
      d += `Q ${mx.toFixed(1)} ${my.toFixed(1)} ${cur[0].toFixed(1)} ${cur[1].toFixed(1)} `;
    }
  }
  return d;
}
function updateInfoPanel(){
  document.querySelectorAll('.country-pop').forEach(el=>{el.innerHTML=itemPanel(state.selectedItem); hydratePanelImages(el);});
}

function markerColor(t){return t==='port'?'#d97706':t==='finance'?'#6d28d9':t==='story'?'#2563eb':t==='city'?'#2f855a':'#111827'}
function drawMarkers(svg, projection, markers, storyMode){
  const g=svg.append('g').attr('class','markers');
  const groups=g.selectAll('g.marker').data(markers).join('g').attr('class',d=>`marker ${d.active?'active':''}`).attr('data-lon',d=>d.lon).attr('data-lat',d=>d.lat).on('mousemove',(e,d)=>showTip(e,`<b>${d.name}</b><br>${d.desc||d.type}`)).on('mouseleave',hideTip).on('click',(e,d)=>{state.selectedItem=d; updateInfoPanel();});
  groups.append('circle').attr('class','pulse-ring').style('display',d=>d.active?'block':'none');
  groups.append('circle').attr('class','core').attr('r',d=>d.active?8:storyMode?5:5.5).attr('fill',d=>markerColor(d.type));
  groups.append('text').text(d=>d.active||storyMode?d.name:'' ).attr('x',12).attr('y',4);
  updateMarkers(svg,projection);
}
function updateMarkers(svg, projection){
  svg.selectAll('g.marker').each(function(d){
    const p=projection([d.lon,d.lat]);
    const visible=p && frontVisible(d.lon,d.lat,projection);
    d3.select(this).attr('transform',p?`translate(${p[0]},${p[1]})`:'translate(-999,-999)').style('display',visible?'block':'none');
  });
}
function showTip(e,html){
  let t=document.querySelector('.tooltip'); if(!t){t=document.createElement('div');t.className='tooltip';document.body.appendChild(t)}
  t.innerHTML=html; t.style.left=(e.clientX+14)+'px'; t.style.top=(e.clientY+14)+'px'; t.style.opacity=1;
}
function hideTip(){const t=document.querySelector('.tooltip'); if(t)t.style.opacity=0;}

window.navigate=navigate; window.continueGlobeStory=continueGlobeStory; window.openStoryGlobe=openStoryGlobe; window.closeStoryGlobe=closeStoryGlobe; window.nextStep=nextStep; window.prevStep=prevStep;
render();
