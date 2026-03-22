export const postListData = [
  {
    id: 1, // 🔥 문자열 → 숫자
    title: '데이터 분석 프로젝트 구합니다!',
    content: '저는 완전 기초인데 혹시 같이 프로젝트 만드실분 계신가요?!',
    category: { id: 1, name: '구인/협업' },
    author: {
      id: 1, // 🔥 이것도 숫자
      name: '조조야',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    },
    likes: 156,
    comments: 6,
    views: 60,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: 'https://via.placeholder.com/228x163?text=Data+Analysis',
  },
  {
    id: 2,
    title: '러닝 메이트 함께해요.',
    content:
      'https://www.codeit.kr/costudy/join/684e26b75155062e46211e77함께 열공해요~',
    category: { id: 1, name: '구인/협업' },
    author: {
      id: 2,
      name: '김태산',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    },
    likes: 2,
    comments: 2,
    views: 60,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: 'https://via.placeholder.com/228x163?text=Running',
  },
  {
    id: 3,
    title: '월요일 파이팅...',
    content:
      'https://www.codeit.kr/costudy/join/684e26b75155062e46211e77함께 열공해요~',
    category: { id: 2, name: '자유게시판' },
    author: {
      id: 3,
      name: 'HIG',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    },
    likes: 2,
    comments: 2,
    views: 60,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: null,
  },
  {
    id: 4,
    title: '리액트 초보자입니다.',
    content: '리액트를 배우고 싶은데 어디서부터 시작해야 할까요?',
    category: { id: 3, name: '공지사항' },
    author: {
      id: 4,
      name: '박준호',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
    },
    likes: 45,
    comments: 12,
    views: 230,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: null,
  },
  {
    id: 5,
    title: '타입스크립트 스터디 모집',
    content: '타입스크립트를 함께 배울 분을 모집합니다.',
    category: { id: 1, name: '구인/협업' },
    author: {
      id: 5,
      name: '이수진',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5',
    },
    likes: 78,
    comments: 8,
    views: 145,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    imageUrl: null,
  },
]
