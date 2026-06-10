/* WorldPulse static MVP — Netlify-ready */
const state = {
  page: 'home',
  currentCountry: null,
  focusedCountry: null,
  search: '',
  countryQuery: '',
  category: 'All',
  layer: { cities: true, ports: true },
  countriesGeo: null,
  compareA: 'Singapore',
  compareB: 'Germany',
  story: null,
  storyLayer: 'quick',
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
  'Singapore':'Singapore skyline',
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
  'Mexico City':'Mexico City',
  'Sydney':'Sydney',
  'Miami':'Miami',
  'Rio de Janeiro':'Rio de Janeiro',
  'Chongqing':'Chongqing',
  'Osaka':'Osaka',
  'Los Angeles':'Los Angeles',
  'Moscow':'Moscow',
  'Milan':'Milan',
  'Tel Aviv':'Tel Aviv',
  'Jerusalem':'Jerusalem',
  'Toronto':'Toronto',
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
  ['Panama','Americas','PAB / USD','$86.5B','$19,200','4.5M','Canal, logistics and services economy','Medium imports','Canal services, Logistics, Copper','Canal location','Water dependence','Drought and fiscal pressure',[-80,9]],
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
const uniqueCountries = Object.values(countryByName).sort((a,b)=>a.name.localeCompare(b.name));
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
function jsString(v){return JSON.stringify(String(v)).replace(/&/g,'\u0026').replace(/</g,'\u003c').replace(/>/g,'\u003e').replace(/"/g,'&quot;');}
const countryFlagCodes = {
  'United States':'us','China':'cn','Japan':'jp','Germany':'de','India':'in','United Kingdom':'gb','France':'fr','Italy':'it','Brazil':'br','Canada':'ca','Russia':'ru','Mexico':'mx','South Korea':'kr','Australia':'au','Spain':'es','Indonesia':'id','Netherlands':'nl','Saudi Arabia':'sa','Turkey':'tr','Switzerland':'ch','Taiwan':'tw','Poland':'pl','Argentina':'ar','Belgium':'be','Sweden':'se','Ireland':'ie','Norway':'no','Singapore':'sg','UAE':'ae','Israel':'il','Thailand':'th','Vietnam':'vn','Malaysia':'my','Philippines':'ph','Bangladesh':'bd','Pakistan':'pk','Egypt':'eg','South Africa':'za','Nigeria':'ng','Kenya':'ke','Ethiopia':'et','Morocco':'ma','Algeria':'dz','Chile':'cl','Peru':'pe','Colombia':'co','Uruguay':'uy','Qatar':'qa','Iran':'ir','Iraq':'iq','Greece':'gr','Portugal':'pt','Austria':'at','Czechia':'cz','Ukraine':'ua','Romania':'ro','Hungary':'hu','Denmark':'dk','Finland':'fi','New Zealand':'nz','Kazakhstan':'kz','Ghana':'gh','Belarus':'by','Slovakia':'sk','Slovenia':'si','Croatia':'hr','Serbia':'rs','Bulgaria':'bg','Lithuania':'lt','Latvia':'lv','Estonia':'ee','Luxembourg':'lu','Iceland':'is','Malta':'mt','Cyprus':'cy','Georgia':'ge','Armenia':'am','Azerbaijan':'az','Jordan':'jo','Lebanon':'lb','Oman':'om','Kuwait':'kw','Bahrain':'bh','Nepal':'np','Sri Lanka':'lk','Myanmar':'mm','Cambodia':'kh','Laos':'la','Mongolia':'mn','Uzbekistan':'uz','Tunisia':'tn','Senegal':'sn',"Côte d'Ivoire":'ci','Tanzania':'tz','Uganda':'ug','Rwanda':'rw','Angola':'ao','DR Congo':'cd','Cameroon':'cm','Zambia':'zm','Mozambique':'mz'
};
function countryCodeForFlag(name){ return countryFlagCodes[name] || null; }
function singaporeFlagDataUrl(){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#fff"/><rect width="900" height="300" fill="#ef3340"/><circle cx="230" cy="150" r="92" fill="#fff"/><circle cx="258" cy="150" r="76" fill="#ef3340"/><g fill="#fff"><text x="335" y="108" font-size="56">★</text><text x="387" y="146" font-size="56">★</text><text x="367" y="210" font-size="56">★</text><text x="303" y="210" font-size="56">★</text><text x="283" y="146" font-size="56">★</text></g></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function flagImageUrl(name){
  if(name==='Singapore') return singaporeFlagDataUrl();
  const code = countryFlagCodes[name];
  return code ? `https://flagcdn.com/w640/${code}.png` : entityVisual('country', name, 'Flag');
}
function photoSeed(kind, name){
  return Math.abs(hashText(`${kind}:${name}`));
}
function wikipediaSummaryUrl(title){
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
}
const photoQueryOverrides = {
  'Singapore': 'Marina Bay Singapore skyline city',
  'Ho Chi Minh/Cat Lai': 'Cat Lai port Ho Chi Minh containers terminal',
  'Rotterdam': 'Port of Rotterdam Maasvlakte container terminal harbor',
  'Antwerp-Bruges': 'Port of Antwerp Bruges container terminal harbor',
  'Algeciras': 'Port of Algeciras container terminal Strait of Gibraltar',
  'Sydney': 'Sydney skyline Opera House harbour city',
  'Miami': 'Miami skyline downtown Biscayne Bay city',
  'Rio de Janeiro': 'Rio de Janeiro skyline Guanabara Bay city',
  'Chongqing': 'Chongqing skyline Yangtze Jialing rivers city',
  'Osaka': 'Osaka skyline Umeda city',
  'Los Angeles': 'Los Angeles downtown skyline city',
  'Moscow': 'Moscow skyline Kremlin city',
  'Milan': 'Milan skyline Porta Nuova city',
  'Tel Aviv': 'Tel Aviv skyline Mediterranean city',
  'Jerusalem': 'Jerusalem skyline Old City city',
  'Toronto': 'Toronto skyline CN Tower city'
};
function photoQuery(kind, name){
  const direct = photoQueryOverrides[name] || (kind==='country' ? (countryPhotoQueries[name] || `${name} skyline`) : name);
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
  // For explicit visual overrides, use the targeted city/port image search fallback instead of Wikipedia,
  // because Wikipedia can return flags, maps or administrative images rather than the actual city/port.
  if(photoQueryOverrides[name]) return null;
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
  if(item?.type==='port') return 'Ports are physical bottlenecks of globalization. They connect ships, containers, customs, warehouses and inland logistics.';
  return 'Cities concentrate people, firms, infrastructure and institutions, making them useful windows into national economies.';
}


const cities = [
  ['New York','financial hub',-74.0,40.7,'city'],
  ['London','global finance and services city',-0.1,51.5,'city'],
  ['Paris','capital and innovation city',2.35,48.86,'city'],
  ['Singapore','port, finance and services city',103.85,1.29,'city'],
  ['Shanghai','industrial and financial gateway',121.47,31.23,'city'],
  ['Shenzhen','electronics and hardware cluster',114.06,22.54,'city'],
  ['Tokyo','megacity and capital hub',139.7,35.68,'city'],
  ['Seoul','chips, industry and culture hub',127,37.56,'city'],
  ['Dubai','logistics, tourism and services hub',55.27,25.2,'city'],
  ['Riyadh','Vision 2030 command center',46.7,24.7,'city'],
  ['Mumbai','finance, port and film metropolis',72.87,19.07,'city'],
  ['São Paulo','Latin America business engine',-46.63,-23.55,'city'],
  ['Lagos','Africa megacity and business hub',3.38,6.52,'city'],
  ['Nairobi','East African fintech and services hub',36.82,-1.29,'city'],
  ['Mexico City','nearshoring command center',-99.13,19.43,'city'],
  ['Madrid','political and services capital',-3.7,40.42,'city'],
  ['Berlin','industrial-policy and startup capital',13.4,52.52,'city'],
  ['Amsterdam','trade, finance and digital hub',4.9,52.37,'city'],
  ['Istanbul','Eurasian bridge city',28.98,41.01,'city'],
  ['Jakarta','Southeast Asian megacity',106.85,-6.21,'city'],
  ['Bangkok','tourism and manufacturing hub',100.5,13.76,'city'],
  ['Ho Chi Minh City','Vietnam export engine',106.63,10.82,'city'],
  ['Kuala Lumpur','finance and electronics node',101.69,3.14,'city'],
  ['Manila','services and remittance hub',120.98,14.6,'city'],
  ['Dhaka','garment megacity',90.41,23.81,'city'],
  ['Karachi','Pakistan port and finance hub',67.01,24.86,'city'],
  ['Cairo','Arab world megacity',31.24,30.04,'city'],
  ['Cape Town','tourism and port city',18.42,-33.92,'city'],
  ['Casablanca','Morocco business hub',-7.59,33.57,'city'],
  ['Santiago','copper and finance capital',-70.66,-33.45,'city'],
  ['Buenos Aires','macro and culture capital',-58.38,-34.6,'city'],
  ['Bogotá','Andean services hub',-74.07,4.71,'city'],
  ['Doha','gas wealth capital',51.53,25.29,'city'],
  ['Tehran','sanctioned industrial capital',51.39,35.69,'city'],
  ['Warsaw','Central European growth hub',21.01,52.23,'city'],
  ['Vienna','Central European services hub',16.37,48.21,'city'],
  ['Copenhagen','green urban economy',12.57,55.68,'city'],
  ['Helsinki','Nordic tech capital',24.94,60.17,'city'],
  ['Auckland','Pacific services hub',174.76,-36.85,'city'],
  ['Accra','West African services hub',-0.19,5.56,'city'],
  ['Sydney','Pacific services and finance city',151.21,-33.87,'city'],
  ['Miami','Americas finance and logistics hub',-80.19,25.76,'city'],
  ['Rio de Janeiro','Brazil culture, energy and tourism city',-43.17,-22.91,'city'],
  ['Chongqing','Western China inland megacity',106.55,29.56,'city'],
  ['Osaka','Kansai industrial and services hub',135.5,34.69,'city'],
  ['Los Angeles','Pacific media and logistics megacity',-118.24,34.05,'city'],
  ['Moscow','Russian political and financial capital',37.62,55.76,'city'],
  ['Milan','Italian finance, fashion and industry hub',9.19,45.46,'city'],
  ['Tel Aviv','Israeli tech and finance hub',34.78,32.08,'city'],
  ['Jerusalem','political, religious and diplomatic center',35.21,31.77,'city'],
  ['Toronto','Canadian finance and immigration hub',-79.38,43.65,'city']
].map(([name,desc,lon,lat,type])=>({name,desc,lon,lat,type}));

const ports = [
  ['Shanghai Port','world-scale container gateway',121.8,31.2],['Singapore Port','global transshipment hub',103.75,1.25],['Rotterdam','Europe gateway',4.47,51.92],['Los Angeles/Long Beach','Pacific gateway',-118.24,33.74],['Jebel Ali','Gulf logistics hub',55.05,25.01],['Hamburg','German trade port',9.99,53.55],['Busan','Korea export hub',129.04,35.1],['Shenzhen/Yantian','electronics export port',114.27,22.59],['Santos','Brazil agribusiness port',-46.33,-23.96],['Durban','Southern Africa gateway',31.02,-29.87],['Suez/Port Said','canal chokepoint',32.3,31.25],['Panama Canal','inter-oceanic chokepoint',-79.55,9.08],['Mumbai/JNPT','India west gateway',72.94,18.95],['Piraeus','Mediterranean gateway',23.63,37.94],['Antwerp-Bruges','chemical/logistics hub',4.4,51.22],['Hong Kong','Asian container and finance gateway',114.16,22.3],['Ningbo-Zhoushan','Chinese mega-port complex',121.55,29.87],['Qingdao','North China manufacturing port',120.38,36.07],['Tianjin',"Beijing's maritime gateway",117.2,39.08],['Kaohsiung','Taiwan export port',120.3,22.62],['Tanjung Pelepas','Malacca transshipment hub',103.55,1.36],['Port Klang','Malaysia container gateway',101.39,3.0],['Laem Chabang','Thailand industrial port',100.89,13.08],['Ho Chi Minh/Cat Lai','Vietnam export port',106.79,10.76],['Manila Port','Philippines trade gateway',120.96,14.59],['Colombo','Indian Ocean transshipment hub',79.85,6.95],['Mundra','India private mega-port',69.7,22.75],['Chittagong','Bangladesh garment gateway',91.82,22.32],['Alexandria','Egypt Mediterranean gateway',29.91,31.2],['Tanger Med','Morocco Europe-Africa port',-5.5,35.89],['Lagos/Apapa','Nigeria container gateway',3.36,6.45],['Mombasa','East African corridor port',39.67,-4.04],['Tema','Ghana Gulf of Guinea port',0.01,5.64],['Le Havre','French Atlantic gateway',0.11,49.49],['Valencia','Spanish Mediterranean port',-0.32,39.45],['Gioia Tauro','Italy transshipment hub',15.9,38.43],['Algeciras','Strait of Gibraltar gateway',-5.45,36.14],['Felixstowe','UK container gateway',1.32,51.96],['Vancouver','Canadian Pacific gateway',-123.12,49.29],['New York/New Jersey','US Atlantic gateway',-74.05,40.67]
].map(([name,desc,lon,lat])=>({name,desc,lon,lat,type:'port'}));

const cityProfiles = {
  'New York': {tag:'Finance + media command center'},
  'London': {tag:'Global finance and services city'},
  'Paris': {tag:'State, luxury and innovation capital'},
  'Singapore': {tag:'Port-finance city-state'},
  'Shanghai': {tag:'China industrial-financial gateway'},
  'Shenzhen': {tag:'Hardware and electronics cluster'},
  'Tokyo': {tag:'Megacity of capital and technology'},
  'Seoul': {tag:'Chaebol-tech command hub'},
  'Dubai': {tag:'Logistics, tourism and capital hub'},
  'Riyadh': {tag:'Vision 2030 command center'},
  'Mumbai': {tag:'India finance and film metropolis'},
  'São Paulo': {tag:'Latin America business engine'},
  'Lagos': {tag:'Africa megacity and informal powerhouse'},
  'Nairobi': {tag:'East African fintech hub'},
  'Mexico City': {tag:'Nearshoring command center'},
  'Madrid': {tag:'Spanish political and services capital'},
  'Berlin': {tag:'German political and startup capital'},
  'Amsterdam': {tag:'Dutch trade and digital hub'},
  'Istanbul': {tag:'Eurasian bridge city'},
  'Jakarta': {tag:'Indonesian megacity'},
  'Bangkok': {tag:'Tourism and manufacturing hub'},
  'Ho Chi Minh City': {tag:'Vietnam export engine'},
  'Kuala Lumpur': {tag:'Malaysia finance and electronics node'},
  'Manila': {tag:'Services and remittance hub'},
  'Dhaka': {tag:'Garment megacity'},
  'Karachi': {tag:'Pakistan commercial engine'},
  'Cairo': {tag:'Arab world megacity'},
  'Cape Town': {tag:'Tourism and port city'},
  'Casablanca': {tag:'Morocco business hub'},
  'Santiago': {tag:'Copper and finance capital'},
  'Buenos Aires': {tag:'Macro and culture capital'},
  'Bogotá': {tag:'Andean services hub'},
  'Doha': {tag:'Gas wealth capital'},
  'Tehran': {tag:'Sanctioned industrial capital'},
  'Warsaw': {tag:'Central European growth hub'},
  'Vienna': {tag:'Central European services hub'},
  'Copenhagen': {tag:'Green urban economy'},
  'Helsinki': {tag:'Nordic tech capital'},
  'Auckland': {tag:'Pacific services hub'},
  'Accra': {tag:'West African services hub'},
  'Sydney': {tag:'Pacific finance and services hub'},
  'Miami': {tag:'Americas gateway city'},
  'Rio de Janeiro': {tag:'Energy, tourism and culture city'},
  'Chongqing': {tag:'Western China inland megacity'},
  'Osaka': {tag:'Kansai industrial hub'},
  'Los Angeles': {tag:'Media, trade and technology megacity'},
  'Moscow': {tag:'Russian command center'},
  'Milan': {tag:'Finance, fashion and industry hub'},
  'Tel Aviv': {tag:'Startup and cybersecurity hub'},
  'Jerusalem': {tag:'Political and diplomatic center'},
  'Toronto': {tag:'Canadian finance and immigration hub'}
};

const portProfiles = {
  'Shanghai Port': {tag:'World container scale'},
  'Singapore Port': {tag:'Transshipment superhub'},
  'Rotterdam': {tag:'Europe industrial gateway'},
  'Los Angeles/Long Beach': {tag:'US Pacific gateway'},
  'Jebel Ali': {tag:'Gulf logistics platform'},
  'Hamburg': {tag:'Germany maritime door'},
  'Busan': {tag:'Korean export outlet'},
  'Shenzhen/Yantian': {tag:'Electronics export valve'},
  'Santos': {tag:'Brazil agribusiness gateway'},
  'Durban': {tag:'Southern Africa gateway'},
  'Suez/Port Said': {tag:'Canal chokepoint'},
  'Panama Canal': {tag:'Two-ocean shortcut'},
  'Mumbai/JNPT': {tag:'India west-coast gateway'},
  'Piraeus': {tag:'Mediterranean bridge'},
  'Antwerp-Bruges': {tag:'Chemicals and logistics hub'},
  'Hong Kong': {tag:'Asian container and finance gateway'},
  'Ningbo-Zhoushan': {tag:'Chinese mega-port complex'},
  'Qingdao': {tag:'North China manufacturing port'},
  'Tianjin': {tag:'Beijing maritime gateway'},
  'Kaohsiung': {tag:'Taiwan export port'},
  'Tanjung Pelepas': {tag:'Malacca transshipment hub'},
  'Port Klang': {tag:'Malaysia container gateway'},
  'Laem Chabang': {tag:'Thailand industrial port'},
  'Ho Chi Minh/Cat Lai': {tag:'Vietnam export port'},
  'Manila Port': {tag:'Philippines trade gateway'},
  'Colombo': {tag:'Indian Ocean transshipment hub'},
  'Mundra': {tag:'India private mega-port'},
  'Chittagong': {tag:'Bangladesh garment gateway'},
  'Alexandria': {tag:'Egypt Mediterranean gateway'},
  'Tanger Med': {tag:'Morocco Europe-Africa port'},
  'Lagos/Apapa': {tag:'Nigeria container gateway'},
  'Mombasa': {tag:'East African corridor port'},
  'Tema': {tag:'Ghana Gulf of Guinea port'},
  'Le Havre': {tag:'French Atlantic gateway'},
  'Valencia': {tag:'Spanish Mediterranean port'},
  'Gioia Tauro': {tag:'Italy transshipment hub'},
  'Algeciras': {tag:'Strait of Gibraltar gateway'},
  'Felixstowe': {tag:'UK container gateway'},
  'Vancouver': {tag:'Canadian Pacific gateway'},
  'New York/New Jersey': {tag:'US Atlantic gateway'}
};

function generatedEntityProfile(item){
  if(!item) return null;
  if(item.type==='port') return { tag:item.desc || 'Port / chokepoint' };
  return { tag:item.desc || 'City / economic node' };
}
function getEntityProfile(item){
  if(!item) return null;
  if(item.type==='port') return portProfiles[item.name] || generatedEntityProfile(item);
  return cityProfiles[item.name] || generatedEntityProfile(item);
}

const tradeRoutes = [];

const stories = [
  ['pix-brazil','🇧🇷','How Pix changed Brazil','Brazil','Fintech','A free instant payment system rewired an entire economy in months.', [-47.88,-15.8]],
  ['singapore-rich','🇸🇬','Why Singapore became rich','Singapore','Development','From a small vulnerable island to one of the world’s most useful economic hubs.', [103.85,1.29]],
  ['argentina-currency','🇦🇷','Why Argentina keeps facing currency crises','Argentina','Macro','A clear explanation of inflation, dollars, debt and trust in the peso.', [-58.38,-34.6]],
  ['ports-matter','⚓','Why ports matter more than you think','Global','Logistics','The hidden machinery of globalization: ships, ports, containers and chokepoints.', [103.75,1.25]],
  ['taiwan-strait','🇹🇼','Why the Taiwan Strait matters','Taiwan','Geopolitics','A narrow waterway connecting chips, China, the United States and global power.', [121,24]],
].map(([id,icon,title,place,category,description,coords])=>({id,icon,title,place,category,description,coords,coming:false}));

const comingSoon = [];

const didYouKnow = [
  {text:'Singapore has almost no natural resources, yet became one of the richest economies in the world.', story:'singapore-rich'},
  {text:'Brazil’s Pix payment system changed how millions of people use money in only a few years.', story:'pix-brazil'},
  {text:'Taiwan’s chip industry is one of the world economy’s biggest pressure points.', story:'taiwan-strait'},
  {text:'Argentina’s peso crises show why trust is central to a currency.', story:'argentina-currency'},
  {text:'Ports are the hidden machinery of globalization, connecting ships, containers and everyday prices.', story:'ports-matter'}
];
let factIndex = Math.floor(Math.random()*didYouKnow.length);

const dailyBrief = [
  {
    "cat": "Energy",
    "place": "Strait of Hormuz",
    "title": "Hormuz remains the pressure point for oil prices",
    "h": "Oil markets moved after several tankers carrying Gulf crude were able to pass through the Strait of Hormuz, including China-bound vessels. That matters because Hormuz is one of the world’s most important energy chokepoints: when ships cannot pass normally, oil and gas buyers worry about shortages, higher freight costs and higher insurance costs.",
    "m": "For a beginner, the key idea is simple: a large share of globally traded oil moves through a very narrow maritime route. If that route becomes unsafe or politically controlled, the price of energy can rise even for countries far away from the Gulf. Higher oil prices can then feed into transport costs, electricity costs, food prices and inflation.",
    "w": "Watch whether tanker traffic returns to normal, whether Iran keeps using inspections or fees to control passage, whether Gulf exporters accelerate routes that bypass Hormuz, and whether oil prices fall because supply risk is easing or rise again because the route remains fragile.",
    "links": [
      {
        "label": "Reuters — Iran consolidating control of Hormuz",
        "url": "https://www.reuters.com/investigations/iran-is-consolidating-control-hormuz-with-island-checkpoints-diplomatic-deals-2026-05-20/"
      },
      {
        "label": "Reuters — Tankers exit Hormuz as diplomacy resumes",
        "url": "https://www.reuters.com/world/asia-pacific/tankers-exit-hormuz-trump-vance-talk-up-iran-deal-prospects-2026-05-20/"
      }
    ]
  },
  {
    "cat": "Trade",
    "place": "UK / Gulf",
    "title": "The UK-Gulf trade deal shows how trade follows geopolitics",
    "h": "The United Kingdom reached a long-term trade agreement with the Gulf Cooperation Council, covering Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates. The deal is expected to remove most GCC tariffs on British goods over time and improve access for services such as finance, digital trade and business activity.",
    "m": "This is not only a tariff story. The Gulf is trying to diversify beyond oil, while Britain is searching for stronger post-Brexit trade links. For readers, the important mechanism is that trade agreements can redirect investment, lower import costs for some goods, and deepen political ties between countries that already matter for energy and finance.",
    "w": "Watch which sectors actually benefit, especially autos, aerospace, food, finance and digital services. Also watch criticism around human-rights clauses and investor protections, because modern trade deals are not only about selling more goods; they also decide what rules companies and governments must follow.",
    "links": [
      {
        "label": "Reuters — Britain clinches Gulf trade deal",
        "url": "https://www.reuters.com/world/uk/britain-clinches-5-billion-gulf-trade-deal-shadow-iran-war-2026-05-20/"
      },
      {
        "label": "The Guardian — UK strikes trade deal with six Gulf states",
        "url": "https://www.theguardian.com/business/2026/may/20/uk-trade-deal-six-gulf-states-keir-starmer"
      }
    ]
  },
  {
    "cat": "Logistics",
    "place": "Panama",
    "title": "Panama Canal water risk is becoming a trade issue",
    "h": "The Panama Canal Authority said it was not planning vessel-passage restrictions for the rest of 2026, even with possible drought risks later in the year. The point is important because the canal depends on freshwater to move ships through its lock system, so drought can become a shipping problem.",
    "m": "The Panama Canal is a shortcut between the Atlantic and Pacific Oceans. If water levels fall, the canal may reduce daily crossings or limit how much cargo ships can carry. That can raise costs for companies and delay goods. This shows why climate risk is now part of trade infrastructure: a canal is not just concrete and locks, it is also rainfall, reservoirs and water management.",
    "w": "Watch rainfall, Gatun Lake levels, El Niño risk, canal transit limits and shipping-company behavior. If companies start rerouting because they fear future restrictions, even a canal that remains open can still influence prices and delivery times.",
    "links": [
      {
        "label": "Reuters — Panama Canal not planning 2026 curbs despite drought threat",
        "url": "https://www.internazionale.it/ultime-notizie-reuters/2026/05/15/panama-canal-not-planning-to-curb-ships-passage-for-2026-despite-drought-threat"
      },
      {
        "label": "Panama Canal Authority — Annual reports",
        "url": "https://pancanal.com/en/annual-reports/"
      }
    ]
  },
  {
    "cat": "Debt",
    "place": "Nigeria / Africa",
    "title": "Debt payments are crowding out development spending",
    "h": "Nigeria’s president called for an overhaul of global finance, saying the country is expected to spend about $11.6 billion servicing debt in 2026, close to half of projected government revenue. Debt service means the money paid to lenders in interest and repayments.",
    "m": "Debt is not automatically bad: governments borrow to build roads, hospitals, schools and energy systems. The problem begins when repayment costs become so large that they crowd out spending on development. For African economies, high borrowing costs can mean less money for infrastructure, healthcare, education and climate adaptation, even when those investments are exactly what long-term growth requires.",
    "w": "Watch whether Nigeria’s tax reforms raise enough revenue, whether global lenders offer cheaper financing, and whether more developing countries demand debt relief or changes to the international financial system. The deeper issue is whether countries can still invest in the future after paying creditors.",
    "links": [
      {
        "label": "Reuters / Polity — Tinubu urges finance overhaul as debt costs crowd out spending",
        "url": "https://www.polity.org.za/article/nigerias-tinubu-urges-global-finance-overhaul-as-debt-costs-crowd-out-spending-2026-05-13"
      },
      {
        "label": "UNCTAD — A World of Debt",
        "url": "https://unctad.org/publication/world-of-debt"
      }
    ]
  },
  {
    "cat": "Technology",
    "place": "Global",
    "title": "Nvidia earnings test the AI infrastructure boom",
    "h": "Investors watched Nvidia’s results for signs that demand for AI chips remains strong. Nvidia matters because its chips are central to the data centers that train and run many AI systems, so its sales give a signal about how fast AI infrastructure is expanding.",
    "m": "AI may look like software, but it depends on physical infrastructure: chips, servers, electricity, cooling, data centers and supply chains. If demand for Nvidia chips keeps rising, it suggests companies are still spending heavily to build AI capacity. That can boost technology markets, but it also increases pressure on power grids, semiconductor supply chains and the countries that control advanced chip manufacturing.",
    "w": "Watch Nvidia’s margins, order backlog, China restrictions, data-center spending and whether companies can turn AI investment into real productivity gains. The risk is that AI infrastructure grows faster than electricity grids, regulation and business models can adapt.",
    "links": [
      {
        "label": "Reuters — Nvidia earnings and AI chip demand",
        "url": "https://www.reuters.com/world/us/nvidia-earnings-report-live-ai-chipmaker-expected-post-jump-revenue-2026-05-20/"
      },
      {
        "label": "Reuters — Nvidia outlook tests AI dominance",
        "url": "https://www.reuters.com/world/china/nvidias-outlook-will-be-test-its-strategy-maintain-ai-dominance-2026-05-19/"
      }
    ]
  }
];

const modules = [
  ['📈','Inflation','Why prices rise — and why it matters.'],['🚢','Trade','How countries exchange goods, services, and IOUs.'],['💱','Currency','What gives money its value.'],['🏦','Debt','Why governments borrow — and when it becomes dangerous.'],['⚡','Energy','The hidden input behind every economy.'],['🏗️','Development',"How poor countries become rich — or don't."],['🌍','Geography','Why location still shapes power.'],['🧩','Institutions','The rules behind prosperity.'],['💾','Technology','How innovation changes national power.'],['🛡️','Sanctions','How finance becomes a weapon.']
].map(([icon,title,desc],i)=>({icon,title,desc,num:String(i+1).padStart(2,'0')}));

const storySteps = {};
const globeStoryIds = [];

function estimateMinutes(text, layer, storyId=''){
  return (v14StoryTimes[storyId] && v14StoryTimes[storyId][layer]) || '2 min';
}

const mexicoNearshoringLayers = {
  quick: `Mexico is becoming one of the clearest winners of the global shift toward nearshoring: the relocation of factories and supply chains closer to final markets.

For companies selling to the United States, Mexico offers a rare combination: lower production costs than the U.S., direct border access, deep manufacturing experience, and privileged trade access through the USMCA, the trade agreement linking Mexico, the United States, and Canada. This makes Mexico especially attractive for industries like cars, electronics, machinery, appliances, medical devices, aerospace, logistics, and industrial real estate.

But the boom is not automatic. Mexico’s opportunity depends on whether it can solve its internal bottlenecks: electricity shortages, water stress, transport congestion, insecurity, weak rule of law, and uncertainty around U.S. trade policy. Nearshoring could help Mexico boost productivity, integrate smaller firms into value chains, and create better jobs, but only if the country improves logistics, digital connectivity, competition, regulation, and climate resilience.

Bottom line: Mexico is not just receiving factories. It is being tested as the future industrial backbone of North America.`,
  medium: `01 — The old globalization model
For decades, globalization had a simple logic: produce where it is cheapest, even if that means building complex supply chains across oceans. China became the central factory of the world, and companies accepted long shipping routes because the cost advantages were enormous.

That model is now changing. The pandemic exposed how fragile global supply chains could be. Shipping delays, port congestion, factory shutdowns, trade wars, and geopolitical tensions made companies rethink the risks of depending too heavily on distant production. At the same time, tensions between the United States and China pushed firms to search for alternatives that were closer, safer, and easier to control.

02 — Why Mexico benefits
Nearshoring means moving production closer to the final consumer market. For U.S. companies, Mexico is almost perfectly positioned. It shares a long border with the United States, has established industrial zones, and is already deeply integrated into North American trade. Under the USMCA, goods that meet regional-content rules can move across the North American market with preferential treatment, making Mexico more attractive than many Asian manufacturing hubs.

The result is a wave of interest in Mexican manufacturing. Northern and central states such as Nuevo León, Coahuila, Chihuahua, Baja California, Querétaro, Guanajuato, and San Luis Potosí have become especially important. These regions already have factories, suppliers, roads, rail links, industrial parks, and workers trained in advanced manufacturing. Monterrey, one of Mexico’s main industrial cities, has become a symbol of this shift.

03 — The sectors behind the boom
The sectors benefiting from nearshoring are not random. They are the sectors where proximity to the U.S. market matters most: automotive production, electric vehicles, batteries, electronics, aerospace components, medical devices, industrial machinery, logistics, and data-related infrastructure. Mexico is not just trying to attract low-value assembly. Its real opportunity is to move deeper into advanced manufacturing.

But there is a paradox. Mexico is benefiting from nearshoring, yet its overall economic growth remains limited. This shows the difference between a nearshoring boom and a full economic transformation. More factories do not automatically mean stronger national development.

04 — The domestic test
To turn nearshoring into a long-term success, Mexico needs reliable electricity, enough water for industrial parks, faster customs procedures, safer transport corridors, better infrastructure, and stronger legal certainty.

Electricity is one of the biggest issues. Modern factories need stable and affordable power. Water is another constraint, especially in northern states that are attractive to investors but already face water stress. Security also matters: if trucks, workers, or industrial parks are exposed to organized crime, companies become more cautious. And legal uncertainty can delay investment, especially when firms fear sudden regulatory changes or unpredictable tax enforcement.

05 — The larger meaning
This is why Mexico’s boom is both real and fragile. The country has the geography, trade access, and manufacturing experience to become a central industrial hub of North America. But the next phase depends less on attracting attention and more on execution.

Can Mexico build enough infrastructure? Can it provide clean and reliable energy? Can it include smaller Mexican firms in global value chains? Can it spread the benefits beyond a few wealthy industrial regions?

If it succeeds, nearshoring could become one of the most important development opportunities in modern Mexican history. If it fails, Mexico may gain factories without solving its deeper productivity, inequality, and infrastructure problems.

Bottom line: Mexico’s nearshoring boom is a race between global opportunity and domestic capacity.`,
  deep: `01 — The global reorganization behind the boom
Mexico’s nearshoring boom is one of the most important economic shifts in the Americas because it sits at the intersection of three major global transformations: the reorganization of supply chains, the rivalry between the United States and China, and the search for more resilient regional production networks.

For much of the late 20th and early 21st century, globalization was built around efficiency. Companies tried to minimize production costs, even if that meant producing goods thousands of kilometers away from final consumers. China became the dominant manufacturing hub because it offered scale, infrastructure, cheap labor, supplier networks, and strong export capacity.

But that system had a weakness: it was efficient in normal times, yet fragile in crisis. The COVID-19 pandemic revealed this fragility. A factory shutdown in one country could delay production across the world. A port bottleneck could slow the delivery of thousands of containers. A shortage of semiconductors could paralyze car production in North America and Europe. Companies realized that the cheapest supply chain was not always the safest one.

Then geopolitics reinforced the shift. Trade tensions between Washington and Beijing made dependence on China more risky. Tariffs, export controls, technology restrictions, and security concerns encouraged firms to diversify production. This gave rise to nearshoring, friendshoring, and regionalization. Mexico benefits from all three.

02 — Why Mexico is so attractive
For the United States, Mexico is geographically close, commercially integrated, and industrially experienced. It is not a distant supplier across the Pacific. It is a neighboring economy connected by trucks, trains, pipelines, border crossings, industrial parks, and decades of manufacturing integration.

Mexico has four major strengths in the nearshoring race. The first is geography. A product made in northern Mexico can reach the United States much faster than a product shipped from East Asia. This reduces transport times, lowers inventory risks, and gives companies more flexibility. In industries where timing matters, proximity becomes a competitive advantage.

The second is trade access. Mexico is part of the USMCA, alongside the United States and Canada. This gives Mexico privileged access to the North American market, provided goods comply with rules of origin. For firms trying to avoid tariff uncertainty and reduce exposure to China, producing inside the USMCA zone can be highly attractive.

The third is industrial depth. Mexico is not starting from zero. It already has strong manufacturing clusters in cars, auto parts, aerospace, electronics, appliances, machinery, and medical devices. This matters because companies do not only need land and workers. They need suppliers, technicians, logistics providers, customs brokers, engineers, warehouses, and industrial services.

The fourth is labor and cost competitiveness. Mexico offers lower labor costs than the United States while being much closer than Asia. For many firms, this makes Mexico a compromise between cost efficiency and supply-chain resilience.

03 — The industrial geography of the boom
The nearshoring boom is not evenly spread across Mexico. Northern Mexico benefits the most because it is closest to the U.S. market. States like Nuevo León, Coahuila, Chihuahua, Baja California, Sonora, and Tamaulipas are central to cross-border manufacturing. They are connected to U.S. supply chains and have long experience in export-oriented production.

Nuevo León is especially important. Its capital, Monterrey, is one of Latin America’s strongest industrial cities. It has infrastructure, universities, suppliers, business networks, and proximity to Texas. This explains why many investors see it as a natural nearshoring hub.

Central states also matter. Querétaro, Guanajuato, San Luis Potosí, Aguascalientes, and the State of Mexico have strong manufacturing ecosystems, especially in automotive and aerospace industries. Querétaro, for example, has become known for aerospace and high-value manufacturing.

But this geography creates a major challenge. If nearshoring mainly benefits northern and central industrial zones, it could deepen regional inequality. Southern Mexico may remain disconnected from the boom unless infrastructure, education, and industrial policy are used to spread investment more widely.

04 — From assembly to upgrading
The most basic version of nearshoring would make Mexico an assembly platform. Companies would import parts, assemble them in Mexico, and export the final goods to the United States. That would create jobs and exports, but the long-term impact would be limited if Mexico remained dependent on foreign technology, foreign suppliers, and low-value manufacturing tasks.

The more ambitious version is different. In this stronger scenario, Mexico uses nearshoring to upgrade its economy. That means building deeper domestic supplier networks, training more engineers and technicians, improving logistics, investing in clean energy, and helping Mexican firms enter global value chains.

This point is crucial. Nearshoring is not only about foreign companies arriving. It is about whether Mexican firms can participate in the production networks that arrive with them. If local suppliers provide parts, services, software, packaging, transport, maintenance, engineering, and logistics, then the benefits multiply. If not, Mexico risks becoming a place where foreign companies operate without deeply transforming the domestic economy.

The difference is productivity. Mexico has long struggled with weak productivity growth. Many workers remain in informal or low-productivity activities. Nearshoring could help change this if it expands formal employment, raises technical skills, and spreads advanced manufacturing practices. But that requires policy coordination, education, infrastructure, and business development.

05 — Infrastructure is the bottleneck
Factories do not operate in isolation. They need electricity, water, roads, railways, ports, customs systems, digital networks, and safe transport corridors. This is where Mexico’s nearshoring boom becomes more fragile.

Electricity is one of the main constraints. Modern manufacturing requires stable power, especially in sectors such as electronics, electric vehicles, medical devices, and data infrastructure. If industrial zones cannot guarantee reliable electricity, investment slows or moves elsewhere.

Water is another major issue. Many of the regions most attractive to nearshoring are also regions facing water stress. Northern Mexico, especially, must balance industrial expansion with urban demand, agriculture, and climate pressure. This could become a serious long-term constraint.

Transport infrastructure is also decisive. Nearshoring increases pressure on highways, railways, border crossings, ports, and customs systems. If trucks spend too long at the border, proximity loses some of its value. If ports and roads are congested, companies cannot fully benefit from Mexico’s geography.

Digital connectivity matters too. Advanced manufacturing increasingly depends on data, automation, sensors, cloud systems, and real-time supply-chain coordination. Mexico’s challenge is not only to attract factories. It must build the systems that allow factories to operate efficiently.

06 — Political and trade-policy risk
Nearshoring depends on confidence. A company that builds a factory is not making a short-term decision. It is committing capital for years. It needs predictable taxes, stable regulation, reliable contracts, secure property rights, and confidence in the courts.

This is why rule of law matters so much. If investors fear arbitrary enforcement, corruption, insecurity, or sudden policy reversals, they may delay or reduce investment. This does not mean companies will leave Mexico. The country’s advantages are too strong. But it does mean that Mexico may receive less investment than it could have received under clearer and more predictable conditions.

The USMCA review cycle is another major uncertainty. Mexico’s nearshoring boom is strongly linked to access to the U.S. market. If U.S. trade policy becomes more protectionist, or if rules of origin become stricter, some companies could rethink their plans.

This is the paradox of Mexico’s position. Its closeness to the United States is its greatest advantage. But dependence on the U.S. market also exposes Mexico to U.S. political cycles, tariff threats, and trade negotiations.

07 — Why the boom has not automatically produced spectacular growth
One of the most interesting parts of Mexico’s nearshoring story is that the boom has not automatically produced spectacular GDP growth. Foreign investment and manufacturing interest are rising, but national growth remains constrained by infrastructure, informality, regional inequality, weak productivity, and policy uncertainty.

This matters because it shows that nearshoring is not magic. A country can attract investment and still struggle with low productivity, informal employment, regional inequality, weak infrastructure, and policy uncertainty. Nearshoring creates an opening, not a guarantee.

The real question is whether Mexico can convert investment into broader development. That means moving from more exports to better capabilities. It means not only producing more cars or electronics, but also increasing local technological content, improving worker training, strengthening domestic suppliers, and building infrastructure that benefits the whole economy.

08 — The North American angle
Nearshoring is also reshaping North America itself. For the United States, Mexico offers a way to reduce dependence on China without bringing all production back home. Full reshoring to the U.S. can be expensive and difficult because of higher labor costs and capacity constraints. Mexico provides a middle path: production remains close to the U.S. market but at lower cost.

For Mexico, this creates leverage. The country becomes more important to U.S. supply-chain security, especially in strategic sectors such as cars, batteries, electronics, machinery, medical devices, and possibly energy-related manufacturing.

For Canada, the USMCA framework means North American production can become more integrated as a regional bloc. The result is not the end of globalization, but a more regional form of globalization.

09 — The environmental challenge
Nearshoring also has a climate dimension. On one hand, producing closer to the U.S. market can reduce some transport-related emissions. Shorter supply chains may be less carbon-intensive than shipping goods across oceans.

On the other hand, industrial expansion increases demand for electricity, water, land, and transport. If Mexico powers new factories with fossil fuels or expands industrial parks without sustainable planning, the environmental costs could rise.

This is why clean energy matters. Many multinational companies have their own climate targets. They increasingly want renewable electricity for their factories. If Mexico cannot provide enough clean and reliable energy, it may lose some investment to countries with greener industrial systems.

10 — The possible futures
Mexico’s nearshoring boom could lead to three different futures. The first is the limited boom scenario. Mexico attracts factories, exports rise, and industrial real estate expands, but the benefits remain concentrated in a few regions. Local suppliers remain weak, productivity improves only slightly, and infrastructure bottlenecks limit the impact.

The second is the fragile boom scenario. Mexico attracts attention, but investment is slowed by electricity shortages, water stress, insecurity, legal uncertainty, and U.S. trade tensions. Companies still use Mexico, but the country fails to capture the full opportunity.

The third is the development breakthrough scenario. Mexico uses nearshoring to upgrade infrastructure, expand clean energy, train skilled workers, integrate small and medium-sized firms, strengthen rule of law, and move into higher-value manufacturing. In this version, nearshoring becomes not just a trade story but a national development strategy.

Mexico already has the geography. It already has the trade agreement. It already has the industrial base. What it needs now is the domestic capacity to turn a global opening into long-term economic transformation.

Bottom line: Mexico’s nearshoring boom is not simply about companies leaving China. It is about whether Mexico can turn a geopolitical advantage into a deeper industrial future.`
};


const customStoryProfiles = {};



const WORLDPULSE_STORY_FORMAT_RULES = `
All current and future WorldPulse stories must follow this finalized detailed format:
- No Story Globe Mode.
- Start with To go further, then the exact AI/human-reviewed note.
- Use specific estimated reading times only. No ranges.
- Quick Insight: clear, accessible and substantial; not a one-line teaser.
- Medium Story: the main explainer version; numbered sections with developed 2-paragraph explanations that cover what happens, why it matters, the mechanism, and one example/consequence.
- Deep Dive: expanded analytical version with longer numbered sections, cause-and-effect reasoning, risks, institutions, data context, and long-term implications.
- Repeat a clear Key takeaway after every layer.
`;
const independentStoryLayers = {};



// Version 1.4 final story override: only five stories.
categories.length = 0;
categories.push('All','Development','Macro','Geopolitics','Logistics','Fintech');
stories.length = 0;
stories.push(...[{"id": "pix-brazil", "icon": "🇧🇷", "title": "How Pix changed Brazil", "place": "Brazil", "category": "Fintech", "description": "Brazil’s instant payment system became public digital infrastructure for everyday money.", "coords": [-47.88, -15.8]}, {"id": "singapore-rich", "icon": "🇸🇬", "title": "Why Singapore became rich", "place": "Singapore", "category": "Development", "description": "How a small island with few resources became one of the world’s most useful hubs.", "coords": [103.85, 1.29]}, {"id": "argentina-currency", "icon": "🇦🇷", "title": "Why Argentina keeps facing currency crises", "place": "Argentina", "category": "Macro", "description": "Why inflation, dollars, debt and trust keep pulling Argentina back into crisis.", "coords": [-58.38, -34.6]}, {"id": "ports-matter", "icon": "⚓", "title": "Why ports matter more than you think", "place": "Global", "category": "Logistics", "description": "Ports are the hidden machinery that makes globalization physical.", "coords": [103.75, 1.25]}, {"id": "taiwan-strait", "icon": "🇹🇼", "title": "Why the Taiwan Strait matters", "place": "Taiwan", "category": "Geopolitics", "description": "A narrow body of water links chips, China, the United States and global power.", "coords": [121, 24]}]);
comingSoon.length = 0;
const v14StoryTimes = {"pix-brazil": {"quick": "2 min", "medium": "7 min", "deep": "13 min"}, "singapore-rich": {"quick": "2 min", "medium": "7 min", "deep": "12 min"}, "argentina-currency": {"quick": "2 min", "medium": "8 min", "deep": "14 min"}, "ports-matter": {"quick": "2 min", "medium": "7 min", "deep": "12 min"}, "taiwan-strait": {"quick": "2 min", "medium": "8 min", "deep": "14 min"}};
const v14StorySources = {"pix-brazil": {"sources": ["Central Bank of Brazil — Pix official page: https://www.bcb.gov.br/en/financialstability/pix_en", "Central Bank of Brazil — Pix statistics: https://www.bcb.gov.br/en/financialstability/pixstatistics", "Payments and Commerce Market Intelligence — Pix usage statistics: https://paymentscmi.com/insights/pix-in-brazil-latest-statistics-central-bank/"], "note": "Note: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way."}, "singapore-rich": {"sources": ["Singapore Maritime and Port Authority — 2024 port statistics: https://www.mpa.gov.sg/media-centre/details/strong-growth-momentum-for-maritime-singapore", "World Bank — Singapore GDP per capita data: https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=SG", "Monetary Authority of Singapore — Economic history of Singapore: https://www.mas.gov.sg/news/speeches/2015/an-economic-history-of-singapore"], "note": "Note: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way."}, "argentina-currency": {"sources": ["IMF — Argentina country page: https://www.imf.org/en/Countries/ARG", "IMF — 2025 Argentina Extended Fund Facility announcement: https://www.imf.org/en/news/articles/2025/04/12/pr25101-argentina-imf-executive-board-approves-48-month-usd20-billion-extended-arrangement", "World Bank — Argentina data: https://data.worldbank.org/country/argentina"], "note": "Note: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way."}, "ports-matter": {"sources": ["UNCTAD — Review of Maritime Transport 2024: https://unctad.org/publication/review-maritime-transport-2024", "Singapore Maritime and Port Authority — 2024 port statistics: https://www.mpa.gov.sg/media-centre/details/strong-growth-momentum-for-maritime-singapore", "Port of Rotterdam — official facts and figures: https://www.portofrotterdam.com/en/experience-online/facts-and-figures"], "note": "Note: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way."}, "taiwan-strait": {"sources": ["TSMC — Annual reports: https://investor.tsmc.com/english/annual-reports", "CSIS — Taiwan and U.S. economic security: https://www.csis.org/analysis/silicon-island-assessing-taiwans-importance-us-economic-growth-and-security", "Asia Pacific Foundation — Taiwan and the global semiconductor race: https://www.asiapacific.ca/publication/taiwan-canada-and-global-semiconductor-race"], "note": "Note: This story was generated with AI — model: GPT-5.5 Thinking — and reviewed by humans. It is designed to explain complex economic and geopolitical topics in a simple, accessible way."}};
Object.keys(independentStoryLayers).forEach(k => delete independentStoryLayers[k]);
Object.assign(independentStoryLayers, {"pix-brazil": {"quick": "Pix is Brazil’s instant payment system. It lets people send and receive money in seconds, using a phone.\n\nA person can pay with a QR code, a phone number, an email, or a special Pix key. The money arrives almost immediately, even at night, on weekends, and during holidays.\n\nThat may sound like a small convenience, but it changed everyday life in Brazil.\n\nBefore Pix, paying someone could be more complicated. Cash was common, but it could be unsafe. Card payments were useful, but small businesses often had to pay fees or use card machines. Bank transfers existed, but they could be slower or less practical for everyday use.\n\nPix made payment feel simple.\n\nA street vendor can show a QR code. A customer scans it. The money arrives in seconds. A parent can send money to a child immediately. A small business can receive payments without waiting. Friends can split a bill instantly.\n\nPix was launched by the Central Bank of Brazil in November 2020. That matters because it was not just a private app created by one company. It was public digital infrastructure: a basic system that banks, businesses, and people could all use.\n\nBy 2025, Pix had become one of the most used payment systems in Brazil, with well over 100 million individual users. In a country of about 200 million people, that means Pix became part of normal economic life.\n\nBut Pix also has risks. If money moves instantly, scams can happen instantly too. So fast digital money needs strong protection.\n\nKey takeaway: Pix shows how one simple public payment system can change daily life, help small businesses, and modernize the way money moves through an economy.", "medium": "01 — Why payments matter\nPayments may seem ordinary, but they are one of the most important parts of an economy.\n\nEvery day, people need to pay and be paid. A shop sells food. A worker receives wages. A family sends money to a relative. A company pays suppliers. A customer pays a bill.\n\nIf payments are slow, expensive, or complicated, the whole economy becomes less efficient.\n\nThink of an economy like a city. Roads help people and goods move. If roads are blocked, everything slows down. A payment system is like a road for money. If money cannot move easily, people and businesses struggle.\n\nBefore Pix, Brazil already had banks, cards, and digital transfers. But many payments still had problems. Cash was simple, but risky. Card payments could involve fees. Bank transfers were not always instant or convenient.\n\nFor small businesses and informal workers, these problems mattered a lot.\n\n02 — Brazil before Pix\nBrazil was not starting from zero. It had a modern financial system, large banks, and digital banking services.\n\nBut the system did not work equally well for everyone.\n\nA large supermarket could easily use card machines, banking services, and payment processors. A small food seller, a barber, a taxi driver, or an informal worker faced more difficulty.\n\nCash was easy, but it could be stolen or lost. It was also hard to use online. Card machines helped, but they often came with fees. Traditional transfers could require more information and could be less convenient.\n\nThese problems are called friction.\n\nFriction means small obstacles that make daily life harder: waiting time, fees, paperwork, complicated steps, or uncertainty.\n\nPix reduced this friction.\n\n03 — What Pix changed\nPix made digital payment instant and simple.\n\nA customer can scan a QR code. A person can send money using a phone number, an email, or a Pix key. The recipient receives the money almost immediately.\n\nThis changed behavior because it solved a daily problem.\n\nPix was useful for rich people, poor people, small businesses, families, students, street vendors, restaurants, online sellers, and informal workers.\n\nIt also works outside normal banking hours. This is important because economic life does not stop on Friday afternoon. People buy things at night. Businesses operate on weekends. Families need emergency money on Sundays.\n\nPix made instant payment normal.\n\n04 — Why the Central Bank matters\nPix was created by Brazil’s central bank.\n\nThis is one of the most important parts of the story.\n\nWhen people think about financial innovation, they often imagine private companies: banks, fintech startups, card networks, or payment apps. Pix shows another model.\n\nThe state created the basic payment infrastructure. Banks and financial institutions connected to it. People and businesses used it.\n\nThis is similar to a public road. A road does not sell goods by itself, but it lets shops, workers, families, and companies move. Pix is like a road for money.\n\nThis changed competition in finance.\n\nIf basic payments are instant and cheap, banks and payment companies cannot rely only on controlling transfers. They have to compete through better services: credit, savings, investment tools, business accounts, insurance, customer service, and fraud protection.\n\n05 — Small businesses and informal workers\nPix helped small businesses because it made receiving money easier.\n\nImagine a person selling food on the street. If the customer has no cash, the seller may lose a sale. If the seller uses a card machine, fees may reduce profit. If payment takes too long to arrive, the seller may have cash-flow problems.\n\nWith Pix, the seller can accept digital payment quickly.\n\nThis matters in Brazil because informal work is important. Many people earn money outside large companies or traditional contracts. Pix gives them a simple way to receive digital money.\n\nIt does not automatically make every business formal. It does not automatically solve poverty. But it creates a bridge into digital economic life.\n\nA small seller who receives Pix payments may start to build a transaction history. That can help with accounting, planning, and possibly access to credit later.\n\n06 — Financial inclusion\nFinancial inclusion means that more people can use useful financial services.\n\nIt does not only mean having a bank account. It means being able to pay, receive, save, borrow, insure, and manage money in a practical way.\n\nPix helped because payments are often the first step.\n\nA person may start by receiving Pix transfers. Later, they may use a digital bank account more actively. A small business may start tracking income. A worker may receive wages more easily. Families can transfer money during emergencies.\n\nPix did not erase inequality in Brazil. But it removed one important barrier: difficult payment.\n\n07 — The risks of instant money\nPix also created new problems.\n\nThe main risk is fraud. If money moves instantly, criminals can also move quickly.\n\nScammers may pretend to be a bank, a family member, a delivery company, a shop, or a government office. They may pressure someone into sending money quickly.\n\nOnce the money is sent, it can be hard to recover.\n\nThis shows a simple lesson: faster finance needs stronger protection.\n\nBrazil has had to improve security rules, fraud monitoring, transaction limits, and user education.\n\nA payment system should not only be fast. It must also be safe and trusted.\n\n08 — Why Pix matters beyond Brazil\nPix became a global example because it shows that public digital infrastructure can transform daily life.\n\nIt also shows that innovation does not only come from Silicon Valley, banks, or private startups. It can come from a central bank in an emerging economy.\n\nPix changed how people pay. It helped small businesses. It increased competition. It made digital money part of ordinary life.\n\nThat is why Pix is not only a Brazilian story. It is a story about how public technology can modernize an economy.\n\nKey takeaway: Pix shows how one simple public payment system can change daily life, help small businesses, and modernize the way money moves through an economy.", "deep": "01 — Money needs infrastructure\nWhen people think about infrastructure, they usually imagine roads, bridges, ports, airports, railways, electricity grids, or internet cables.\n\nBut money also needs infrastructure.\n\nEvery time someone buys food, receives wages, sends money to family, pays rent, or runs a business, a payment system is working behind the scenes.\n\nIf this system is slow or expensive, the whole economy becomes less efficient.\n\nA shop may lose customers. A worker may wait for payment. A family may struggle to send emergency money. A business may have difficulty managing cash flow.\n\nPix matters because it improved this hidden infrastructure.\n\nIt made the movement of money faster, simpler, and cheaper for millions of Brazilians.\n\n02 — The old payment problem\nBefore Pix, Brazil had financial services, but they were not equally easy for everyone.\n\nLarge companies could manage card payments, bank systems, and financial tools. Smaller businesses often faced higher relative costs.\n\nCash was simple, but risky. It could be stolen, lost, or difficult to manage. It was also limited for online commerce.\n\nCards were useful, but they involved machines and fees. For a large chain, those fees may be manageable. For a street vendor or micro-entrepreneur, even a small fee can matter.\n\nBank transfers existed, but they could be inconvenient for everyday transactions.\n\nSo Brazil’s payment problem was not only technical. It was also social and economic.\n\nThe people who most needed simple tools often had the least efficient options.\n\n03 — Pix as a public payment rail\nPix created a new payment rail.\n\nA payment rail is the system that money travels on, just like trains travel on railway tracks.\n\nPix was not just one app. It became a shared system that many banks and financial institutions could use.\n\nThis is what made it powerful.\n\nIf one private company creates a payment app, users may be stuck inside that company’s ecosystem. But if a central bank creates common infrastructure, many institutions can connect.\n\nThat makes the system feel universal.\n\nA person with one bank can send money to someone using another bank or financial institution. Businesses can accept payments from many users. The system becomes part of the national economy.\n\n04 — Why adoption was so fast\nPix spread quickly because it was useful immediately.\n\nSome innovations require people to change habits for unclear benefits. Pix did the opposite. It made an existing habit easier: paying.\n\nA buyer understood it quickly. A seller understood it quickly. Banks had to support it. QR codes made it visible in shops, restaurants, markets, and street stalls.\n\nThen the network effect took over.\n\nA network effect means something becomes more useful as more people use it. A phone is not very useful if nobody else has one. A payment system is not very useful if few shops accept it.\n\nOnce many shops accepted Pix, more customers wanted to use it. Once many customers used Pix, more shops had to accept it.\n\nThis is how a technology becomes part of daily life.\n\n05 — Pix and small-business productivity\nFor small businesses, payment delays can be painful.\n\nImagine a small shop with limited cash. It must pay suppliers, buy stock, and manage daily expenses. If payment takes time to arrive, the business may struggle.\n\nPix helps cash flow because money arrives quickly.\n\nThis can make a business more flexible. The owner can pay suppliers faster. They can track revenue more clearly. They can accept digital payment without relying only on cards.\n\nThis is why payments matter for productivity.\n\nProductivity does not only mean machines or factories. It also means reducing wasted time, lowering costs, and making ordinary transactions easier.\n\nPix is a productivity improvement at the level of daily life.\n\n06 — Pix and the informal economy\nBrazil has a large informal economy.\n\nThe informal economy includes work and business activity that happens outside full formal contracts, taxation, or official business structures.\n\nInformality can exist for many reasons: poverty, bureaucracy, lack of access, unemployment, low trust in institutions, or survival strategies.\n\nPix affects this world in a complicated way.\n\nOn one hand, it helps informal workers receive payments more easily. A person selling food, repairing phones, driving informally, or offering services can receive digital payment without needing a complex business structure.\n\nOn the other hand, digital payments create records. This can make economic activity more visible to banks, platforms, and the state.\n\nThat can help people access credit or formalize their activity. But it can also create fear about taxation or surveillance.\n\nSo Pix is both an inclusion tool and a visibility tool.\n\n07 — Financial inclusion and access\nPix is often described as a financial inclusion tool.\n\nThis is true, but it must be explained carefully.\n\nPix does not automatically create income. It does not automatically give everyone credit. It does not automatically eliminate poverty.\n\nBut it lowers a basic barrier.\n\nIt makes it easier to use digital money.\n\nFor someone outside traditional financial habits, payments are often the first step. Once a person receives digital payments, they may use more banking services. Once a small business records payments, it may manage finances better.\n\nPix therefore supports inclusion by making the first step easier.\n\n08 — Pix and competition in finance\nPix also changed the balance of power in Brazilian finance.\n\nBefore public instant payment systems, banks and card companies had more control over payment infrastructure. They could earn fees and shape customer behavior.\n\nPix reduced that control.\n\nIf basic money transfers become instant and low-cost, financial companies must compete in other ways.\n\nThey can offer better apps, better credit, better investment options, better fraud protection, better customer service, and better tools for businesses.\n\nThis is an important policy lesson.\n\nSometimes the state does not need to replace private companies. It can create common infrastructure that forces private companies to compete more fairly.\n\n09 — The fraud challenge\nThe success of Pix also created a larger target for criminals.\n\nWhen millions of people use a system, criminals study it. They look for weak points.\n\nWith Pix, the weak point is often not the technology itself. It is human trust.\n\nA scammer can call someone pretending to be from a bank. They can send a fake message. They can create urgency. They can pretend a family member needs help. They can pressure a victim into transferring money quickly.\n\nThis is called social engineering: tricking people, not machines.\n\nInstant transfers make this more dangerous because there is less time to stop the payment.\n\nThis means Brazil must constantly improve consumer protection.\n\n10 — The privacy question\nPix also raises a deeper question: what happens when more payments become digital?\n\nDigital payments can help fight tax evasion, money laundering, and informality. They can help banks understand customers. They can support credit scoring and business records.\n\nBut they also create data.\n\nWho sees the data? How is it protected? Can the state use it? Can banks use it? Can companies build profiles of people’s behavior?\n\nThese questions are not unique to Pix. They are part of the future of digital money everywhere.\n\nPix shows that financial inclusion and data governance must be discussed together.\n\n11 — Why Pix matters for development\nPix is not just a payment story. It is a development story.\n\nDevelopment is often about large projects: roads, schools, ports, factories, power plants. Pix shows that digital infrastructure can also matter.\n\nA simple payment tool can reduce friction for millions of people. It can help small businesses. It can make digital finance more normal. It can increase competition. It can modernize the economy.\n\nThis is why Brazil’s Pix is studied globally.\n\nIt shows that innovation can come from the Global South. It shows that public institutions can design modern technology. It shows that economic modernization can happen through everyday tools.\n\n12 — The final lesson\nPix changed Brazil because it changed something ordinary.\n\nIt did not build a new city. It did not discover oil. It did not create a giant new factory.\n\nIt made paying easier.\n\nBut when millions of people pay and receive money every day, making payment easier becomes a huge economic change.\n\nThat is the real lesson: sometimes the most powerful reforms are the ones people stop noticing because they become part of normal life.\n\nKey takeaway: Pix shows how one simple public payment system can change daily life, help small businesses, and modernize the way money moves through an economy."}, "singapore-rich": {"quick": "Singapore became rich even though it had almost none of the usual advantages.\n\nWhen Singapore became independent in 1965, it was small, vulnerable, and uncertain about its future. It had little land, no oil, no major mineral resources, and no huge domestic market.\n\nA large country can sometimes grow by selling natural resources or by producing for its own population. Singapore could not do that.\n\nSo it chose another path: become useful to the world.\n\nSingapore built one of the world’s most efficient ports. It invested in education, housing, transport, clean administration, public safety, and reliable rules. It became a place where ships, companies, banks, investors, and workers could operate with confidence.\n\nIts location helped. Singapore sits near the Strait of Malacca, one of the busiest maritime corridors on Earth. But geography alone does not make a country rich. Many places are well located and still poor.\n\nSingapore’s success came from combining location with organization.\n\nIn 2024, Singapore’s port handled 41.12 million TEUs of containers. A TEU is the standard unit used to count shipping containers. Around 90% of that container traffic was transshipment, meaning goods passed through Singapore on their way somewhere else.\n\nThat is the heart of the story.\n\nSingapore became rich by becoming a hub: a place where goods, money, people, companies, and information connect.\n\nKey takeaway: Singapore became rich by turning a small and vulnerable island into one of the world’s most useful economic hubs.", "medium": "01 — Singapore started with major disadvantages\nSingapore’s success was not guaranteed.\n\nWhen it became independent in 1965, it faced serious problems. It was a small island city-state with limited land and few natural resources. It had unemployment, housing shortages, social tensions, and security concerns.\n\nIt also had no large domestic market.\n\nThis matters because a big country can sometimes grow by selling to its own population. The United States, China, India, and Brazil have huge internal markets. Singapore does not.\n\nSingapore had to look outward.\n\nIts leaders understood that the country could not survive by being self-sufficient. It had to connect to the world economy.\n\n02 — Geography gave Singapore an opportunity\nSingapore is located near the Strait of Malacca.\n\nThis is one of the most important sea routes in the world. Ships moving between East Asia, India, the Middle East, and Europe often pass near this area.\n\nThat gave Singapore an opportunity to become a port and trade center.\n\nBut location is only the beginning.\n\nImagine a shop on a busy street. The location helps, but if the shop is badly run, dirty, unreliable, and expensive, customers will go somewhere else.\n\nA port works the same way. Ships choose ports that are fast, safe, efficient, and reliable.\n\nSingapore turned its location into a real advantage by building systems around it.\n\n03 — The port became a growth machine\nSingapore’s port is not only a place where ships stop.\n\nIt is a complex logistics system. Containers arrive, are unloaded, sorted, stored, transferred, and sent somewhere else. Ships receive fuel and services. Companies use Singapore to manage regional trade.\n\nIn 2024, Singapore handled 41.12 million TEUs, a record level.\n\nThis is important because Singapore’s local population is small. The port is much bigger than local demand. That is because Singapore acts as a transshipment hub.\n\nTransshipment means goods pass through Singapore on the way to another country.\n\nSo Singapore earns money and importance by helping global trade move efficiently.\n\n04 — Singapore became more than a port\nThe port was the foundation, but Singapore did not stop there.\n\nIt became a center for finance, logistics, shipping services, oil trading, electronics, pharmaceuticals, aviation, and regional corporate headquarters.\n\nA company may choose Singapore as its Asian base because the country offers stability, skilled workers, good infrastructure, low corruption, and clear rules.\n\nThis is important because modern companies do not only want low wages. They also want reliability.\n\nThey want to know that contracts will be respected, electricity will work, ports will be efficient, courts will function, and workers will be trained.\n\nSingapore built a reputation for reliability.\n\n05 — Education and skills\nSingapore invested heavily in education.\n\nThis was necessary because a small country cannot become rich forever by offering cheap labor. Cheap labor can attract factories at the beginning, but eventually wages rise and cheaper countries compete.\n\nTo keep growing, Singapore had to upgrade.\n\nUpgrading means moving into more complex and valuable activities: engineering, finance, advanced manufacturing, research, logistics, management, and technology.\n\nThat requires skilled workers.\n\nEducation helped Singapore move from a basic manufacturing economy to a high-income economy.\n\n06 — Public housing and social stability\nSingapore also invested in public housing.\n\nThis may not sound like an economic policy, but it is.\n\nA productive city needs people to live in decent conditions. Workers need homes. Families need stability. A country with severe housing chaos can face social tensions that weaken growth.\n\nSingapore’s public housing system helped create social stability and gave many citizens a stake in the country’s development.\n\nThis supported the broader economic model.\n\n07 — The role of the state\nThe government played a central role in Singapore’s development.\n\nIt planned infrastructure, supported education, attracted foreign investment, managed housing, and built strong public institutions.\n\nThe key idea is state capacity.\n\nState capacity means the government can actually implement policies. It can build what it promises, enforce rules, maintain infrastructure, and adapt when conditions change.\n\nMany countries have good plans. Fewer countries execute them well.\n\nSingapore’s strength was execution.\n\n08 — The limits of Singapore’s model\nSingapore is rich, but it remains vulnerable.\n\nIt imports much of its food and energy. It has limited land. It depends on global trade and foreign investment. If shipping routes are disrupted or the world economy slows, Singapore feels the impact.\n\nIts success also creates new challenges: high living costs, pressure on space, inequality concerns, and constant competition from other hubs.\n\nSingapore’s wealth is not guaranteed. It must keep adapting.\n\nKey takeaway: Singapore became rich by turning a small and vulnerable island into one of the world’s most useful economic hubs.", "deep": "01 — The paradox of Singapore\nSingapore is one of the most interesting development stories because it became rich without the usual ingredients of national wealth.\n\nIt had no oil fields, no large mineral reserves, no huge agricultural base, no giant internal market, and no large territory.\n\nMany countries with more natural advantages have struggled. Singapore had fewer easy advantages but became one of the richest economies in the world.\n\nThat is the paradox.\n\nThe answer is not one single factor. Singapore became rich because it combined geography, ports, education, foreign investment, public planning, social stability, and trust.\n\n02 — Why independence was difficult\nSingapore became independent in 1965 after separation from Malaysia.\n\nAt the time, the situation was fragile. The country had unemployment, housing shortages, ethnic tensions, and limited natural resources. It also faced uncertainty about how to defend itself and how to survive economically.\n\nA small country cannot easily isolate itself. It must trade, attract investment, and create a role in the world.\n\nSingapore understood that it could not be self-sufficient. It had to become connected.\n\nThis is one of the most important ideas in its story.\n\n03 — Turning location into value\nSingapore’s location near the Strait of Malacca gave it a major opportunity.\n\nThe Strait of Malacca connects the Indian Ocean with East Asia. It is used by ships moving between Europe, the Middle East, India, China, Japan, South Korea, and Southeast Asia.\n\nBut location alone is not enough.\n\nA country must convert location into value. Singapore did this by building one of the world’s most efficient port systems.\n\nShips do not stop somewhere only because of geography. They stop where services are fast, reliable, and cost-effective.\n\nSingapore offered that.\n\n04 — The port ecosystem\nA port is not only cranes and ships.\n\nA major port creates an ecosystem. It attracts shipping companies, fuel suppliers, warehouses, insurance firms, banks, customs specialists, repair services, technology providers, and logistics companies.\n\nThis ecosystem becomes stronger over time.\n\nIf many ships come, more service companies come. If more service companies come, the port becomes more useful. If the port becomes more useful, even more ships come.\n\nThis is a network effect.\n\nSingapore became one of the best examples of a maritime network effect.\n\n05 — Why transshipment is so important\nIn 2024, Singapore handled 41.12 million TEUs of containers, and around 90% of that was transshipment.\n\nThis number is essential.\n\nTransshipment means goods are not necessarily staying in Singapore. They are passing through Singapore on the way to other destinations.\n\nThis shows Singapore’s role as a connector.\n\nA small country can become important if the world needs to pass through it.\n\nSingapore used this role to build wealth, jobs, expertise, and influence.\n\n06 — From trade hub to business hub\nSingapore did not remain only a shipping point.\n\nIt became a place where companies manage regional operations.\n\nA multinational company may use Singapore to coordinate business across Southeast Asia or Asia more broadly. Banks may use Singapore for finance. Shipping firms use it for maritime services. Energy companies use it for trading. Technology firms use it for regional strategy.\n\nThis happened because Singapore offered more than location. It offered reliability.\n\nCompanies need predictable rules. They need skilled workers. They need functioning infrastructure. They need low corruption. They need legal trust.\n\nSingapore provided these conditions.\n\n07 — Education and human capital\nHuman capital means the skills, knowledge, and health of people.\n\nSingapore invested heavily in human capital because it had few natural resources. If the country could not rely on what was underground, it had to rely on what people could learn and build.\n\nEducation helped Singapore move into more advanced industries.\n\nAt first, manufacturing provided jobs. Over time, the country moved into electronics, petrochemicals, pharmaceuticals, aviation, finance, logistics, and technology.\n\nThis transition matters because rich countries usually do not become rich by doing only simple tasks. They become rich by doing complex tasks well.\n\nSingapore built the skills needed for complexity.\n\n08 — Housing as economic infrastructure\nHousing is often seen as social policy, but in Singapore it was also economic infrastructure.\n\nA stable workforce needs stable housing. A city that cannot house its workers becomes expensive, unstable, and socially tense.\n\nSingapore’s public housing program helped organize urban life. It supported social stability and gave many citizens a sense of belonging.\n\nThis does not mean housing is easy in Singapore today. The country still faces high costs and limited land. But public housing was central to the development model.\n\n09 — Clean administration and trust\nTrust is one of Singapore’s greatest economic assets.\n\nInvestors trust the rules. Companies trust contracts. Ships trust the port. Citizens trust that basic systems will function.\n\nTrust lowers costs.\n\nIf a company expects corruption, legal problems, and unreliable infrastructure, it must spend more money protecting itself. If it trusts the system, it can focus on business.\n\nSingapore’s reputation for clean and efficient administration became a competitive advantage.\n\nThis is why institutions matter.\n\nInstitutions are the rules, organizations, and habits that make a country function.\n\n10 — Foreign investment with purpose\nSingapore attracted foreign investment, but it did not simply wait passively for companies to arrive.\n\nIt created conditions that foreign companies wanted: infrastructure, stability, educated workers, tax competitiveness, and access to Asia.\n\nBut the deeper goal was upgrading.\n\nSingapore wanted foreign firms to bring technology, training, management methods, and global connections.\n\nThis helped the local economy become more capable over time.\n\nForeign investment can be shallow if it only uses cheap labor. In Singapore, it became part of a larger development strategy.\n\n11 — Why Singapore cannot relax\nSingapore’s success is impressive, but fragile.\n\nIt depends on global trade. It imports food and energy. It must manage relations with larger powers. It must stay attractive to companies. It must keep upgrading skills.\n\nIf the global economy becomes more divided, Singapore may face pressure. If trade routes become less secure, its port role becomes more complicated. If other hubs become more competitive, Singapore must improve again.\n\nSingapore became rich by being useful. To stay rich, it must remain useful.\n\n12 — The final lesson\nSingapore’s story is not that every country can copy it exactly.\n\nSingapore is small, urban, centralized, and historically unique. A large country cannot simply become Singapore.\n\nBut the lesson is still powerful.\n\nCountries grow when they reduce friction, build trust, invest in people, connect to markets, and create institutions that work.\n\nSingapore had very little, but it organized what it had extremely well.\n\nKey takeaway: Singapore became rich by turning a small and vulnerable island into one of the world’s most useful economic hubs."}, "argentina-currency": {"quick": "Argentina often faces currency crises because many people do not fully trust the peso.\n\nThe peso is Argentina’s national currency. People use it every day to buy food, pay wages, take buses, and run businesses.\n\nBut when it comes to saving money, many Argentinians prefer U.S. dollars.\n\nThat is the heart of the problem.\n\nA currency works when people believe it will keep value. If people think their money will lose value quickly, they try to protect themselves. In Argentina, many people protect themselves by buying dollars, pricing property in dollars, or moving savings away from the peso.\n\nThis behavior is understandable because Argentina has a long history of inflation, devaluation, debt crises, and restrictions on access to foreign currency.\n\nBut it creates a loop.\n\nIf people fear the peso will lose value, they buy dollars. If many people buy dollars, the peso weakens. If the peso weakens, imports become more expensive. If imports become more expensive, prices rise. If prices rise, people trust the peso even less.\n\nIn 2025, Argentina received a new US$20 billion IMF program, showing again how difficult it is for the country to stabilize its economy and rebuild confidence.\n\nArgentina’s crisis is not only about numbers. It is about memory, politics, and trust.\n\nKey takeaway: Argentina’s currency crises repeat because people do not fully trust the peso, and that mistrust makes each new crisis harder to stop.", "medium": "01 — What is a currency crisis?\nA currency crisis happens when people lose confidence in a country’s money.\n\nImagine you are paid in pesos. Today, your salary can buy food, clothes, transport, and rent. But if prices rise very quickly, the same salary buys less next month.\n\nIf this happens again and again, you stop trusting the currency.\n\nYou may try to spend quickly before prices rise. You may ask for higher wages. You may buy dollars. You may avoid saving in pesos.\n\nWhen millions of people behave like this, the currency becomes weaker.\n\nThat is a currency crisis: the money loses trust.\n\n02 — Why the dollar matters in Argentina\nIn Argentina, the U.S. dollar is more than a foreign currency. It is a symbol of safety.\n\nMany Argentinians think in two currencies. They use pesos for daily life, but dollars for protection.\n\nA person may buy groceries in pesos but think about savings in dollars. A property may be priced in dollars. A business may worry about the peso-dollar exchange rate every day.\n\nThis is not irrational. It comes from experience.\n\nArgentina has had many periods of high inflation and devaluation. People learned that pesos can lose value quickly. Dollars became a way to protect purchasing power.\n\nThe problem is that when everyone wants dollars, the peso comes under pressure.\n\n03 — Inflation damages everyday life\nInflation means prices are rising.\n\nA little inflation is normal in many economies. But high inflation is different. It changes how people live.\n\nFamilies rush to buy goods before prices rise again. Workers ask for wage increases. Shops change prices frequently. Businesses struggle to plan. Saving becomes difficult.\n\nInflation also hurts poorer households more because they usually have fewer ways to protect themselves. A wealthy person may buy dollars, property, or foreign assets. A poorer family may have to keep money in pesos and spend it quickly.\n\nSo inflation is not only an economic problem. It is a social problem.\n\n04 — The expectation problem\nInflation becomes especially dangerous when people expect it to continue.\n\nIf a shop owner expects suppliers to raise prices, the shop owner may raise prices early. If workers expect higher prices, they demand higher wages. If businesses expect wages to rise, they raise prices again.\n\nEveryone is trying to protect themselves.\n\nBut together, these actions can make inflation worse.\n\nThis is why expectations matter. The government does not only need to reduce inflation. It needs to convince people that inflation will stay lower.\n\nThat is much harder in a country with a long history of instability.\n\n05 — Argentina needs dollars from the world\nArgentina also faces a foreign currency problem.\n\nIt needs dollars to pay for imports and foreign debt.\n\nImports include machines, energy, medicine, industrial parts, technology, and consumer goods. Many of these are priced in dollars.\n\nArgentina earns dollars by exporting goods and services. Important exports include soy, wheat, beef, energy, lithium, and other products.\n\nThe problem comes when Argentina does not earn enough dollars to pay for imports, debt, and financial needs.\n\nThis is called an external constraint.\n\nIt means the country’s economy is limited by how many foreign currencies it can obtain.\n\n06 — What happens when dollars are scarce?\nWhen dollars become scarce, the government faces difficult choices.\n\nIt can devalue the peso. That means one dollar becomes more expensive in pesos. This may help exporters, but it makes imports more expensive and can increase inflation.\n\nIt can restrict access to dollars. This can protect reserves temporarily, but it creates frustration and black markets.\n\nIt can borrow from abroad. This brings dollars today, but creates debt tomorrow.\n\nIt can reduce spending and imports. This may stabilize finances, but it can also cause recession and social pain.\n\nNone of these options are easy.\n\n07 — Why the IMF appears\nThe International Monetary Fund, or IMF, often appears when a country cannot easily finance itself.\n\nThe IMF lends money to countries in crisis, usually in exchange for reforms.\n\nIn April 2025, the IMF approved a US$20 billion program for Argentina, including an immediate US$12 billion disbursement.\n\nThis money can help rebuild reserves and stabilize the economy. But IMF programs are controversial because they often require difficult adjustments.\n\nPeople may fear spending cuts, subsidy reductions, price increases, or recession.\n\nSo the IMF is not just an economic actor. In Argentina, it is also politically sensitive.\n\n08 — Why the crisis repeats\nArgentina’s currency crises repeat because each crisis damages trust.\n\nAfter a devaluation, people remember. After inflation, people remember. After restrictions on bank accounts or dollars, people remember.\n\nThat memory shapes future behavior.\n\nEven if a new government promises stability, many people think, “We have heard this before.”\n\nThis creates a credibility trap.\n\nThe peso needs trust to stabilize. But people need stability before they trust the peso.\n\nKey takeaway: Argentina’s currency crises repeat because people do not fully trust the peso, and that mistrust makes each new crisis harder to stop.", "deep": "01 — Money is trust\nMoney works because people believe in it.\n\nA banknote is just paper. A number in a bank account is just a digital entry. It has value because people believe they can use it tomorrow.\n\nIf people trust money, they save in it, lend in it, borrow in it, and sign contracts in it.\n\nIf they do not trust it, they try to escape it.\n\nArgentina’s problem is that many people use pesos because they must, but save in dollars because they trust them more.\n\nThat is a deep problem for any economy.\n\n02 — The peso’s damaged reputation\nThe peso carries the memory of past crises.\n\nArgentina has experienced repeated inflation, devaluations, debt defaults, exchange controls, and financial instability.\n\nThis history matters because economic behavior is not only based on today’s numbers. It is based on what people expect tomorrow.\n\nIf people have seen the currency collapse before, they protect themselves earlier next time.\n\nThis can make a crisis happen faster.\n\nThe peso therefore has a reputation problem. It is not enough for a government to declare a new policy. People must believe the policy will last.\n\n03 — Why people buy dollars\nBuying dollars is often a defensive action.\n\nA family may buy dollars because it wants to protect savings. A business may buy dollars because it needs to import goods. An investor may buy dollars because they fear devaluation.\n\nEach individual action makes sense.\n\nBut when many people buy dollars at the same time, pressure builds.\n\nDemand for dollars rises. Demand for pesos falls. The exchange rate weakens. The government may lose reserves trying to defend the peso.\n\nThis is how individual self-protection can create collective instability.\n\n04 — Inflation and the wage-price loop\nHigh inflation creates a wage-price loop.\n\nWorkers see prices rising, so they ask for higher wages. Businesses pay higher wages, so they raise prices. Suppliers raise prices too. Workers then ask for higher wages again.\n\nThis does not mean workers or businesses are irrational. They are trying to survive.\n\nBut when everyone tries to protect themselves from inflation, they can accidentally help keep inflation alive.\n\nThis is why inflation can become very hard to stop.\n\nA government must change not only prices, but expectations.\n\n05 — The role of the government budget\nCurrency crises are often connected to government spending.\n\nIf a government spends much more than it collects in taxes, it must finance the gap.\n\nIt can borrow. It can cut spending. It can raise taxes. Or it can create money.\n\nIf a country already has low trust in its currency, creating money to finance deficits can worsen inflation.\n\nBut cutting spending is politically difficult.\n\nPublic spending includes pensions, wages, subsidies, welfare, education, health, and infrastructure. Reducing it can hurt real people.\n\nThis creates a painful dilemma: not adjusting can fuel inflation, but adjusting can create social pain.\n\n06 — The foreign currency constraint\nArgentina needs dollars because many international transactions happen in dollars.\n\nImports, foreign debt, and investor confidence often depend on access to dollars.\n\nArgentina earns dollars through exports. Agriculture has long been important, including soy, wheat, and beef. Energy and lithium are also important opportunities.\n\nBut when export earnings are not enough, pressure rises.\n\nIf Argentina grows quickly, it may import more machines, energy, and goods. That can increase the need for dollars. If dollars do not arrive fast enough, growth hits a wall.\n\nThis is called the external constraint.\n\nIt means Argentina’s economy can be limited by foreign currency availability.\n\n07 — Devaluation and its consequences\nDevaluation means the peso loses value compared with the dollar.\n\nThis can help exporters because their goods become cheaper for foreign buyers. It can also increase the peso value of export revenues.\n\nBut devaluation also makes imports more expensive.\n\nIf Argentina imports fuel, machines, medicine, or industrial parts, those goods cost more in pesos after devaluation.\n\nThat can push inflation higher.\n\nThis is why devaluation is risky in Argentina. In a country where people already expect inflation, a weaker peso can quickly feed into prices.\n\n08 — Why exchange controls appear\nWhen dollars are scarce, governments often try to control access to them.\n\nThey may create official exchange rates, special rates, import rules, or limits on buying dollars.\n\nThe goal is to protect reserves.\n\nBut controls can create confusion.\n\nIf the official dollar price is lower than the market price, people search for other ways to get dollars. Black markets appear. Businesses delay decisions. Exporters may wait before selling dollars. Importers may rush to buy dollars cheaply.\n\nThis creates distortions.\n\nMultiple exchange rates are often a symptom of a deeper problem: lack of trust.\n\n09 — Debt in dollars\nDebt becomes dangerous when it is owed in foreign currency.\n\nArgentina collects much of its revenue in pesos. But if it owes money in dollars, a weaker peso makes repayment harder.\n\nImagine a government owes dollars. If the peso loses value, the government needs more pesos to buy the same dollars.\n\nInvestors know this. If they fear default or devaluation, they demand higher interest rates. Higher interest rates make borrowing more expensive. This can make the debt problem worse.\n\nThat is another loop: fear raises costs, and higher costs create more fear.\n\n10 — Why the IMF is controversial\nThe IMF provides financial support, but it usually asks for reforms.\n\nThese reforms may include controlling spending, rebuilding reserves, changing exchange-rate policy, reducing subsidies, or improving fiscal discipline.\n\nEconomically, these reforms may be intended to stabilize the country.\n\nPolitically, they can be painful.\n\nPeople may associate the IMF with austerity, recession, external pressure, or loss of sovereignty. In Argentina, where the IMF has appeared many times, these memories are especially strong.\n\nSo an IMF program is not just a financial agreement. It becomes part of national politics.\n\n11 — Why Argentina still has potential\nArgentina’s crises do not mean the country lacks strengths.\n\nArgentina has fertile land, agricultural exports, energy resources, lithium, educated workers, scientific capacity, culture, and industry.\n\nThe problem is that instability weakens these strengths.\n\nIf inflation is high, businesses cannot plan. If the exchange rate is unstable, investment becomes risky. If debt crises repeat, lenders become cautious. If people expect another collapse, they protect themselves instead of investing confidently.\n\nArgentina is not poor in potential. It is constrained by instability.\n\n12 — The credibility trap\nArgentina is stuck in a credibility trap.\n\nTo stabilize the peso, people must believe the government’s plan. But people will only believe the plan if they see stability. And stability is difficult to create when people do not believe.\n\nThis is why the crisis repeats.\n\nThe real solution is not only technical. It is institutional and political.\n\nArgentina needs policies that last long enough to rebuild trust. It needs people to believe that the rules will not change suddenly. It needs the peso to become a currency people can save in, not just spend quickly.\n\nThat takes time.\n\n13 — The final lesson\nArgentina’s currency crisis is not only a story about inflation, dollars, or debt.\n\nIt is a story about trust.\n\nWhen trust disappears, people try to protect themselves. When everyone protects themselves at once, the currency weakens further.\n\nThat is why rebuilding trust is the hardest part.\n\nKey takeaway: Argentina’s currency crises repeat because people do not fully trust the peso, and that mistrust makes each new crisis harder to stop."}, "ports-matter": {"quick": "Ports matter because globalization is physical.\n\nWhen people talk about globalization, they often think about the internet, finance, apps, or online shopping. But most goods still have to move through the real world.\n\nYour phone, clothes, food, medicine, car parts, fuel, furniture, and machines may have travelled by ship.\n\nA port is where ships meet land. Containers are unloaded. Goods are checked. Trucks, trains, rivers, and warehouses take over.\n\nIf ports work well, trade is faster and cheaper. If ports slow down, goods arrive late and prices can rise.\n\nPorts also depend on chokepoints. A chokepoint is a narrow passage that many ships need to use. The Suez Canal, Panama Canal, and Strait of Malacca are examples.\n\nThese places are powerful because they save time. But they are fragile because too much trade depends on them.\n\nWhen the Suez Canal or Red Sea routes are disrupted, ships may travel around Africa instead. That takes more time, more fuel, and more money.\n\nThis is why ports matter to ordinary people. A delay at sea can eventually affect the price of goods in a shop.\n\nKey takeaway: Ports are the hidden machinery of globalization: when they work, we forget them; when they fail, everyone feels it.", "medium": "01 — Globalization is not just digital\nGlobalization often feels invisible.\n\nYou click a button, order a product, and it arrives. You may not think about where it came from, how it travelled, or how many systems had to work for it to reach you.\n\nBut the world economy is still very physical.\n\nGoods must be produced, packed, loaded, shipped, unloaded, checked, stored, and delivered.\n\nShips are especially important because they can carry enormous quantities of goods at relatively low cost. Air transport is faster, but it is much more expensive. For heavy goods, bulk goods, energy, food, and containers, shipping is essential.\n\nPorts are the places where this global movement connects to land.\n\n02 — What a port actually does\nA port is not just a place where boats stop.\n\nA modern port is a complex machine made of many parts: cranes, docks, containers, warehouses, customs offices, computers, workers, trucks, trains, fuel services, security systems, and shipping companies.\n\nA container arriving at a port must be unloaded. It may be scanned. Documents must be checked. Taxes or customs duties may be handled. The container may be stored. Then it must move to another ship, a truck, a train, a warehouse, or a factory.\n\nIf one part of this system is slow, everything slows down.\n\nThat is why port efficiency matters. A slow port is like a traffic jam for the economy.\n\n03 — Containers changed trade\nContainers are standard metal boxes.\n\nThey may look boring, but they changed the world.\n\nBefore containers, goods were loaded and unloaded piece by piece. This took time. It required many workers. Goods could be damaged or stolen. Ships spent longer in port.\n\nContainers made trade much easier.\n\nThe same box can move from a truck to a ship, from a ship to a train, and from a train to a warehouse without being unpacked.\n\nThis helped companies build global supply chains. A product could have parts from several countries and be assembled somewhere else.\n\nWithout container ports, modern globalization would be much slower and more expensive.\n\n04 — Why chokepoints matter\nA chokepoint is a narrow route that many ships need.\n\nThe Suez Canal connects Europe and Asia without requiring ships to go around Africa. The Panama Canal connects the Atlantic and Pacific. The Strait of Malacca connects the Indian Ocean to East Asia.\n\nThese routes are shortcuts. They save time, fuel, and money.\n\nBut that also makes them dangerous. If a shortcut is blocked or unsafe, many ships must change route.\n\nWhen ships avoid Suez, for example, many travel around the Cape of Good Hope in southern Africa. That route is longer and more expensive.\n\n05 — Why this affects ordinary people\nA canal far away may seem unrelated to daily life.\n\nBut if ships take longer routes, companies pay more for fuel, insurance, and time. If companies pay more, prices may rise. If goods are delayed, factories may wait for parts. If food or energy shipments are disrupted, countries can face shortages or higher costs.\n\nThis is why ports matter.\n\nThey are not just local infrastructure. They are pressure points in the world economy.\n\n06 — Ports and development\nFor developing countries, ports can be gateways to growth.\n\nA good port can help farmers export food, factories import machines, mining companies ship resources, and consumers access cheaper goods.\n\nBut a port alone is not enough. It must connect to roads, railways, warehouses, cities, industrial zones, and customs systems.\n\nIf the port is modern but the roads behind it are weak, goods still get stuck.\n\nSo the real goal is not just to build a port. It is to connect the port to the rest of the economy.\n\n07 — Ports are strategic\nPorts are also geopolitical.\n\nA country with major ports can influence trade, energy routes, and military access. This is why governments care about who owns ports, who finances them, and who controls nearby sea lanes.\n\nDuring conflict, ports can become targets. Blocking a port can damage a country’s exports and imports. Making a shipping lane dangerous can raise insurance costs and force ships to change route.\n\nPorts are economic tools, but they are also strategic assets.\n\nKey takeaway: Ports are the hidden machinery of globalization: when they work, we forget them; when they fail, everyone feels it.", "deep": "01 — The world economy moves through physical places\nGlobalization is often explained with big ideas: free trade, international markets, global value chains, multinational companies, and comparative advantage.\n\nBut behind all these ideas is a simple fact: goods must move.\n\nA phone must move from factory to consumer. Oil must move from producer to refinery. Wheat must move from farms to ports and then to importers. Machines must move to factories. Medicine must move to hospitals.\n\nThis movement depends on ships and ports.\n\nPorts are where global trade becomes visible. They are the meeting point between oceans and land economies.\n\n02 — Ports reduce friction\nA good port reduces friction.\n\nFriction means anything that slows trade down or makes it more expensive: waiting time, bad paperwork, slow cranes, weak customs systems, poor roads, strikes, congestion, corruption, or security problems.\n\nEvery delay is a cost.\n\nIf a ship waits outside a port for two days, someone pays. If containers sit too long, someone pays. If goods arrive late at a factory, production may stop. If food arrives late, prices may rise.\n\nThis is why ports are productivity machines.\n\nThey do not only move goods. They reduce the hidden costs of moving goods.\n\n03 — Why containers were revolutionary\nThe container revolution was one of the biggest economic changes of the 20th century.\n\nBefore containers, shipping was slower and messier. Goods were packed in different shapes and handled manually. Loading and unloading took a long time. Theft and damage were more common.\n\nThe standardized container solved many of these problems.\n\nA container can be lifted by crane, stacked on a ship, placed on a truck, moved by train, and stored in a warehouse. It creates a single system across different transport modes.\n\nThis is called intermodal transport.\n\nThe result was cheaper and more reliable trade. Companies could organize production across the world because they could trust goods to move more predictably.\n\nThis helped create global supply chains.\n\n04 — Singapore as an example\nSingapore shows how a port can make a small country powerful.\n\nSingapore does not have a large territory or many natural resources. But it sits near the Strait of Malacca, one of the world’s most important maritime routes.\n\nThe country built a highly efficient port and became a global transshipment hub.\n\nIn 2024, Singapore handled 41.12 million TEUs of containers. Around 90% of that container throughput was transshipment, meaning goods passed through Singapore on the way somewhere else.\n\nThis is the power of a port: it can allow a small country to become essential to global trade.\n\n05 — Chokepoints are shortcuts and weaknesses\nChokepoints are places where geography narrows trade.\n\nThe Suez Canal is a shortcut between Europe and Asia. The Panama Canal is a shortcut between the Atlantic and Pacific. The Strait of Malacca is a key route between the Indian Ocean and East Asia. The Bab el-Mandeb links the Red Sea to the Indian Ocean.\n\nThese places matter because they save time.\n\nBut the same thing that makes them useful makes them risky. If too many ships depend on a narrow route, disruption can have global effects.\n\nA blockage, war, attack, drought, accident, or political crisis can force ships to reroute.\n\nWhen ships reroute, they travel farther. Longer routes mean more fuel, more time, more emissions, higher insurance costs, and sometimes higher prices.\n\n06 — The Red Sea and Suez example\nRecent disruptions around the Red Sea and Suez Canal show this clearly.\n\nWhen ships avoid Suez, many travel around the Cape of Good Hope in southern Africa. This is much longer.\n\nThis is not a small logistical detail. It changes shipping schedules, fuel use, container availability, delivery times, and costs.\n\nIt also shows that geopolitics can quickly become economics.\n\nA security problem in one sea route can affect a factory, a supermarket, or a consumer thousands of kilometers away.\n\n07 — Ports are strategic assets\nPorts are not only economic. They are geopolitical.\n\nA country with major ports can influence trade flows. A naval base near a port can influence military power. A foreign company operating a terminal may raise security questions. A port used for energy exports can become strategically important.\n\nThis is why governments care about ports.\n\nPorts can be used for development, but also for pressure. During conflicts, blockades can damage an enemy’s economy. Attacks near shipping lanes can increase insurance costs. Control of a port can shape regional power.\n\nThe sea may look open, but maritime trade is deeply political.\n\n08 — Climate risk\nPorts also face climate risk.\n\nMany ports are located on coasts, which makes them vulnerable to sea-level rise and storms. Extreme weather can damage infrastructure. Heat can affect workers and equipment. Drought can reduce water levels in canals.\n\nThe Panama Canal is a good example of how nature affects trade. The canal depends on water to operate its locks. If drought reduces water availability, fewer ships may pass, or ships may need to carry less cargo.\n\nThis reminds us that globalization depends not only on markets and technology, but also on climate and geography.\n\n09 — Ports and national development\nFor developing countries, a good port can help growth. But only if it is connected to the rest of the country.\n\nA port should help farmers export, factories import inputs, cities receive goods, and businesses connect to global markets.\n\nIf the port is isolated, it may mainly serve foreign companies or extractive industries. If it is connected to roads, railways, industrial zones, and local firms, it can support broader development.\n\nThe key question is not only “Does the country have a port?” The question is “Does the port help the whole economy?”\n\n10 — The deeper lesson\nPorts teach us that globalization is not weightless.\n\nIt depends on steel boxes, cranes, canals, straits, fuel, workers, insurance, customs, laws, weather, and security.\n\nWhen everything works, consumers forget this system exists. When something breaks, everyone suddenly remembers it.\n\nA delay in a port can become a delay in a factory. A dangerous sea route can become a higher price in a shop. A drought in a canal can become a problem for global shipping.\n\nPorts are therefore not just places on a map. They are the hidden machinery of modern life.\n\nKey takeaway: Ports are the hidden machinery of globalization: when they work, we forget them; when they fail, everyone feels it."}, "taiwan-strait": {"quick": "The Taiwan Strait matters because one small area connects technology, trade, China, the United States, and the global economy.\n\nThe Taiwan Strait is the water between Taiwan and mainland China.\n\nOn a map, it does not look very large. But it is one of the most important places in the world.\n\nWhy?\n\nBecause Taiwan is central to semiconductor production.\n\nA semiconductor, often called a chip, is a tiny electronic part that helps machines process information. Phones need chips. Cars need chips. Computers need chips. Artificial intelligence needs chips. Hospitals, factories, satellites, and weapons systems also need chips.\n\nTaiwan is especially important for advanced chips. These are the most difficult chips to produce.\n\nThis matters because China sees Taiwan as part of its territory, while Taiwan governs itself. The United States supports Taiwan’s security in different ways and wants to prevent China from controlling the region by force.\n\nSo a crisis in the Taiwan Strait would not only be a local conflict. It could disrupt global technology, global trade, and the balance of power in Asia.\n\nKey takeaway: The Taiwan Strait matters because a crisis there could disrupt both global technology and global power politics at the same time.", "medium": "01 — What is the Taiwan Strait?\nThe Taiwan Strait is the sea between Taiwan and mainland China.\n\nTaiwan is an island with its own government, military, elections, economy, and laws. China says Taiwan is part of China and wants eventual unification. Beijing has not ruled out using force.\n\nThis creates one of the world’s most dangerous geopolitical tensions.\n\nThe United States does not officially recognize Taiwan as a fully separate country in the same way it recognizes most states, but it supports Taiwan’s ability to defend itself and opposes a forced change in the status quo.\n\nThis makes the Taiwan Strait a place where local politics, great-power rivalry, and global economics meet.\n\n02 — Why chips are so important\nThe most important economic reason Taiwan matters is semiconductors.\n\nA semiconductor is a tiny component that controls electricity inside machines. That may sound technical, but the simple idea is this: chips are the brains of modern devices.\n\nWithout chips, smartphones do not work. Cars cannot run many electronic systems. Data centers cannot process information. AI models cannot train or operate. Military systems become weaker. Hospitals lose access to important machines.\n\nChips are not just another product. They are the foundation of modern technology.\n\n03 — Why Taiwan is special\nTaiwan became one of the world’s most important chip producers.\n\nIts most famous company is TSMC, Taiwan Semiconductor Manufacturing Company. TSMC is a foundry. That means many companies design chips, but TSMC manufactures them.\n\nThis is very difficult. Advanced chipmaking requires extremely precise machines, clean rooms, engineers, chemicals, water, electricity, and years of experience.\n\nYou cannot simply replace Taiwan overnight.\n\nSome analyses say Taiwan produces over 60% of the world’s semiconductors and more than 90% of the most advanced chips.\n\nThat level of concentration creates global dependence.\n\n04 — Why concentration is risky\nConcentration can be efficient.\n\nIf Taiwan is very good at making chips, companies around the world benefit. They get advanced chips from the best producers.\n\nBut concentration is dangerous during crisis.\n\nIf a conflict, blockade, cyberattack, earthquake, or political shock disrupted Taiwan’s chip production, the effects would spread everywhere.\n\nCar factories could slow down. Electronics companies could face shortages. AI companies could pay more for hardware. Governments could worry about weapons systems and national security.\n\nThis is why chips are now seen as strategic goods.\n\n05 — Why China cares\nFor China, Taiwan is not a normal foreign-policy issue.\n\nIt is tied to sovereignty, national identity, historical memory, and the legitimacy of the Chinese Communist Party. Beijing sees unification as a core national goal.\n\nChina’s military has also become much stronger over the past decades. This changes the pressure around Taiwan.\n\nA crisis could take many forms. It does not have to be a full invasion. It could be a blockade, military exercises, cyberattacks, pressure on smaller islands, or economic coercion.\n\nEven limited pressure could scare markets.\n\n06 — Why the United States cares\nThe United States cares about Taiwan for several reasons.\n\nFirst, Taiwan matters for technology. Second, Taiwan is important for the balance of power in Asia. Third, U.S. allies such as Japan, South Korea, the Philippines, and Australia watch how Washington handles the Taiwan issue.\n\nIf the United States looks unable to protect partners, allies may worry. If the United States reacts too aggressively, the risk of conflict could rise.\n\nThis is why Taiwan is so sensitive.\n\n07 — Why this matters to ordinary people\nA Taiwan crisis may seem far away, but it could affect ordinary people.\n\nIf chip production is disrupted, cars may become more expensive. Phones and computers may face delays. AI infrastructure may become more costly. Companies may lose money. Governments may spend more on security and industrial policy.\n\nModern life depends on chips. That means a crisis around Taiwan could affect people who live very far from Asia.\n\n08 — The simple lesson\nThe Taiwan Strait shows a weakness in globalization.\n\nThe world created efficient supply chains by concentrating production in the best places. But when one of those places becomes too important, the whole world becomes vulnerable.\n\nTaiwan’s success made it indispensable. Its location makes that indispensability risky.\n\nKey takeaway: The Taiwan Strait matters because a crisis there could disrupt both global technology and global power politics at the same time.", "deep": "01 — A small strait with global consequences\nThe Taiwan Strait is not very wide compared with the size of the world economy.\n\nBut it connects several major systems at once: China’s national ambitions, Taiwan’s democracy and security, U.S. power in Asia, global shipping, semiconductor production, and modern technology.\n\nThis is why Taiwan appears so often in discussions about geopolitics.\n\nA crisis there could become much bigger than Taiwan itself.\n\nIt could affect markets, factories, military planning, alliances, technology companies, and ordinary consumers.\n\n02 — Taiwan’s political situation\nTaiwan governs itself. It has its own political institutions, military, courts, currency, companies, and elections.\n\nChina sees Taiwan as part of its territory and wants unification. Beijing says this is a core national interest.\n\nThe disagreement is not new. It comes from the Chinese Civil War and the political split between the People’s Republic of China on the mainland and the Republic of China government that continued in Taiwan.\n\nOver time, Taiwan became a democratic and highly developed economy. China became a rising superpower. The United States remained deeply involved in Asia.\n\nThis is why the Taiwan issue is so difficult. It is not only about land. It is about history, identity, power, alliances, and technology.\n\n03 — What semiconductors are\nTo understand Taiwan’s importance, you need to understand chips.\n\nA semiconductor is a material and a component used to control electricity. In everyday language, people usually say “chip.”\n\nChips are inside almost everything modern: phones, computers, cars, washing machines, aircraft, satellites, medical devices, power grids, data centers, AI systems, and military equipment.\n\nA simple product may use many chips. A modern car can require hundreds or even thousands of semiconductor components depending on the model and systems inside it.\n\nAdvanced chips are especially important because they allow powerful computing. They are used in artificial intelligence, high-performance computing, smartphones, advanced weapons, and data centers.\n\n04 — Why advanced chips are hard to make\nAdvanced chipmaking is one of the most complex industrial activities in the world.\n\nIt requires factories called fabs. These fabs cost billions of dollars. They need ultra-clean rooms, because even tiny dust particles can damage production. They require extremely precise machines, advanced chemicals, specialized engineers, reliable electricity, and large amounts of water.\n\nThe production process involves many steps. It is not like building a simple object in a normal factory.\n\nThis is why only a few companies in the world can make the most advanced chips.\n\nTSMC is one of the most important.\n\nIn its 2024 reporting, TSMC said advanced technologies of 7 nanometers and beyond accounted for 69% of total wafer revenue. It also manufactured thousands of products for hundreds of customers.\n\nThat shows how central TSMC is to many companies around the world.\n\n05 — Why Taiwan became central\nTaiwan did not become important by accident.\n\nIt built a semiconductor ecosystem over decades. This included companies, engineers, suppliers, universities, government support, and manufacturing experience.\n\nTSMC’s business model was especially important. Instead of designing all chips itself, it focused on manufacturing chips for other companies. This allowed global chip designers to rely on TSMC as a production partner.\n\nOver time, this model became extremely powerful.\n\nMany of the world’s most important technology companies depend on Taiwan’s manufacturing capacity.\n\nThis is why Taiwan’s semiconductor industry is sometimes called a “silicon shield.” The idea is that Taiwan’s importance to global technology may discourage conflict because too many countries would suffer from disruption.\n\nBut the shield is not perfect. Importance can protect, but it can also attract pressure.\n\n06 — Why a crisis would spread quickly\nA Taiwan crisis would affect the world even without a full invasion.\n\nA blockade could prevent goods and chips from leaving the island. Cyberattacks could disrupt companies or infrastructure. Military exercises could raise insurance costs and scare investors. Sanctions could divide technology markets. Export controls could intensify.\n\nThe effects would travel through supply chains.\n\nA car company in Europe or the United States might lack chips. A phone company might delay products. AI firms might struggle with hardware supply. Defense companies might worry about secure components. Financial markets might fall because investors fear a larger war.\n\nThis is why Taiwan is not only a political issue. It is a global economic risk.\n\n07 — China’s perspective\nFor China, Taiwan is deeply symbolic and strategic.\n\nBeijing sees Taiwan as unfinished national reunification. Chinese leaders also worry about foreign influence near China’s coast. From Beijing’s point of view, Taiwan’s alignment with the United States is a major security concern.\n\nTaiwan also matters militarily. If China controlled Taiwan, the strategic geography of East Asia would change. It could affect sea routes, military access, and the balance of power near Japan and the Philippines.\n\nThis is why Taiwan is central to China’s long-term ambitions.\n\n08 — The U.S. perspective\nFor the United States, Taiwan matters for three main reasons.\n\nFirst, technology. Taiwan is crucial to advanced chips.\n\nSecond, alliances. U.S. allies in Asia watch Taiwan closely. If China used force and the United States did nothing, allies might doubt American security commitments.\n\nThird, balance of power. The United States wants to prevent one country from dominating East Asia.\n\nThis does not mean the United States wants war. The goal is usually deterrence: making conflict too costly so it does not happen.\n\nBut deterrence is difficult. If one side sends too weak a signal, the other side may become more aggressive. If one side sends too strong a signal, tensions may rise.\n\n09 — Why countries are trying to diversify chip production\nBecause Taiwan is so important, many countries want to build more chip production at home.\n\nThe United States, Europe, Japan, South Korea, and others have launched industrial policies to support semiconductors.\n\nThe goal is not to replace Taiwan completely. That would be extremely difficult and would take a long time.\n\nThe goal is resilience.\n\nResilience means the system can survive shocks. If one place is disrupted, the whole world should not stop.\n\nBut building chip capacity is hard. You need money, machines, workers, suppliers, and know-how. A factory is not enough. You need a whole ecosystem.\n\n10 — The technology-security link\nThe Taiwan Strait shows that technology and security are now connected.\n\nIn the past, semiconductors may have looked like a business issue. Today, they are also a national security issue.\n\nChips power civilian life, but also military systems. They are needed for artificial intelligence, satellites, communications, missile systems, cybersecurity, and surveillance.\n\nThis means governments care deeply about who controls chip production.\n\nA factory can become strategic infrastructure. A company can become part of national power. A supply chain can become a security risk.\n\nTaiwan sits at the center of this new world.\n\n11 — The risk for globalization\nThe Taiwan Strait shows a contradiction in globalization.\n\nThe world became efficient by specializing. Countries and companies focused on what they did best. Taiwan became exceptional at advanced chip manufacturing. This helped the world access better technology.\n\nBut specialization also created fragility.\n\nIf one place becomes too important, a crisis there can affect everyone.\n\nTaiwan’s success made it indispensable. Its geopolitical position makes that indispensability dangerous.\n\n12 — The final lesson\nThe Taiwan Strait matters because it connects several stories at once.\n\nIt is about China’s rise. It is about Taiwan’s future. It is about U.S. power in Asia. It is about chips. It is about supply chains. It is about whether the world economy can remain stable when key technologies are concentrated in dangerous places.\n\nA local crisis could become a global economic shock.\n\nThat is why the Taiwan Strait is one of the most important places in the world.\n\nKey takeaway: The Taiwan Strait matters because a crisis there could disrupt both global technology and global power politics at the same time."}});





// Exact full story text override: preserves the full chat-written versions with app formatting only.

function storyText(story, layer){
  const entry = independentStoryLayers[story.id];
  if(entry && entry[layer]) return entry[layer];
  return story.description || story.title;
}

function navigate(page, opts={}){
  state.page = page;
  if(opts.story) state.story = opts.story;
  if(opts.country){
    const c = countryByName[opts.country] || uniqueCountries.find(x=>x.name===opts.country);
    if(c){
      state.currentCountry = c;
      state.focusedCountry = c;
      state.countryQuery = c.name;
      state.selectedItem = null;
    }
  }
  if(opts.storySearch !== undefined){
    state.search = opts.storySearch;
    state.category = 'All';
  }
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function scrollHomeSection(id){
  const target = document.getElementById(id);
  if(!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 18;
  window.scrollTo({top, behavior:'smooth'});
}

function layout(content){
  return `<div class="shell">
    <aside class="sidebar">
      <div class="nav-label nav-label-top">Navigate</div>
      <nav class="nav">
        ${navButton('discover','◉','Discover')}
        ${navButton('search','⌕','Search')}
        ${navButton('compare','⇄','Compare')}
        ${navButton('stories','▰','Stories')}
        ${navButton('daily','▤','Daily Brief')}
      </nav>
      <div class="side-footer">Version 1.5 · rebuilt city panels, added 11 cities, fixed Singapore and port images.</div>
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
    <nav class="home-nav home-nav-actions-only"><div class="home-actions"><a class="pill-btn" href="https://docs.google.com/forms/d/e/1FAIpQLSfFIOOyXHESA-_SzKrPxkeaoVsOElPLU3BJiiVLTo1cubgv0A/viewform?usp=header" target="_blank" rel="noopener">Feedback</a><button class="pill-btn" onclick="scrollHomeSection('tour')">How it works</button><button class="dark-btn" onclick="navigate('discover')">Enter WorldPulse →</button></div></nav>
    <section class="hero">
      <div><div class="kicker">Not a newspaper. Not a feed. Not doomscrolling.</div><h1>Understand the world as a system.</h1><p>WorldPulse is a smooth interactive atlas for economics and geopolitics. It connects countries, ports, cities, currencies, energy and stories — so the world feels less like random headlines and more like a map you can read.</p><div class="hero-cta"><button class="dark-btn" onclick="navigate('discover')">Discover the atlas →</button><button class="ghost-btn" onclick="navigate('stories')">Browse stories</button></div><div class="hero-note">Atlas · country profiles · stories · daily brief · search</div></div>
      <div class="world-mosaic" aria-hidden="true"><div class="mosaic-card big"><span>🌊</span><b>Chokepoints</b><p>Suez, Malacca, Panama, Hormuz.</p></div><div class="mosaic-card"><span>🏙️</span><b>Cities</b><p>Finance, technology, industry.</p></div><div class="mosaic-card"><span>⚓</span><b>Ports</b><p>Where globalization becomes physical.</p></div><div class="mosaic-card dark"><span>⚡</span><b>Power</b><p>Energy, chips, money and leverage.</p></div></div>
    </section>
    <section id="tour" class="home-strip">
      <button class="strip-card" onclick="navigate('discover')"><h3>Discover</h3><p>Open the atlas. Activate cities and ports. Click countries directly to understand their economy.</p></button>
      <button class="strip-card" onclick="navigate('stories')"><h3>Stories in 3 layers</h3><p>Choose quick insight, medium story or deep dive depending on how far you want to go.</p></button>
      <button class="strip-card" onclick="navigate('compare')"><h3>Compare countries</h3><p>See how two economies differ across GDP, population, currency, energy and model.</p></button>
    </section>
    <section class="feedback-section" id="feedback">
      <div class="feedback-card">
        <div>
          <div class="section-kicker">Feedback</div>
          <h2>Help improve WorldPulse</h2>
          <p>Found a bug, noticed missing information, or have an idea for a new story? Send quick feedback through the form and it will go directly to the WorldPulse feedback responses.</p>
        </div>
        <a class="dark-btn feedback-btn" href="https://docs.google.com/forms/d/e/1FAIpQLSfFIOOyXHESA-_SzKrPxkeaoVsOElPLU3BJiiVLTo1cubgv0A/viewform?usp=header" target="_blank" rel="noopener">Send feedback →</a>
      </div>
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

const cityDescriptions = {
  "New York": "New York is the largest city in the United States, with more than 8 million residents in the city and one of the world’s biggest metro economies. It concentrates Wall Street finance, corporate headquarters, media, universities, immigration and the Port of New York/New Jersey, making it a global command center for capital, culture and consumption.",
  "London": "London is a city of nearly 9 million people and one of the world’s most important financial and legal hubs. Its strength comes from the City of London, insurance, foreign exchange, universities, culture, airports and a deep professional-services ecosystem that keeps it central even after Brexit.",
  "Paris": "Paris has more than 2 million residents in the city and over 12 million in the wider region. It is France’s political, luxury, tourism, transport and innovation center, combining ministries, corporate headquarters, world-famous cultural assets, major universities and a growing startup and AI ecosystem.",
  "Singapore": "Singapore is a city-state of about 6 million people built around one of the world’s busiest ports and airports. Its importance comes from logistics, finance, law, education, high-end services and careful state planning that turned a small island with no natural resources into a global connector.",
  "Shanghai": "Shanghai is China’s largest urban economy, with more than 24 million residents and a strategic position at the mouth of the Yangtze River. It combines finance, advanced manufacturing, consumer markets and the world’s largest container port, making it a key gateway between China and global trade.",
  "Shenzhen": "Shenzhen grew from a small border city into a metropolis of more than 17 million people. It is one of China’s most important technology and hardware clusters, combining electronics factories, design teams, suppliers, startups and proximity to Hong Kong in a dense innovation ecosystem.",
  "Tokyo": "Tokyo is the core of the world’s largest metropolitan economy, with more than 37 million people in the wider urban region. It concentrates Japan’s government, finance, corporate headquarters, rail infrastructure, universities and advanced services, making it a high-productivity hub inside an aging economy.",
  "Seoul": "Seoul is a metropolitan region of more than 20 million people and the command center of South Korea’s economy. It links government, universities, finance, entertainment and major conglomerates in chips, cars, batteries and consumer electronics, giving Korea both industrial and cultural global influence.",
  "Dubai": "Dubai has more than 3 million residents and functions as a logistics, tourism, aviation, real-estate and finance hub between Asia, Africa and Europe. Its importance comes from Jebel Ali port, Emirates airline, free zones, luxury tourism and its role as a safe regional base for capital and business.",
  "Riyadh": "Riyadh is Saudi Arabia’s capital and largest city, with more than 7 million people in the metro area. It is being transformed into the administrative, financial and corporate center of Vision 2030, as the kingdom tries to turn oil revenue into services, construction, tourism and private-sector jobs.",
  "Mumbai": "Mumbai has over 12 million residents in the city and more than 20 million in its metro area. It is India’s financial capital, home to major banks, stock exchanges, film studios, port infrastructure and corporate headquarters, linking India’s domestic demand to global capital and trade.",
  "São Paulo": "São Paulo is Brazil’s largest city, with more than 12 million residents and the biggest metro economy in Latin America. It concentrates finance, industry, business services, technology, universities and consumer demand, making it the main economic engine of Brazil beyond commodities.",
  "Lagos": "Lagos is Nigeria’s largest urban economy, with a metro population often estimated above 20 million. It combines ports, finance, music, film, startups, informal trade and manufacturing, but its growth is constrained by congestion, housing shortages, power supply problems and infrastructure pressure.",
  "Nairobi": "Nairobi is Kenya’s capital and East Africa’s main business hub, with a metro population of several million. It is important for mobile money, startups, logistics, NGOs, finance, regional headquarters and access to East African markets, making it a services platform for the wider region.",
  "Mexico City": "Mexico City is one of the largest urban areas in the Americas, with more than 20 million people in the metro region. It concentrates Mexican government, finance, media, universities and corporate strategy, while connecting the country’s domestic market to North American manufacturing and nearshoring decisions.",
  "Madrid": "Madrid is Spain’s capital and largest metropolitan economy, with more than 6 million people in the region. It concentrates government, banks, transport links, corporate headquarters, universities and services, making it Spain’s political and business command center.",
  "Berlin": "Berlin is Germany’s capital and a city of nearly 4 million people. It combines government, startups, universities, creative industries and industrial-policy debates, making it important less as a factory city than as the political and innovation center of Europe’s largest economy.",
  "Amsterdam": "Amsterdam is a compact city with a large regional economy built around trade, finance, technology, tourism and Schiphol airport. Its importance comes from Dutch logistics, legal and business services, digital infrastructure and proximity to the Port of Rotterdam.",
  "Istanbul": "Istanbul has more than 15 million residents and sits between Europe and Asia. It is Turkey’s commercial, logistics, industrial, tourism and financial center, controlling a strategic position near the Bosporus and linking Black Sea, Mediterranean, European and Middle Eastern networks.",
  "Jakarta": "Jakarta is Indonesia’s largest urban economy and the core of a metro region of more than 30 million people. It concentrates finance, government, consumer markets, logistics and corporate headquarters, but faces congestion, flooding, pollution and the long-term relocation of Indonesia’s capital functions.",
  "Bangkok": "Bangkok is Thailand’s capital and main economic hub, with a metro population above 10 million. It combines tourism, finance, manufacturing services, retail, transport and government, making it central to Thailand’s economy and to mainland Southeast Asian connectivity.",
  "Ho Chi Minh City": "Ho Chi Minh City is Vietnam’s largest business hub, with roughly 9 million residents and a much larger economic region around it. It drives exports, finance, startups, consumer markets and foreign investment, especially as Vietnam becomes a key China+1 manufacturing destination.",
  "Kuala Lumpur": "Kuala Lumpur is Malaysia’s main metropolitan economy and financial center. It links banking, government-linked companies, electronics, services, infrastructure and regional headquarters, while the wider Klang Valley connects the city to ports, airports and manufacturing corridors.",
  "Manila": "Metro Manila is a dense urban region of more than 13 million people and the political, financial and services center of the Philippines. It is important for business-process outsourcing, remittances, retail, media and government, but suffers from congestion and infrastructure strain.",
  "Dhaka": "Dhaka is one of the world’s fastest-growing megacities, with a metro population above 20 million. It is the center of Bangladesh’s garment industry, politics, finance and migration flows, showing both the job-creating power and urban pressure of export-led development.",
  "Karachi": "Karachi is Pakistan’s largest city and main port, with a population often estimated above 15 million. It concentrates finance, manufacturing, trade, logistics and media, making it Pakistan’s commercial engine despite security, infrastructure and governance challenges.",
  "Cairo": "Cairo is Egypt’s capital and the largest urban area in the Arab world, with more than 20 million people in the metro region. It concentrates government, media, universities, construction, services and consumption, while sitting near the Nile and the Suez-linked economy.",
  "Cape Town": "Cape Town is South Africa’s legislative capital and a major tourism, port, services and technology city. Its importance comes from the Atlantic location, wine and tourism economy, universities, creative industries and role as a gateway to southern African markets.",
  "Casablanca": "Casablanca is Morocco’s largest city and main business hub, with several million people in its urban region. It concentrates banks, ports, industry, services and corporate headquarters, linking Morocco’s Atlantic trade, European proximity and manufacturing strategy.",
  "Santiago": "Santiago is Chile’s capital and dominant metro economy, with more than 7 million people in the region. It concentrates government, banks, mining headquarters, universities and services, making it the command center of a copper-rich, trade-oriented economy.",
  "Buenos Aires": "Buenos Aires is Argentina’s capital and one of Latin America’s major cultural and economic centers, with more than 15 million people in the metro area. It concentrates government, finance, media, services, universities and the politics of Argentina’s repeated currency and inflation crises.",
  "Bogotá": "Bogotá is Colombia’s capital and largest economic center, with around 8 million residents in the city. It concentrates government, finance, education, services, startups and corporate headquarters, linking Colombia’s Andean interior to national politics and global investment.",
  "Doha": "Doha is Qatar’s capital and a fast-growing Gulf city of finance, diplomacy, aviation, gas wealth and major events. Its importance comes from LNG revenue, sovereign wealth, Qatar Airways, education hubs and the state’s effort to convert energy wealth into global influence.",
  "Tehran": "Tehran is Iran’s capital and largest urban economy, with a metro population above 15 million. It concentrates government, finance, universities, industry and sanctions management, making it the center of a large economy operating under heavy geopolitical constraints.",
  "Warsaw": "Warsaw is Poland’s capital and fastest-growing major business hub, with nearly 2 million residents and a large metro region. It concentrates finance, government, technology, services and logistics, reflecting Poland’s rise as a central European growth and security hub.",
  "Vienna": "Vienna is Austria’s capital and a wealthy Central European services city of nearly 2 million residents. It is important for diplomacy, finance, tourism, universities, public transport and regional headquarters connecting Western Europe with Central and Eastern Europe.",
  "Copenhagen": "Copenhagen is Denmark’s capital and a Nordic hub for green urban planning, shipping, life sciences, design and high-income services. Its importance comes from clean infrastructure, human capital, the Øresund link with Sweden and strong institutions.",
  "Helsinki": "Helsinki is Finland’s capital and the center of its technology, education, design, government and services economy. It is small by global-city standards but important for digital governance, Nordic innovation, Baltic connectivity and security politics near Russia.",
  "Auckland": "Auckland is New Zealand’s largest city and main international gateway, with about a third of the country’s population in its wider region. It concentrates finance, ports, airports, universities, migration, tourism and Pacific-facing services.",
  "Accra": "Accra is Ghana’s capital and main services hub, with a fast-growing metropolitan region. It concentrates government, finance, technology, education, media and access to the Gulf of Guinea, making it one of West Africa’s most important business nodes.",
  "Sydney": "Sydney is Australia’s largest city and a major Pacific business hub. Its importance comes from finance, universities, tourism, technology, real estate, media and its harbour connections, making it a gateway between Australia and Asian-Pacific markets.",
  "Miami": "Miami is a major gateway between the United States, Latin America and the Caribbean. It combines tourism, finance, real estate, logistics, aviation and port activity, while also facing climate risks from hurricanes, heat and sea-level rise.",
  "Rio de Janeiro": "Rio de Janeiro is one of Brazil’s most globally recognized cities, with a major role in tourism, culture, energy services and the offshore oil economy. It also shows the contrast between global visibility, natural assets, inequality and urban infrastructure pressure.",
  "Chongqing": "Chongqing is one of inland China’s largest megacities and a major industrial and logistics center on the Yangtze River. It matters because it connects western China to national manufacturing chains, river transport, car production, electronics and inland development policy.",
  "Osaka": "Osaka is the core city of Japan’s Kansai region and a major center for industry, commerce, services and innovation. It links manufacturing, ports, universities, consumer markets and regional transport in one of Japan’s most important urban economies.",
  "Los Angeles": "Los Angeles is a global city built around entertainment, technology, trade, universities, aerospace, immigration and the Pacific economy. Its ports, airports and creative industries connect the United States to Asia and Latin America, while housing, congestion and inequality remain major pressures.",
  "Moscow": "Moscow is Russia’s political, financial and corporate command center. It concentrates government power, banks, headquarters, universities, transport networks and high-income services, making it central to Russia’s economy even when sanctions and war reshape the country’s external links.",
  "Milan": "Milan is Italy’s main financial, fashion, design and business city. It links banks, luxury brands, industrial firms, universities, trade fairs and northern Italy’s manufacturing base, making it one of Europe’s most important non-capital economic centers.",
  "Tel Aviv": "Tel Aviv is Israel’s main technology, startup, finance and innovation hub. It concentrates venture capital, cybersecurity firms, software companies, universities and global business links, giving Israel a strong role in the digital economy despite regional security risks.",
  "Jerusalem": "Jerusalem is a political, religious and diplomatic center with importance far beyond its economic size. It concentrates government institutions, tourism, education and symbolic power, while also sitting at the heart of one of the world’s most sensitive geopolitical conflicts.",
  "Toronto": "Toronto is Canada’s largest city and its main finance, immigration, services and technology hub. It concentrates banks, universities, corporate headquarters, cultural industries and a diverse labor market, making it central to Canada’s domestic economy and global connections.",
};

const portDescriptions = {
  "Shanghai Port": "Shanghai Port is the world’s largest container port and the maritime outlet of the Yangtze River Delta, one of the densest manufacturing regions on earth. Its scale comes from deep links to factories, inland river logistics, rail, warehouses and China’s export machine.",
  "Singapore Port": "Singapore Port is one of the world’s busiest transshipment hubs, handling cargo that often passes through Singapore rather than ending there. Its strength comes from location near the Strait of Malacca, fast operations, bunkering, logistics services and trusted maritime infrastructure.",
  "Rotterdam": "Rotterdam is Europe’s largest seaport and the main ocean gateway for the Rhine industrial corridor. It links containers, energy, chemicals, pipelines, barges, rail and warehouses to Germany and the wider European market.",
  "Los Angeles/Long Beach": "Los Angeles/Long Beach is the largest container gateway in the United States, especially for goods arriving from Asia. It matters because port congestion here can affect retailers, warehouses, rail networks and consumer prices across the American economy.",
  "Jebel Ali": "Jebel Ali is Dubai’s flagship port and one of the Middle East’s most important logistics platforms. Combined with free zones, warehousing and air links, it turns Dubai into a re-export hub between Asia, Africa, Europe and the Gulf.",
  "Hamburg": "Hamburg is Germany’s main maritime gateway and a major container port on the Elbe River. It connects German machinery, vehicles, chemicals and high-value exports to global markets, while depending heavily on rail, inland waterways and access to the North Sea.",
  "Busan": "Busan is South Korea’s main port and one of Asia’s busiest container hubs. It supports Korea’s export economy by moving cars, electronics, machinery and shipbuilding-related cargo through dense links with Northeast Asian trade routes.",
  "Shenzhen/Yantian": "Shenzhen/Yantian is a crucial export port for the Pearl River Delta, one of the world’s strongest electronics and manufacturing clusters. It moves hardware, consumer electronics, e-commerce goods and components from southern China to global markets.",
  "Santos": "Santos is Brazil’s most important port and a major outlet for soy, sugar, coffee, meat and container cargo. It links the agricultural and industrial interior of Brazil to global demand, especially through road and rail corridors into São Paulo state.",
  "Durban": "Durban is South Africa’s busiest port and a key gateway for southern African trade. It handles containers, vehicles and regional cargo, but its performance depends on rail reliability, port reform, power supply and corridor links into the interior.",
  "Suez/Port Said": "Suez/Port Said sits at the northern entrance of the Suez Canal, one of the world’s most important shipping shortcuts. It matters because Asia-Europe trade, oil products and container flows can be delayed or rerouted when security, fees or canal capacity are disrupted.",
  "Panama Canal": "The Panama Canal is an inter-oceanic passage linking the Atlantic and Pacific. Its importance comes from saving ships the long journey around South America, but drought and water levels can directly reduce capacity and raise shipping costs.",
  "Mumbai/JNPT": "Mumbai/JNPT is India’s main west-coast container gateway, serving the Mumbai-Pune industrial region and western India’s consumer market. It is central to India’s export ambitions, freight-corridor projects and energy and manufacturing supply chains.",
  "Piraeus": "Piraeus is Greece’s largest port and a major Mediterranean gateway near Athens. It links container shipping, tourism, ferries and Balkan rail corridors, while also showing how port ownership and infrastructure can carry geopolitical influence.",
  "Antwerp-Bruges": "Antwerp-Bruges is one of Europe’s largest port complexes and a major chemicals, logistics and container hub. Its importance comes from petrochemicals, inland connections, customs systems and access to the Belgian, Dutch, French and German industrial markets.",
  "Hong Kong": "Hong Kong remains an important Asian container, finance and logistics gateway even after losing some port traffic to mainland competitors. Its value comes from legal services, air cargo, finance, re-export networks and proximity to the Pearl River Delta.",
  "Ningbo-Zhoushan": "Ningbo-Zhoushan is one of the world’s largest port complexes by cargo tonnage and containers. It serves the Yangtze River Delta and handles containers, oil, iron ore and bulk commodities, making it a key pillar of China’s trade system.",
  "Qingdao": "Qingdao is a major port in northern China, serving Shandong’s manufacturing, agriculture and petrochemical base. It handles containers, bulk goods, cold-chain cargo and energy flows, linking North China industry to Northeast Asian and global markets.",
  "Tianjin": "Tianjin is the main maritime gateway for Beijing and the wider Bohai economic region. It handles containers, vehicles, bulk cargo and industrial inputs, connecting northern China’s heavy industry and consumer markets to global shipping.",
  "Kaohsiung": "Kaohsiung is Taiwan’s largest port and a key outlet for the island’s electronics, petrochemicals, machinery and container trade. Its importance is tied to Taiwan’s export economy and to the strategic vulnerability of trade around the Taiwan Strait.",
  "Tanjung Pelepas": "Tanjung Pelepas is a Malaysian transshipment port near the Strait of Malacca and Singapore. It competes by offering large-scale container handling, strategic location and fast links to global shipping networks.",
  "Port Klang": "Port Klang is Malaysia’s main container port and the maritime gateway for the Klang Valley around Kuala Lumpur. It handles consumer goods, electronics, palm oil-related cargo and industrial inputs for Malaysia’s central economic corridor.",
  "Laem Chabang": "Laem Chabang is Thailand’s main deep-sea port and a key outlet for the Eastern Economic Corridor. It supports car exports, electronics, industrial goods and container flows from Thailand’s manufacturing base.",
  "Ho Chi Minh/Cat Lai": "Ho Chi Minh/Cat Lai is Vietnam’s busiest container gateway, serving the country’s southern manufacturing and consumer economy. It is especially important as Vietnam grows as an export platform for textiles, electronics, furniture and consumer goods.",
  "Manila Port": "Manila Port is the main maritime gateway for the Philippines’ largest consumer and business region. It handles containers, food, fuel and industrial goods, but congestion and urban density make port efficiency a constant challenge.",
  "Colombo": "Colombo is a major Indian Ocean transshipment hub, positioned near the main East-West shipping lane. It serves Sri Lanka and transfers containers between large ocean vessels and regional routes to India, the Middle East and Southeast Asia.",
  "Mundra": "Mundra is India’s largest private port and a major gateway for containers, coal, crude, agricultural goods and industrial cargo. Its scale and private logistics ecosystem make it central to western India’s trade and infrastructure model.",
  "Chittagong": "Chittagong is Bangladesh’s main seaport and the essential gateway for the country’s garment export economy. It handles most of Bangladesh’s seaborne trade, linking factories around Dhaka and Chittagong to global apparel buyers.",
  "Alexandria": "Alexandria is Egypt’s historic Mediterranean port and a major gateway for food, containers and industrial cargo. It serves Egypt’s large consumer market and connects the Nile Delta economy to Mediterranean shipping.",
  "Tanger Med": "Tanger Med is Morocco’s flagship port complex near the Strait of Gibraltar. It connects African, European and Atlantic routes and supports Morocco’s car, aerospace, textile and logistics industries through nearby industrial zones.",
  "Lagos/Apapa": "Lagos/Apapa is Nigeria’s main container gateway and one of West Africa’s most important ports. It serves Africa’s largest population and consumer market, but congestion, customs delays and road access often shape its economic impact.",
  "Mombasa": "Mombasa is Kenya’s main port and the gateway to East Africa’s Northern Corridor. It serves Kenya, Uganda, Rwanda, South Sudan and parts of the Great Lakes region through road, rail and logistics networks.",
  "Tema": "Tema is Ghana’s main seaport and a key Gulf of Guinea logistics hub. It handles containers, cocoa-related trade, fuel, machinery and consumer goods, linking Ghana’s growing services and industrial economy to global markets.",
  "Le Havre": "Le Havre is France’s main Atlantic container port and a gateway to the Paris region through the Seine corridor. It handles containers, energy products and industrial goods, connecting French consumption and production to ocean shipping.",
  "Valencia": "Valencia is Spain’s leading Mediterranean container port and a major gateway for Iberian trade. It serves consumer goods, food exports, automotive supply chains and shipping routes linking Europe with North Africa and the wider Mediterranean.",
  "Gioia Tauro": "Gioia Tauro is Italy’s main transshipment port in the central Mediterranean. Its location allows containers to be transferred between large ocean vessels and regional services, though its wider impact depends on inland links and southern Italian development.",
  "Algeciras": "Algeciras sits near the Strait of Gibraltar, one of the world’s busiest maritime passages. It is important for container transshipment, ferries, fuel, and trade between Europe, North Africa, the Atlantic and the Mediterranean.",
  "Felixstowe": "Felixstowe is the United Kingdom’s largest container port and a key gateway for British consumer and industrial imports. It links North Sea shipping routes to warehouses, rail terminals and distribution networks across the UK.",
  "Vancouver": "Vancouver is Canada’s largest port and its main Pacific gateway. It handles grain, potash, coal, containers and forest products, linking Canadian resources and Asian markets through rail corridors across the country.",
  "New York/New Jersey": "The Port of New York and New Jersey is the largest container gateway on the U.S. East Coast. It serves the dense Northeast consumer market through terminals, warehouses, rail links and trucking networks around one of the world’s biggest metro economies."
};

function atlas(id){
  return `<div class="atlas-wrap atlas-wrap-stacked">
    <div class="globe-panel"><div class="globe-toolbar"><div class="hint">Drag · scroll to zoom</div></div><svg id="globe-${id}" class="globe-svg"></svg></div>
    <section class="atlas-info-below">
      <div class="layer-controls">
        <h4>Layers</h4>
        <div class="layer-toggle-grid">${toggle('cities','Cities')}${toggle('ports','Ports')}</div>
      </div>
      <div id="country-pop-${id}" class="country-pop country-pop-wide">${itemPanel(state.selectedItem)}</div>
    </section>
  </div>`;
}
function toggle(key,label){return `<div class="toggle-row"><span>${label}</span><button class="switch ${state.layer[key]?'on':''}" onclick="state.layer.${key}=!state.layer.${key}; render()"></button></div>`}
function itemPanel(item){
  if(!item) return countryPanel(state.currentCountry || countryByName.Brazil,'discover');
  const isPort = item.type === 'port';
  const visualKind = isPort ? 'port' : 'city';
  const profile = getEntityProfile(item);
  const subtitle = isPort ? (profile?.tag || 'Port / logistics node') : (profile?.tag || 'City / economic node');
  const description = isPort
    ? (portDescriptions[item.name] || `${item.name} is an important maritime node for cargo, customs, storage and inland logistics. Its role depends on terminal capacity, hinterland links, shipping routes and the industries or consumer markets it serves.`)
    : (cityDescriptions[item.name] || `${item.name} is an important city where people, firms, infrastructure and institutions concentrate. Its role comes from how it connects local activity to national and global markets.`);
  const typeLabel = isPort ? 'Port profile' : 'City profile';
  const whyLabel = isPort ? 'Why this port matters' : 'Why this city matters';
  return `${infoImage(visualKind,item.name,subtitle)}<h3>${item.name}</h3><p>${subtitle}</p><div class="info-list entity-clean-panel"><b>${typeLabel}</b><span>${description}</span><b>${whyLabel}</b><span>${isPort ? 'Ports shape trade costs, delivery times and supply-chain resilience because they connect ships to inland economies.' : 'Cities concentrate jobs, capital, infrastructure, institutions and ideas, so they often reveal how an economy actually works on the ground.'}</span></div>`;
}
function countryPanel(c,context='search'){
  if(!c) return `<h3>World Atlas</h3><p>Click a country, city or port to inspect it.</p>`;
  const angle = `${c.name} is shaped by ${c.model.toLowerCase()}, with ${c.exports} linking it to global demand.`;
  const power = `${c.strength} is its main source of leverage; ${c.vulnerability.toLowerCase()} is the constraint that can weaken it.`;
  const buttons = context==='discover'
    ? `<div class="country-actions"><button class="pill-btn" onclick="openCountrySearch(${jsString(c.name)})">Open in Search ↗</button><button class="dark-btn" onclick="viewCountryStories(${jsString(c.name)})">Related stories →</button></div>`
    : `<div class="country-actions"><button class="dark-btn" onclick="viewCountryStories(${jsString(c.name)})">View related stories →</button><button class="pill-btn" onclick="openCountryDiscover(${jsString(c.name)})">Open on Discover globe ↗</button></div>`;
  return `${infoImage('country',c.name,c.region)}<h3>${c.name}</h3><p>${c.region} · ${c.pop} · ${c.currency}</p><p>${c.model}. Main exports: ${c.exports}.</p><div class="metric-grid"><div class="metric-mini"><span>GDP</span><b>${c.gdp}</b></div><div class="metric-mini"><span>GDP / cap</span><b>${c.gdppc}</b></div><div class="metric-mini"><span>Energy dependence</span><b>${c.energy}</b></div><div class="metric-mini"><span>Key risk</span><b>${c.risk}</b></div></div><div class="info-list"><b>Economic model</b><span>${angle}</span><b>Strengths</b><span>${power}</span><b>Vulnerabilities</b><span>${c.name}'s key pressure point is ${c.vulnerability.toLowerCase()}, especially if ${c.risk.toLowerCase()} becomes more severe.</span></div>${buttons}`;
}

function openCountrySearch(name){
  state.countryQuery = name;
  navigate('search',{country:name});
}
function openCountryDiscover(name){
  navigate('discover',{country:name});
}
function viewCountryStories(name){
  navigate('stories',{storySearch:name});
}
function countrySearchMatches(q){
  const query = q.toLowerCase().trim();
  if(!query) return [];
  return uniqueCountries.filter(c=>c.name.toLowerCase().includes(query)).slice(0,8);
}
function handleCountrySearch(input){
  state.countryQuery = input.value;
  const results = document.getElementById('country-search-results');
  if(results) results.innerHTML = countrySearchResultsHTML();
}
function countrySearchResultsHTML(){
  const q = state.countryQuery.trim();
  const matches = countrySearchMatches(q);
  if(!q) return `<div class="empty-state"><h3>Search a country</h3><p>Type the name of a country from the WorldPulse atlas to open its profile.</p></div>`;
  if(!matches.length) return `<div class="empty-state"><h3>No country found</h3><p>Try another spelling or search a country already included in the atlas.</p></div>`;
  const exact = matches.find(c=>c.name.toLowerCase()===q.toLowerCase()) || matches[0];
  state.currentCountry = exact;
  return `<div class="country-search-layout"><section class="panel country-search-panel">${countryPanel(exact,'search')}</section><aside class="panel country-suggestions"><h3>Matching countries</h3>${matches.map(c=>`<button class="suggestion-row ${c.name===exact.name?'active':''}" onclick="state.countryQuery=${jsString(c.name)}; render()">${flag(c.name)} ${c.name}</button>`).join('')}</aside></div>`;
}
function searchPage(){
  return layout(`<div class="section-kicker">Search</div><h2 class="page-title">Find a country</h2><p class="page-sub">Search the ${uniqueCountries.length} countries currently available in the WorldPulse atlas. Each result uses the same country profile as Discover.</p><input id="country-search" class="search" placeholder="Search a country — e.g. Brazil, Singapore, Argentina" value="${escapeXml(state.countryQuery)}" oninput="handleCountrySearch(this)" autocomplete="off" /><div id="country-search-results">${countrySearchResultsHTML()}</div>`);
}


function filteredStories(){
  const q = state.search.toLowerCase().trim();
  return stories.filter(s=>(state.category==='All'||s.category===state.category) && [s.title,s.place,s.category,s.description,(s.countries||[]).join(' ')].join(' ').toLowerCase().includes(q));
}
function storyResultsHTML(){
  const filtered = filteredStories();
  const empty = `<div class="empty-state"><h3>No stories found</h3><p>Try another country, region or topic.</p></div>`;
  return filtered.length ? filtered.map(storyCard).join('') : empty;
}
function handleStorySearch(input){
  state.search = input.value;
  const grid = document.getElementById('story-results');
  if(grid) grid.innerHTML = storyResultsHTML();
}
function setStoryCategory(cat){
  state.category = cat;
  render();
  setTimeout(()=>{
    const input = document.getElementById('story-search');
    if(input){ input.focus(); input.setSelectionRange(input.value.length,input.value.length); }
  },0);
}
function storiesPage(){
  return layout(`
    <div class="section-kicker">Stories</div><h2 class="page-title">Country deep dives</h2><p class="page-sub">Long-form explainers — but never long-winded. Read each story in 3 layers: quick, medium or deep.</p>
    <input id="story-search" class="search" placeholder="Search by country, region or topic — e.g. Singapore, Africa, energy" value="${state.search}" oninput="handleStorySearch(this)" autocomplete="off" />
    <div class="chips">${categories.map(c=>`<button class="chip ${state.category===c?'active':''}" onclick="setStoryCategory('${c}')">${c}</button>`).join('')}</div>
    <div id="story-results" class="story-grid">${storyResultsHTML()}</div>
  `);
}
function storyCard(s){
  return `<button class="story-card ${s.coming?'locked':''}" ${s.coming?'':'onclick="navigate(\'story\',{story:\''+s.id+'\'})"'}><div class="story-top"><span class="story-icon">${s.icon}</span><span class="tag ${s.category}">${s.category}</span>${s.coming?'<span class="lock">▢</span>':''}</div><h3>${s.title}</h3><div class="story-place">${s.place}</div><p class="story-desc">${s.description}</p><div class="story-bottom"><span>◷ 3 layers</span><span class="read-link">${s.coming?'Locked':'Read →'}</span></div></button>`;
}

function storyPage(){
  const s = stories.find(x=>x.id===state.story) || stories[0];
  const txt = storyText(s,state.storyLayer);
  const time = estimateMinutes(txt,state.storyLayer,s.id);
  return layout(`<div class="story-detail"><button class="pill-btn" onclick="navigate('stories')">← Back to stories</button><div class="story-hero"><div class="story-top"><span class="story-icon">${s.icon}</span><span class="tag ${s.category}">${s.category}</span></div><div class="section-kicker">${s.place} · ${time}</div><h2>${s.title}</h2><p class="page-sub" style="margin-bottom:0">${s.description}</p></div><div class="layer-tabs">${['quick','medium','deep'].map(l=>`<button class="layer-tab ${state.storyLayer===l?'active':''}" onclick="state.storyLayer='${l}'; render()">${l==='quick'?'Quick Insight':l==='medium'?'Medium Story':'Deep Dive'} · ${estimateMinutes(storyText(s,l),l,s.id)}</button>`).join('')}</div><article class="article">${articleHTML(s,txt)}</article></div>`);
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
  const meta = v14StorySources[s.id];
  const sourceBlock = meta ? `<div class="source-note"><b>To go further:</b><ul>${meta.sources.map(src=>`<li>${src.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>')}</li>`).join('')}</ul><p class="ai-note">${meta.note}</p></div>` : '';

  function renderParagraphs(chunk){
    return chunk.split(/\n\n+/).map(p=>p.trim()).filter(Boolean).map(p=>`<p>${p.replace(/\n+/g,'<br>')}</p>`).join('');
  }

  const takeawayMatch = txt.match(/\n\nKey takeaway:[\s\S]*$/);
  const takeaway = takeawayMatch ? takeawayMatch[0].trim().replace(/^Key takeaway:/,'').trim() : '';
  const main = takeawayMatch ? txt.slice(0, takeawayMatch.index).trim() : txt.trim();
  const sectionRegex = /^\d{2}\s[—-]\s[^\n]+/gm;
  const matches = [...main.matchAll(sectionRegex)];

  let body = '';
  if(matches.length){
    const intro = main.slice(0, matches[0].index).trim();
    if(intro) body += renderParagraphs(intro);
    for(let i=0;i<matches.length;i++){
      const heading = matches[i][0];
      const contentStart = matches[i].index + heading.length;
      const contentEnd = i+1 < matches.length ? matches[i+1].index : main.length;
      const content = main.slice(contentStart, contentEnd).trim();
      body += `<section><h3>${heading}</h3>${renderParagraphs(content)}</section>`;
    }
  } else {
    body = renderParagraphs(main);
  }
  if(takeaway){
    body += `<div class="takeaway"><b>Key takeaway</b><p>${takeaway}</p></div>`;
  }
  return sourceBlock + body;
}

function compare(){
  const a=countryByName[state.compareA] || uniqueCountries[0], b=countryByName[state.compareB] || uniqueCountries[1] || uniqueCountries[0];
  const rows=[['GDP',a.gdp,b.gdp],['GDP per capita',a.gdppc,b.gdppc],['Population',a.pop,b.pop],['Currency',a.currency,b.currency],['Energy dependence',a.energy,b.energy],['Debt / risk lens',a.risk,b.risk],['Economic model',a.model,b.model],['Main exports',a.exports,b.exports]];
  return layout(`<div class="section-kicker">Compare</div><h2 class="page-title">Two countries, side by side</h2><p class="page-sub">A quick way to spot what makes economies different.</p><div class="compare-selectors"><div class="selector-card"><h3>${flag(a.name)} ${a.name}</h3>${selectCountry('compareA')}</div><div class="selector-card"><h3>${flag(b.name)} ${b.name}</h3>${selectCountry('compareB')}</div></div><div class="contrast"><b>Key contrast</b>${a.name} is shaped by ${a.model.toLowerCase()}, while ${b.name} is shaped by ${b.model.toLowerCase()}.</div><div class="compare-table">${rows.map(r=>`<div class="compare-row"><div class="left">${r[1]}</div><div class="label">${r[0]}</div><div class="right">${r[2]}</div></div>`).join('')}</div>`);
}
function selectCountry(key){const sorted=uniqueCountries;return `<select class="select" onchange="state.${key}=this.value; render()">${sorted.map(c=>`<option value="${escapeXml(c.name)}" ${state[key]===c.name?'selected':''}>${flag(c.name)} ${c.name}</option>`).join('')}</select>`}
function flag(name){const code=countryCodeForFlag(name); if(!code) return '🌐'; return code.toUpperCase().replace(/./g,ch=>String.fromCodePoint(127397+ch.charCodeAt(0)));}

function daily(){
  return layout(`<div class="section-kicker">▣ Daily Brief · updated every 48 hours</div><h2 class="page-title">5 things shaping the world today</h2><p class="page-sub"><b>Updated every 48 hours.</b> Each brief gives the minimum context you need: what happened, why it matters, what to watch, and related articles.</p><div class="daily-list">${dailyBrief.map((d,i)=>`<div class="daily-card"><div class="daily-top"><span class="daily-num">${String(i+1).padStart(2,'0')}</span><span class="tag ${d.cat}">${d.cat}</span><span class="story-place">${d.place}</span></div><h3>${d.title}</h3><div class="brief-sections"><div class="brief-section"><b>What happened</b><p>${d.h}</p></div><div class="brief-section"><b>Why it matters</b><p>${d.m}</p></div><div class="brief-section"><b>What to watch</b><p>${d.w}</p></div><div class="brief-section brief-links"><b>Related articles</b><p>${(d.links||[]).map(l=>`<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join(' · ')}</p></div></div></div>`).join('')}</div>`)
}
function learn(){return layout(`<div class="section-kicker">Learn</div><h2 class="page-title">10 modules to think like an economist</h2><p class="page-sub">Bite-sized lessons. Real examples. A short quiz later.</p><div class="module-grid">${modules.map(m=>`<button class="module-card"><span class="module-num">${m.num}</span><div class="module-icon">${m.icon}</div><h3>${m.title}</h3><p>${m.desc}</p><div class="progress-line"><span></span></div></button>`).join('')}</div>`)}


function render(){
  const app=document.getElementById('app');
  if(state.page==='home') app.innerHTML=home();
  if(state.page==='discover') app.innerHTML=discover();
  if(state.page==='search') app.innerHTML=searchPage();
  if(state.page==='stories') app.innerHTML=storiesPage();
  if(state.page==='story') app.innerHTML=storyPage();
  if(state.page==='compare') app.innerHTML=compare();
  if(state.page==='daily') app.innerHTML=daily();
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

function markerColor(t){return t==='port'?'#d97706':t==='finance'?'#2f855a':t==='story'?'#2563eb':t==='city'?'#2f855a':'#111827'}
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


// WorldPulse version 1.5 atlas fixes: normalize all city panels, images and added city nodes.
(function applyV15AtlasFixes(){
  Object.assign(cityTitleOverrides, {
    'Singapore':'Marina Bay, Singapore',
    'Sydney':'Sydney',
    'Miami':'Miami',
    'Rio de Janeiro':'Rio de Janeiro',
    'Chongqing':'Chongqing',
    'Osaka':'Osaka',
    'Los Angeles':'Los Angeles',
    'Moscow':'Moscow',
    'Milan':'Milan',
    'Tel Aviv':'Tel Aviv',
    'Jerusalem':'Jerusalem',
    'Toronto':'Toronto'
  });
  Object.assign(portTitleOverrides, {
    'Ho Chi Minh/Cat Lai':'Cát Lái Port',
    'Rotterdam':'Port of Rotterdam',
    'Antwerp-Bruges':'Port of Antwerp-Bruges',
    'Algeciras':'Port of Algeciras'
  });
  const addedCities = [
    ['Sydney','Pacific services and finance city',151.21,-33.87,'city'],
    ['Miami','Americas finance and logistics hub',-80.19,25.76,'city'],
    ['Rio de Janeiro','Brazil culture, energy and tourism city',-43.17,-22.91,'city'],
    ['Chongqing','Western China inland megacity',106.55,29.56,'city'],
    ['Osaka','Kansai industrial and services hub',135.5,34.69,'city'],
    ['Los Angeles','Pacific media and logistics megacity',-118.24,34.05,'city'],
    ['Moscow','Russian political and financial capital',37.62,55.76,'city'],
    ['Milan','Italian finance, fashion and industry hub',9.19,45.46,'city'],
    ['Tel Aviv','Israeli tech and finance hub',34.78,32.08,'city'],
    ['Jerusalem','political, religious and diplomatic center',35.21,31.77,'city'],
    ['Toronto','Canadian finance and immigration hub',-79.38,43.65,'city']
  ];
  const cityByNameLocal = new Map(cities.map(c=>[c.name,c]));
  addedCities.forEach(([name,desc,lon,lat,type])=>{
    if(!cityByNameLocal.has(name)) cities.push({name,desc,lon,lat,type});
  });
    Object.assign(cityDescriptions, {
    'Sydney':'Sydney is Australia’s largest city and one of the main financial, business and cultural centers of the Pacific. Its importance comes from banking, real estate, universities, tourism, a major harbor, technology services and its role as a gateway between Australia and Asian markets.',
    'Miami':'Miami is a major city linking the United States with Latin America and the Caribbean. It combines finance, tourism, real estate, logistics, media and airport connections, making it an important gateway for capital, people and trade across the Americas.',
    'Rio de Janeiro':'Rio de Janeiro is one of Brazil’s most famous cities and a major center for tourism, culture, energy services and offshore oil activity. Its economy is shaped by beaches, ports, universities, creative industries and links to Brazil’s oil and gas sector.',
    'Chongqing':'Chongqing is one of China’s largest inland megacities and a key industrial center in western China. It matters because it links manufacturing, cars, electronics, river transport and inland development policies along the Yangtze River corridor.',
    'Osaka':'Osaka is the core of Japan’s Kansai region and one of the country’s main business and industrial centers. It combines manufacturing, trade, services, universities, tourism and links to nearby Kyoto and Kobe, making it a major alternative economic pole to Tokyo.',
    'Los Angeles':'Los Angeles is a global city built around entertainment, technology, aerospace, trade, universities, tourism and the huge consumer economy of Southern California. Its port complex with Long Beach is one of the main gateways for goods entering the United States from Asia.',
    'Moscow':'Moscow is Russia’s political, financial and corporate capital. It concentrates federal power, banks, headquarters, universities, transport infrastructure and high-income consumption, making it the command center of the Russian economy despite sanctions and geopolitical isolation.',
    'Milan':'Milan is Italy’s main business, finance, fashion and design city. It connects banks, luxury brands, manufacturing, fairs, universities and northern Italian industry, making it one of Europe’s most important urban economies outside national capitals.',
    'Tel Aviv':'Tel Aviv is Israel’s main technology, finance and startup hub. It concentrates venture capital, software firms, cybersecurity companies, universities, beaches, culture and global business links, making it central to Israel’s innovation economy.',
    'Jerusalem':'Jerusalem is a political, religious and diplomatic center with global significance. Its economy combines government institutions, tourism, universities, services and technology activity, while its status also makes it one of the most sensitive cities in geopolitics.',
    'Toronto':'Toronto is Canada’s largest city and its main financial and business hub. It concentrates banks, immigration, universities, media, technology, real estate and corporate headquarters, making it one of North America’s most important service economies.'
  });
  Object.assign(cityProfiles, {
    'Sydney': {tag:'Pacific finance and services hub'},
    'Miami': {tag:'Americas gateway city'},
    'Rio de Janeiro': {tag:'Energy, tourism and culture city'},
    'Chongqing': {tag:'Western China inland megacity'},
    'Osaka': {tag:'Kansai industrial hub'},
    'Los Angeles': {tag:'Media, trade and technology megacity'},
    'Moscow': {tag:'Russian command center'},
    'Milan': {tag:'Finance, fashion and industry hub'},
    'Tel Aviv': {tag:'Startup and cybersecurity hub'},
    'Jerusalem': {tag:'Political and diplomatic center'},
    'Toronto': {tag:'Canadian finance and immigration hub'}
  });
})();

window.navigate=navigate;
render();


