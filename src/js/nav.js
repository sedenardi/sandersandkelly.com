[].forEach.call(document.getElementsByClassName('navLink'), (el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.hash.replace('#', '');
    location.hash = targetId;
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView(true);
    const navHeight = document.getElementById('nav-bar').clientHeight;
    if (targetElement.getBoundingClientRect().top < navHeight) {
      window.scrollBy(0, (-1 * navHeight));
    }
  });
});
