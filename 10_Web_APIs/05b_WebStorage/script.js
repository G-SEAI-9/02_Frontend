let users = [];
const containerEl = document.getElementById('card-container');

const renderUserCards = (data) => {
  // Lädt gespeicherte Bookmarks aus localStorage
  // Wenn keine bookmark vorhanden ist (erstes Laden) wird ein leeres Array erstellt
  //  ?? -> Nullish Coalescing Operator: gibt den rechten Ausdruck zurück, wenn der linke null oder undefined ist
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];

  for (const user of data) {
    // Prüft, ob User bereits als Bookmark gespeichert ist
    const exists = bookmarks.find((u) => u.id === user.id);

    const html = `
     <article class="boder rounded-xl shadow-indigo-950 shadow-2xl bg-indigo-900 py-5 px-8 space-y-2"
      style="background-color: oklch(from #312c85 l c ${Math.abs(user.address.geo.lng) + 30});"
     >
        <header>
          <h2>${user.name}</h2>
        </header>
        <div class="flex">
          <div class="h-18 w-18 rounded-full">
            <img class="h-full w-full mask-radial-[100%_100%] mask-radial-from-50% mask-radial-at-left"
              src="https://api.dicebear.com/10.x/pixel-art/svg?seed=${user.name}" alt="">
          </div>
          <ul>
            <li>Username: ${user.username}</li>
            <li>City: ${user.address.city}</li>
            <li>Website: <a href="${user.website} target="_blank" rel="noopener noreferrer">${user.website}</a></li>
          </ul>
        </div>
        <hgroup class="mt-5">
          <h3 class="font-semibold">${user.company.catchPhrase}</h3>
          <p>${user.company.bs}</p>
        </hgroup>
        <div class="text-right">
          <button data-user-id="${user.id}" class="border rounded py-2 px-4 cursor-pointer">${
            exists ? 'Saved' : 'Bookmark'
          }</button>
        </div>
      </article>
    `;

    containerEl.insertAdjacentHTML('beforeend', html);
  }
};

const fetchPlaceholders = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    renderUserCards(data);
    users = data;
  } catch (error) {
    console.log(error);
  }
};

const saveUser = (userId) => {
  const userObj = users.find((user) => user.id === userId);
  console.log(userObj);
  // Lädt bestehende Bookmarks aus localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
  bookmarks.push(userObj);

  // Speichert erweiterte Bookmark-Liste in localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

const removeUser = (userId) => {
  // Lädt bestehende Bookmarks aus localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
  const updatedBookmarks = bookmarks.filter((user) => user.id !== userId);

  // Aktualisiert localStorage mit gefilterter Liste
  localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
};

const handleContainerClick = (e) => {
  const { target } = e;

  if (target.tagName !== 'BUTTON') return;
  const userId = +target.dataset.userId;
  if (target.textContent === 'Bookmark') saveUser(userId);
  if (target.textContent === 'Saved') removeUser(userId);

  // Toggle Button-Text zwischen 'Bookmark' und 'Saved'
  target.textContent = target.textContent === 'Bookmark' ? 'Saved' : 'Bookmark';
};

fetchPlaceholders();

// document.addEventListener('DOMContentLoaded', fetchPlaceholders);
containerEl.addEventListener('click', handleContainerClick);
