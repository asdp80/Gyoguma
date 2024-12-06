const initialState = {
  categoryProducts: {
    'all': [],
    '전공서적': [],
    '운동용품': [],
    '의약품': [],
    '생필품': [],
    '전자기기': []
  },
  currentCategory: 'all',
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  totalPages: 0,
  totalElements: 0
};

export default initialState;