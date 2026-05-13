const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function exportToBitrixCsv(products) {
  const csvWriter = createCsvWriter({
    path: 'bitrix_import.csv',
    header: [
      {id: 'id', title: 'ID'},
      {id: 'slug', title: 'SLUG'},
      {id: 'title_short', title: 'TITLE_SHORT'},
      {id: 'title_full', title: 'TITLE_FULL'},
      {id: 'description', title: 'DESCRIPTION'},
      {id: 'price_rub', title: 'PRICE_RUB'},
      {id: 'category_id', title: 'CATEGORY_ID'},
      {id: 'main_image', title: 'MAIN_IMAGE'},
      // Детали для Bitrix
      {id: 'characteristics', title: 'CHARACTERISTICS'},
      {id: 'advantages', title: 'ADVANTAGES'},
      {id: 'installation', title: 'INSTALLATION'},
    ]
  });

  const records = products.map(product => ({
    ...product,
    characteristics: extractCharacteristics(product),
    advantages: extractAdvantages(product),
    installation: extractInstallation(product)
  }));

  await csvWriter.writeRecords(records);
}

function extractCharacteristics(product) {
  if (!product.tabs) return '';
  const tab = product.tabs.find(t => t.content.characteristics);
  return tab ? tab.content.characteristics
    .map(c => `${c.label}: ${c.value}`)
    .join('; ') : '';
}

function extractAdvantages(product) {
  if (!product.tabs) return '';
  const tab = product.tabs.find(t => t.content.advantages);
  return tab ? tab.content.advantages
    .filter(a => !a.startsWith('Недостатки'))
    .join(' | ') : '';
}