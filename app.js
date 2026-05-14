const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const chips = document.querySelectorAll('.chip');
const storyCards = document.querySelectorAll('.story-card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    storyCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

const atlasData = {
  'Singapore': {
    title: 'Singapore',
    text: 'A compact city-state whose global importance comes from ports, finance, trade routes, governance, and its position between major Asian markets.',
    lens: 'Trade and strategic geography',
    stories: 'Chokepoints, ports, supply chains',
    matters: 'Small territory, oversized global role'
  },
  'Rotterdam': {
    title: 'Rotterdam',
    text: 'Europe’s logistics gateway, linking maritime trade, inland waterways, energy infrastructure, and industrial supply chains.',
    lens: 'Ports and European integration',
    stories: 'Energy flows, container trade, infrastructure',
    matters: 'A port can structure an entire continental economy'
  },
  'Lagos': {
    title: 'Lagos',
    text: 'A fast-growing megacity where demographics, informality, finance, congestion, and entrepreneurship meet.',
    lens: 'Urban development',
    stories: 'Megacities, inequality, informal economy',
    matters: 'Nigeria’s future is partly decided through its urban systems'
  },
  'Suez Canal': {
    title: 'Suez Canal',
    text: 'One of the world’s most important maritime shortcuts, central to Europe-Asia trade and Egypt’s strategic position.',
    lens: 'Chokepoints and trade dependence',
    stories: 'Global shipping, Red Sea, energy routes',
    matters: 'A narrow passage can influence global prices and delivery times'
  },
  'São Paulo': {
    title: 'São Paulo',
    text: 'Brazil’s economic engine, concentrating finance, industry, services, innovation, inequality, and national political influence.',
    lens: 'Industrial and financial geography',
    stories: 'Brazil, urban economies, development',
    matters: 'A city can act as the command center of a national economy'
  }
};

const atlasPanel = document.getElementById('atlasPanel');
document.querySelectorAll('.map-point').forEach(point => {
  point.addEventListener('click', () => {
    const item = atlasData[point.dataset.panel];
    if (!item) return;
    atlasPanel.innerHTML = `
      <span class="tag atlas-tag">Selected location</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <ul>
        <li><strong>Lens:</strong> ${item.lens}</li>
        <li><strong>Connected stories:</strong> ${item.stories}</li>
        <li><strong>Why it matters:</strong> ${item.matters}</li>
      </ul>
    `;
  });
});

const comparisonOutput = document.getElementById('comparisonOutput');
const countryA = document.getElementById('countryA');
const countryB = document.getElementById('countryB');
const compareNotes = {
  'Brazil-Nigeria': 'Brazil has a larger industrial and agricultural base, while Nigeria has major demographic and energy potential. The key contrast is institutional depth versus long-term market expansion.',
  'Brazil-Egypt': 'Brazil is a continental commodity and industrial power, while Egypt is defined by its demographic weight, Suez position, and strategic role between Africa and the Middle East.',
  'India-Morocco': 'India offers continental scale and a massive internal market, while Morocco has stronger proximity to Europe and a focused manufacturing/export strategy.',
  'Egypt-Morocco': 'Egypt has greater demographic and geostrategic weight, while Morocco often benefits from stronger export positioning toward Europe and automotive/aerospace value chains.',
  'India-Nigeria': 'Both countries have demographic scale, but India has deeper industrial and technological capacity while Nigeria remains heavily shaped by oil, infrastructure gaps, and urban growth.'
};
function updateComparison() {
  const a = countryA.value;
  const b = countryB.value;
  const key = `${a}-${b}`;
  const reverse = `${b}-${a}`;
  const note = compareNotes[key] || compareNotes[reverse] || `${a} and ${b} should be compared through scale, institutions, infrastructure, export structure, demographics, and strategic geography.`;
  comparisonOutput.innerHTML = `<h3>${a} vs ${b}</h3><p>${note}</p>`;
}
countryA?.addEventListener('change', updateComparison);
countryB?.addEventListener('change', updateComparison);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
