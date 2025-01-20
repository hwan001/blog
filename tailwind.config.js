module.exports = {
  content: [
    "./content/**/*.md",
    "./content/**/*.html",
    "./layouts/**/*.html",
    "./assets/**/*.js",
    "./themes/digitalgarden/content/**/*.md",
    "./themes/digitalgarden/content/**/*.html",
    "./themes/digitalgarden/layouts/**/*.html",
    "./themes/digitalgarden/assets/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // 사용자 정의 클래스 추가
      resize: {
        x: 'horizontal', // 가로 방향 크기 조정 활성화
      },
      minWidth: {
        '300': '300px', // 최소 너비 설정
      },
      maxWidth: {
        '500': '500px', // 최대 너비 설정
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};