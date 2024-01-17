module.exports = {
  types: [
    { value: '✨ feat ', name: '✨ feat:\t새로운 기능 추가' },
    { value: '🔨 fix ', name: '🔨 fix:\t기능 및 버그 수정' },
    { value: '💎 design ', name: '💎 design:\t사용자 UI 수정' },
    { value: '🎨 style ', name: '🎨 style:\t코드 포맷, 세미콜론 누락 등 코드변경이 없는 경우' },
    { value: '♻️ refactor ', name: '♻️ refactor:\t코드 리펙토링' },
    { value: '🧪 test ', name: '🧪 test:\t테스트코드 추가 및 수정' },
    { value: '🚚 rename ', name: '🚚 rename:\t파일명, 폴더명 수정 또는 이동' },
    { value: '🔥 remove ', name: '🔥 remove:\t파일, 폴더 삭제' },
    { value: '📝 docs ', name: '📝 docs:\t문서가 추가되거나 변경된 경우 (i18n 포함)' },
    { value: '👷 chore ', name: '👷 chore:\t빌드 업무, 패키지 매니저 수정 및 추가' },
  ],
  allowCustomScopes: false,
  skipQuestions: ['body'],
  subjectLimit: 100,
};
