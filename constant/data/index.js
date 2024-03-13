const articles = [
  {
    id: 3475241,
    bin_id: 'BIN320124',
    name: 'article name 1',
    outlet: 'outlet name 1',
    quantity: 10,
    selected: false,
  },
  {
    id: 3475242,
    bin_id: 'BIN320125',
    name: 'article name 2',
    outlet: 'outlet name 2',
    quantity: 5,
    selected: false,
  },
  {
    id: 3475243,
    bin_id: 'BIN320126',
    name: 'article name 3',
    outlet: 'outlet name 3',
    quantity: 15,
    selected: false,
  },
  {
    id: 3475244,
    bin_id: 'BIN320127',
    name: 'article name 4',
    outlet: 'outlet name 4',
    quantity: 12,
    selected: false,
  },
  {
    id: 3475245,
    bin_id: 'BIN320128',
    name: 'article name 5',
    outlet: 'outlet name 5',
    quantity: 20,
    selected: false,
  },
];

const stoList = [
  {
    id: 8000000023,
    sku: 10,
    outlet: 'outlet name 1',
    status: 'picked',
  },
  {
    id: 8000000024,
    sku: 15,
    outlet: 'outlet name 2',
    status: 'picked',
  },
  {
    id: 8000000025,
    sku: 20,
    outlet: 'outlet name 3',
    status: 'loading',
  },
  {
    id: 8000000026,
    sku: 18,
    outlet: 'outlet name 4',
    status: 'loading',
  },
  {
    id: 8000000027,
    sku: 25,
    outlet: 'outlet name 5',
    status: 'loading',
  },
];

const poList = [
  {
    id: 3000000009,
    sku: 10,
  },
  {
    id: 3000000010,
    sku: 12,
  },
  {
    id: 3000000011,
    sku: 15,
  },
  {
    id: 3000000012,
    sku: 17,
  },
  {
    id: 3000000013,
    sku: 20,
  },
  {
    id: 3000000017,
    sku: 32,
  },
];

const dnList = [
  {

    id: 9066573,
    outlet: 'outlet 1',
    packed_quantity: 8,
    order_quantity: 8,
  },
  {
    id: 9066574,
    outlet: 'outlet 2',
    packed_quantity: 10,
    order_quantity: 12,
  },
  {
    id: 9066575,
    outlet: 'outlet 3',
    packed_quantity: 15,
    order_quantity: 14,
  },
  {
    id: 9066576,
    outlet: 'outlet 4',
    packed_quantity: 12,
    order_quantity: 15,
  },
  {
    id: 9066577,
    outlet: 'outlet 5',
    packed_quantity: 15,
    order_quantity: 13,
  },
];

export { articles, dnList, poList, stoList };

