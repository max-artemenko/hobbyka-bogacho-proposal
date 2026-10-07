/** Выполняется до первого отображения, чтобы сохранённая тема не мигала. */
export const themeScript = `(()=>{let t;try{t=localStorage.getItem('hobbyka-theme')}catch{};const dark=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.classList.toggle('dark',dark)})()`;
