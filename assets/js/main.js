// Sidebar Toggle
const sidebar = document.querySelector('aside.sidebar');
const menuTrigger = document.querySelector('button.menu-trigger');
const menuTriggerClose = document.querySelector('button.menu-trigger-close');
const menuOpacity = document.querySelector('div.menu-overlay');

const toggleSidebar = () => {
    if (sidebar.classList.contains('!translate-x-0')) {
      sidebar.classList.remove('!translate-x-0')
      menuOpacity.classList.add('hidden')
    } else {
      sidebar.classList.add('!translate-x-0')
      menuOpacity.classList.remove('hidden')
    }
  }

menuTrigger.addEventListener('click', toggleSidebar)
menuTriggerClose.addEventListener('click', toggleSidebar)
menuOpacity.addEventListener('click', toggleSidebar)

// Blog Page Scroll restoration
const scrollElement = document.querySelector('.scroll-area');
const scrollElementStateKey = "ScrollElementPosition";
window.onbeforeunload = function () {
  if (!scrollElement) return;
  const scrollPos = scrollElement.scrollTop;
  if (scrollPos) {
    localStorage.setItem(scrollElementStateKey, scrollPos)
  }
}
window.onload = function () {
  const scrollPos = localStorage.getItem(scrollElementStateKey)
  localStorage.removeItem(scrollElementStateKey);
  if (scrollElement) {
    scrollElement.scrollTop = scrollPos
  }
}

// Dark mode
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeStateKey = "DarkMode";
const isDark = JSON.parse(localStorage.getItem(darkModeStateKey) || 'false')
if (isDark) {
  document.documentElement.classList.add('dark');
}
darkModeToggle.addEventListener('click', () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem(darkModeStateKey, false)
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem(darkModeStateKey, true)
  }
})

/** Section Show/ Hide Toggle */
const storageKeys = {
    sectionHiddenKeyPrefix: 'sectionHiddenState_',
    sidebarStateKey: "sidebar-submenu-state"
};

document.querySelectorAll('.toggle-section-btn').forEach((button) => {
    const targetId = button.getAttribute('data-target');
    const section = document.getElementById(targetId);
    const showIcon = button.querySelector('.section-show-icon');
    const hideIcon = button.querySelector('.section-hide-icon');

    const syncStateWithStorage = () => {
        const storedValue = localStorage.getItem(`${storageKeys.sectionHiddenKeyPrefix}${targetId}`);
        const sectionHidden = JSON.parse(storedValue || 'false');  // default : false

        section.classList.toggle('hidden', sectionHidden);
        showIcon.classList.toggle('hidden', sectionHidden);
        hideIcon.classList.toggle('hidden', !sectionHidden);
    };

    const togglePostSection = () => {
        const isHidden = section.classList.toggle('hidden');
        localStorage.setItem(`${storageKeys.sectionHiddenKeyPrefix}${targetId}`, JSON.stringify(isHidden));
        syncStateWithStorage();
    };

    button.addEventListener('click', togglePostSection);

    syncStateWithStorage();
});


/** Sidebar Submenu Toggle with LocalStorage */
const storedState = JSON.parse(localStorage.getItem(storageKeys.sidebarStateKey)) || {}; // 기존 상태 불러오기

document.querySelectorAll(".toggle-submenu").forEach((button) => {
  const submenu = button.parentElement.nextElementSibling;
  const menuId = submenu ? submenu.getAttribute("data-menu-id") : null;

  const syncStateWithStorage = () => {
      const isHidden = storedState[menuId] || false;
      submenu.classList.toggle("hidden", isHidden);
      button.textContent = isHidden ? "▶" : "▼";
  };

  const toggleSubmenu = () => {
      const isHidden = submenu.classList.toggle("hidden");
      storedState[menuId] = isHidden;
      localStorage.setItem(storageKeys.sidebarStateKey, JSON.stringify(storedState));
      syncStateWithStorage();
  };

  if (menuId) {
      syncStateWithStorage(); // 페이지 로드 시 상태 동기화
      button.addEventListener("click", toggleSubmenu);
  }
});