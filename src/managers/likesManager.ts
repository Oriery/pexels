// likes are stored in local storage as an array of liked ids
// likes are stored in local storage

let likes: number[] = JSON.parse(localStorage.getItem('likes') || '[]');

function getLike(id: number): boolean {
  return likes.includes(id);
}

function setLike(id: number, like: boolean) {
  if (like) {
    if (likes.includes(id)) {
      return;
    }
    likes.push(id);
  } else {
    likes = likes.filter((likeId) => likeId !== id);
  }

  localStorage.setItem('likes', JSON.stringify(likes));

  console.log('Likes:', likes);
}

export { getLike, setLike };
